#!/bin/bash

# Script to check GitHub Pages status for all repositories
# Usage: ./check-pages.sh <username>

USERNAME=${1:-renbran}

echo "Checking GitHub Pages status for user: $USERNAME"
echo "========================================="

# Function to check if a repository has GitHub Pages enabled
check_pages() {
    local repo=$1
    local pages_url="https://$USERNAME.github.io/$repo"
    
    echo "Checking: $repo"
    
    # Try to access the pages URL
    if curl -s --head "$pages_url" | head -n 1 | grep -q "200 OK"; then
        echo "  ✅ GitHub Pages ACTIVE: $pages_url"
    else
        echo "  ❌ GitHub Pages inactive or not found"
    fi
    echo ""
}

# Common repository patterns that might have Pages
repos=(
    "scholarix-global-3d"
    "portfolio"
    "website"
    "docs"
    "blog"
    "landing-page"
    "react-app"
    "vue-app"
    "angular-app"
    "static-site"
)

echo "Checking common repository names..."
for repo in "${repos[@]}"; do
    check_pages "$repo"
done

echo ""
echo "To disable GitHub Pages for a repository:"
echo "1. Go to: https://github.com/$USERNAME/[repository-name]/settings/pages"
echo "2. Set Source to 'None'"
echo "3. Click 'Save'"