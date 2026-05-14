#!/usr/bin/env bash
# One step: stage all, commit with message, push to origin/main (repo must be on branch main).
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT" ]]; then
  echo "push-main.sh: not inside a git repository." >&2
  exit 1
fi
cd "$ROOT"

branch="$(git branch --show-current)"
if [[ "$branch" != "main" ]]; then
  echo "push-main.sh: current branch is '$branch', not 'main'. Checkout main first." >&2
  exit 1
fi

msg="${*:-}"
if [[ -z "${msg// }" ]]; then
  read -r -p "Commit message: " msg || true
fi
if [[ -z "${msg// }" ]]; then
  echo "push-main.sh: empty commit message." >&2
  exit 1
fi

git add -A
if git diff --cached --quiet; then
  echo "push-main.sh: nothing staged (no changes to commit)."
else
  git commit -m "$msg"
fi

git push origin main
