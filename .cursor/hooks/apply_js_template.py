#!/usr/bin/env python3
"""Cursor preToolUse hook: apply template.md to empty new .js Write calls."""
from __future__ import annotations

import json
import os
import sys
from typing import Any


def allow() -> None:
    print(json.dumps({"permission": "allow"}))


def find_template(workspace_roots: list[str], cwd: str) -> str | None:
    for root in workspace_roots:
        candidate = os.path.join(root, "template.md")
        if os.path.isfile(candidate):
            with open(candidate, encoding="utf-8") as f:
                return f.read()

    fallback = os.path.join(cwd, "template.md")
    if os.path.isfile(fallback):
        with open(fallback, encoding="utf-8") as f:
            return f.read()

    return None


def get_write_path(tool_input: dict[str, Any]) -> str:
    path = tool_input.get("path") or tool_input.get("file_path") or ""
    return path if isinstance(path, str) else ""


def get_write_content_key(tool_input: dict[str, Any]) -> str:
    if "contents" in tool_input:
        return "contents"
    if "content" in tool_input:
        return "content"
    return "contents"


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        allow()
        return

    if data.get("tool_name") != "Write":
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

    # Only template brand-new JS files. Remove this block if you also want to
    # replace empty writes to existing files.
    if os.path.exists(absolute_path):
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


if __name__ == "__main__":
    main()