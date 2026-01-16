#!/bin/bash

# Check for uncommitted changes in the git repository
# This hook runs before Claude finishes responding

cd "$CLAUDE_WORKING_DIRECTORY" 2>/dev/null || cd "$PWD"

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  exit 0
fi

# Check for uncommitted changes (staged, unstaged, or untracked)
if git status --porcelain | grep -q .; then
  echo ""
  echo "================================================"
  echo "  UNCOMMITTED CHANGES DETECTED"
  echo "================================================"
  echo ""
  echo "Files with changes:"
  git status --short
  echo ""
  echo "Please commit these changes before finishing."
  echo "================================================"
  exit 1
fi

exit 0
