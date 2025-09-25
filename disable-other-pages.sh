#!/bin/bash

# GitHub Pages Management Script
# This script helps disable all GitHub Pages sites and enable the current one

echo "🚀 GitHub Pages Management Tool"
echo "==============================="
echo "Goal: Disable all other Pages sites to stay within free 10-site limit"
echo ""

USERNAME="renbran"
CURRENT_REPO="scholarix-global-3d"

echo "📋 Step 1: List all your repositories"
echo "=====================================/"

# Try multiple methods to get repository list
if command -v gh &> /dev/null; then
    echo "Using GitHub CLI..."
    gh repo list $USERNAME --limit 50 --json name,url,isPrivate,visibility | jq -r '.[] | "\(.name) - \(.url)"'
else
    echo "GitHub CLI not found. Please manually check these common repository names:"
    
    # Common repository patterns that might have Pages enabled
    common_repos=(
        "portfolio"
        "website" 
        "blog"
        "docs"
        "landing-page"
        "react-app"
        "vue-app"
        "angular-app"
        "static-site"
        "$USERNAME.github.io"
        "personal-site"
        "homepage"
        "cv"
        "resume"
        "projects"
        "demo"
        "showcase"
    )
    
    echo ""
    echo "🔍 Common repositories that often have Pages enabled:"
    for repo in "${common_repos[@]}"; do
        echo "  - $repo"
        echo "    Settings: https://github.com/$USERNAME/$repo/settings/pages"
    done
fi

echo ""
echo "📝 Step 2: Manual Disable Instructions"
echo "======================================="
echo ""
echo "For EACH repository with Pages enabled (except $CURRENT_REPO):"
echo "1. Go to: https://github.com/$USERNAME/[repository-name]/settings/pages"
echo "2. Under 'Source', select 'None'"
echo "3. Click 'Save'"
echo ""

echo "🎯 Step 3: Enable Pages for Current Repository"
echo "==============================================="
echo "1. Go to: https://github.com/$USERNAME/$CURRENT_REPO/settings/pages"
echo "2. Under 'Source', select 'GitHub Actions'"
echo "3. Click 'Save'"
echo ""

echo "⚡ Step 4: Quick Links for Manual Disable"
echo "=========================================="

# Generate quick links for common repositories
repos_to_check=(
    "portfolio" "website" "blog" "docs" "landing-page" 
    "react-app" "vue-app" "angular-app" "static-site" 
    "$USERNAME.github.io" "personal-site" "homepage" 
    "cv" "resume" "projects" "demo" "showcase"
    "osus_main" "cleanup" "scholarix" "global" "3d"
)

for repo in "${repos_to_check[@]}"; do
    echo "https://github.com/$USERNAME/$repo/settings/pages"
done

echo ""
echo "✅ Step 5: Verification"
echo "======================"
echo "After disabling other Pages sites, verify this one deploys:"
echo "Expected URL: https://$USERNAME.github.io/$CURRENT_REPO/"
echo "Check deployment: https://github.com/$USERNAME/$CURRENT_REPO/actions"

echo ""
echo "💡 Pro Tips:"
echo "============"
echo "- Free accounts: 10 Pages sites maximum"
echo "- Only keep active/important sites enabled"
echo "- You can re-enable Pages anytime later"
echo "- GitHub Pro: Unlimited Pages sites"