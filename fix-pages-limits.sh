#!/bin/bash

# GitHub Pages Limit Fix Script
# This script addresses common GitHub Pages deployment issues

echo "🔧 GitHub Pages Limit Fix Script"
echo "================================="

# Check current repository size
echo "📊 Current Repository Stats:"
git count-objects -v

echo ""
echo "🧹 Cleaning up potential issues..."

# 1. Ensure node_modules is not tracked
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
echo "*.exe" >> .gitignore
echo "*.node" >> .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# 2. Remove any accidentally committed large files
git rm -r --cached node_modules/ 2>/dev/null || echo "node_modules not in git (good!)"
git rm -r --cached dist/ 2>/dev/null || echo "dist not in git (good!)"

# 3. Check for large files in git history
echo ""
echo "🔍 Checking for large files in git history..."
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  awk '/^blob/ {if($3 > 1048576) print $3/1048576 "MB " $4}' | \
  sort -nr | \
  head -10

echo ""
echo "✅ Repository cleaned up!"
echo ""
echo "🚀 Next steps:"
echo "1. Commit the .gitignore changes"
echo "2. Push to trigger GitHub Pages rebuild"
echo "3. Check GitHub repository Settings > Pages"
echo "4. Ensure Source is set to 'GitHub Actions'"

# Check if Pages might be disabled due to limits
echo ""
echo "🌐 Testing GitHub Pages URL..."
curl -I https://renbran.github.io/scholarix-global-3d/ 2>/dev/null | head -1