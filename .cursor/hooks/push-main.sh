#!/usr/bin/env bash
# Stage all, commit, push to origin/main (branch must be main).
# Appends "added <slug>" for each staged .js file (e.g. Lower bound.js -> added lowerbound).
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

NO_PROMPT=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-prompt) NO_PROMPT=true; shift ;;
    *) break ;;
  esac
done

user_msg="${*:-}"

git add -A

# Build "added lowerbound, added foobar" from staged *.js paths
auto_parts=()
while IFS= read -r -d '' f; do
  [[ -n "$f" ]] || continue
  case "$f" in
    *.js) ;;
    *) continue ;;
  esac
  bn=$(basename "$f")
  base="${bn%.js}"
  slug=$(printf '%s' "$base" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]')
  [[ -n "$slug" ]] || continue
  auto_parts+=("added ${slug}")
done < <(git diff --cached -z --name-only --diff-filter=ACM)

auto_msg=""
for p in "${auto_parts[@]}"; do
  if [[ -n "$auto_msg" ]]; then
    auto_msg+=", ${p}"
  else
    auto_msg="${p}"
  fi
done

if [[ -z "${user_msg// }" && "${NO_PROMPT}" != true && -t 0 ]]; then
  read -r -p "Commit message (optional; .js filenames appended automatically): " user_msg || true
fi

if [[ -n "${user_msg// }" && -n "$auto_msg" ]]; then
  msg="${user_msg}; ${auto_msg}"
elif [[ -n "${user_msg// }" ]]; then
  msg="$user_msg"
elif [[ -n "$auto_msg" ]]; then
  msg="$auto_msg"
else
  echo "push-main.sh: empty commit message (stage changes or pass a message)." >&2
  exit 1
fi

if git diff --cached --quiet; then
  echo "push-main.sh: nothing staged (no changes to commit)."
else
  git commit -m "$msg"
fi

git push origin main
