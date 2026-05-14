#!/usr/bin/env python3
"""preToolUse: expand `maang-push <msg>` Shell tool calls into push-main.sh (add + commit + push)."""
from __future__ import annotations

import json
import os
import shlex
import sys


def _allow() -> None:
    print(json.dumps({"permission": "allow"}))


def _repo_root(data: dict, cwd: str) -> str | None:
    roots = data.get("workspace_roots") or []
    if isinstance(roots, list):
        for r in roots:
            if isinstance(r, str) and os.path.isfile(os.path.join(r, ".cursor", "hooks", "push-main.sh")):
                return r
    if os.path.isfile(os.path.join(cwd, ".cursor", "hooks", "push-main.sh")):
        return cwd
    return None


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        _allow()
        return

    if data.get("tool_name") != "Shell":
        _allow()
        return

    ti = data.get("tool_input")
    if not isinstance(ti, dict):
        _allow()
        return

    cmd = ti.get("command")
    if not isinstance(cmd, str):
        _allow()
        return

    stripped = cmd.strip()
    if not stripped.startswith("maang-push"):
        _allow()
        return

    tail = stripped[len("maang-push") :].strip()
    if not tail:
        _allow()
        return

    try:
        parts = shlex.split(tail, posix=True)
    except ValueError:
        _allow()
        return

    if not parts:
        _allow()
        return

    msg = parts[0] if len(parts) == 1 else " ".join(parts)

    cwd = data.get("cwd") or os.getcwd()
    if not isinstance(cwd, str):
        cwd = os.getcwd()

    root = _repo_root(data, cwd)
    if root is None:
        _allow()
        return

    script = os.path.join(root, ".cursor", "hooks", "push-main.sh")
    inner = f"cd {shlex.quote(root)} && exec bash {shlex.quote(script)} {shlex.quote(msg)}"
    new_cmd = f"bash -lc {shlex.quote(inner)}"

    updated = dict(ti)
    updated["command"] = new_cmd
    print(json.dumps({"permission": "allow", "updated_input": updated}))


if __name__ == "__main__":
    main()
