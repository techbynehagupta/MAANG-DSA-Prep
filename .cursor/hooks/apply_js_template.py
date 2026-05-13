#!/usr/bin/env python3
"""preToolUse hook: empty new .js writes get repo template.md contents."""
from __future__ import annotations

import json
import os
import sys


def _allow() -> None:
    print(json.dumps({"permission": "allow"}))


def _find_template(workspace_roots: list[str], cwd: str) -> str | None:
    for root in workspace_roots or []:
        candidate = os.path.join(root, "template.md")
        if os.path.isfile(candidate):
            with open(candidate, encoding="utf-8") as f:
                return f.read()
    fallback = os.path.join(cwd, "template.md")
    if os.path.isfile(fallback):
        with open(fallback, encoding="utf-8") as f:
            return f.read()
    return None


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        _allow()
        return

    if data.get("tool_name") != "Write":
        _allow()
        return

    ti = data.get("tool_input")
    if not isinstance(ti, dict):
        _allow()
        return

    path = ti.get("path") or ti.get("file_path") or ""
    if not isinstance(path, str) or not path.lower().endswith(".js"):
        _allow()
        return

    raw = ti.get("contents")
    if raw is None:``
        raw = ti.get("content", "")
    if not isinstance(raw, str):
        _allow()
        return

    if raw.strip():
        _allow()
        return

    roots = data.get("workspace_roots") or []
    if not isinstance(roots, list):
        roots = []
    roots = [r for r in roots if isinstance(r, str)]

    cwd = data.get("cwd") or os.getcwd()
    if not isinstance(cwd, str):
        cwd = os.getcwd()

    body = _find_template(roots, cwd)
    if body is None:
        _allow()
        return

    updated = dict(ti)
    updated["contents"] = body
    print(json.dumps({"permission": "allow", "updated_input": updated}))


if __name__ == "__main__":
    main()
