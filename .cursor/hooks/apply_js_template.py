#!/usr/bin/env python3
"""Apply template.md to empty JavaScript files.

Modes:
- Cursor preToolUse hook: reads hook JSON from stdin and updates empty JS writes.
- Manual file fill: python3 .cursor/hooks/apply_js_template.py path/to/file.js
- Repo sweep/watch: python3 .cursor/hooks/apply_js_template.py --all|--watch
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from typing import Any


REPO_SKIP_DIRS = {".git", "node_modules", "__pycache__"}


def allow() -> None:
    print(json.dumps({"permission": "allow"}))


def candidate_roots(workspace_roots: list[str], cwd: str) -> list[str]:
    roots: list[str] = []
    script_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    for root in workspace_roots + [cwd, script_root]:
        if root and root not in roots:
            roots.append(root)

    current = os.path.abspath(cwd)
    while True:
        if current not in roots:
            roots.append(current)
        parent = os.path.dirname(current)
        if parent == current:
            break
        current = parent

    return roots


def find_template(workspace_roots: list[str], cwd: str) -> str | None:
    for root in candidate_roots(workspace_roots, cwd):
        candidate = os.path.join(root, "template.md")
        if os.path.isfile(candidate):
            with open(candidate, encoding="utf-8") as f:
                return f.read()

    return None


def get_write_path(tool_input: dict[str, Any]) -> str:
    path = (
        tool_input.get("path")
        or tool_input.get("file_path")
        or tool_input.get("filePath")
        or tool_input.get("filename")
        or ""
    )
    return path if isinstance(path, str) else ""


def get_write_content_key(tool_input: dict[str, Any]) -> str:
    if "contents" in tool_input:
        return "contents"
    if "content" in tool_input:
        return "content"
    if "text" in tool_input:
        return "text"
    return "contents"


def is_js_path(path: str) -> bool:
    return path.lower().endswith(".js")


def is_empty_file(path: str) -> bool:
    try:
        if not os.path.isfile(path):
            return False
        with open(path, encoding="utf-8") as f:
            return f.read().strip() == ""
    except OSError:
        return False


def apply_template_to_file(path: str, template: str) -> bool:
    if not is_js_path(path):
        return False
    if os.path.exists(path) and not is_empty_file(path):
        return False

    parent = os.path.dirname(path)
    if parent:
        os.makedirs(parent, exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        f.write(template)
    return True


def iter_js_files(root: str):
    for current, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in REPO_SKIP_DIRS]
        for name in files:
            if name.lower().endswith(".js"):
                yield os.path.join(current, name)


def apply_all(root: str, template: str) -> int:
    changed = 0
    for path in iter_js_files(root):
        if apply_template_to_file(path, template):
            changed += 1
            print(f"Applied template.md to {os.path.relpath(path, root)}")
    return changed


def watch_empty_js(root: str, template: str, interval: float) -> None:
    print("apply_js_template: watching for empty *.js -> template.md (stop: Ctrl+C)", flush=True)
    seen: dict[str, tuple[int, int]] = {}
    while True:
        for path in iter_js_files(root):
            try:
                stat = os.stat(path)
            except OSError:
                continue
            stamp = (stat.st_mtime_ns, stat.st_size)
            if seen.get(path) == stamp:
                continue
            seen[path] = stamp
            if apply_template_to_file(path, template):
                print(f"Applied template.md to {os.path.relpath(path, root)}", flush=True)
                try:
                    stat = os.stat(path)
                    seen[path] = (stat.st_mtime_ns, stat.st_size)
                except OSError:
                    pass
        time.sleep(interval)


def run_hook() -> None:
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        allow()
        return

    tool_name = data.get("tool_name")
    if not isinstance(tool_name, str) or tool_name.lower() not in {"write", "write_file"}:
        allow()
        return

    tool_input = data.get("tool_input")
    if not isinstance(tool_input, dict):
        allow()
        return

    path = get_write_path(tool_input)
    if not path.lower().endswith(".js"):
        allow()
        return

    content_key = get_write_content_key(tool_input)
    raw_content = tool_input.get(content_key, "")
    if not isinstance(raw_content, str):
        allow()
        return

    if raw_content.strip():
        allow()
        return

    cwd = data.get("cwd") if isinstance(data.get("cwd"), str) else os.getcwd()
    absolute_path = path if os.path.isabs(path) else os.path.join(cwd, path)

    # Do not overwrite existing code. Existing blank files are safe to fill.
    if os.path.exists(absolute_path) and not is_empty_file(absolute_path):
        allow()
        return

    workspace_roots = data.get("workspace_roots") or []
    if not isinstance(workspace_roots, list):
        workspace_roots = []
    workspace_roots = [root for root in workspace_roots if isinstance(root, str)]

    template = find_template(workspace_roots, cwd)
    if template is None:
        allow()
        return

    updated_input = dict(tool_input)
    updated_input[content_key] = template

    print(json.dumps({
        "permission": "allow",
        "updated_input": updated_input,
        "user_message": f"Applied template.md to {path}",
        "agent_message": f"Created {path} using template.md because the requested JS file was empty.",
    }))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Apply repo-root template.md to empty .js files.")
    parser.add_argument("paths", nargs="*", help="Specific .js file paths to fill if empty.")
    parser.add_argument("--all", action="store_true", help="Fill every existing empty .js file under the repo.")
    parser.add_argument("--watch", action="store_true", help="Keep watching the repo for empty .js files.")
    parser.add_argument("--interval", type=float, default=1.0, help="Watch polling interval in seconds.")
    return parser.parse_args()


def main() -> None:
    if len(sys.argv) == 1 and not sys.stdin.isatty():
        run_hook()
        return

    args = parse_args()
    cwd = os.getcwd()
    template = find_template([], cwd)
    if template is None:
        print("template.md not found from current workspace.", file=sys.stderr)
        sys.exit(1)

    changed = 0
    if args.all or (not args.paths and not args.watch):
        changed += apply_all(cwd, template)

    for path in args.paths:
        absolute_path = path if os.path.isabs(path) else os.path.join(cwd, path)
        if apply_template_to_file(absolute_path, template):
            changed += 1
            print(f"Applied template.md to {path}")

    if args.watch:
        if changed:
            print(f"Applied template.md to {changed} file(s).")
        watch_empty_js(cwd, template, args.interval)
    else:
        print(f"Applied template.md to {changed} file(s).")


if __name__ == "__main__":
    main()
