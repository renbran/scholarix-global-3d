#!/bin/bash

# Remote GitHub Pages Disable Script
# Uses GitHub API to disable Pages sites automatically

echo "🚀 Remote GitHub Pages Disable Tool"
echo "===================================="
echo ""

USERNAME="renbran"
CURRENT_REPO="scholarix-global-3d"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Installing recommendations:"
    echo ""
    echo "Option 1 - Install GitHub CLI:"
    echo "  Windows: winget install --id GitHub.cli"
    echo "  Or download: https://github.com/cli/cli/releases"
    echo ""
    echo "Option 2 - Use curl with Personal Access Token:"
    echo "  1. Go to: https://github.com/settings/tokens"
    echo "  2. Create token with 'repo' and 'delete_repo' permissions"
    echo "  3. Run this script with: GITHUB_TOKEN=your_token ./disable-pages-remote.sh"
    echo ""
    exit 1
fi

# Function to disable Pages for a repository
disable_pages() {
    local repo=$1
    echo "🔄 Checking repository: $repo"
    
    # Check if repository exists
    if gh repo view "$USERNAME/$repo" &> /dev/null; then
        echo "  ✅ Repository found: $repo"
        
        # Try to get Pages info (will fail if Pages not enabled)
        if gh api "repos/$USERNAME/$repo/pages" &> /dev/null; then
            echo "  🌐 Pages enabled - disabling..."
            
            # Disable Pages by deleting the Pages configuration
            if gh api --method DELETE "repos/$USERNAME/$repo/pages" &> /dev/null; then
                echo "  ✅ Successfully disabled Pages for $repo"
            else
                echo "  ⚠️  Failed to disable Pages for $repo (might already be disabled)"
            fi
        else
            echo "  ℹ️  Pages not enabled for $repo"
        fi
    else
        echo "  ❌ Repository not found: $repo"
    fi
    echo ""
}

# Function to enable Pages for current repository
enable_pages() {
    local repo=$1
    echo "🎯 Enabling Pages for: $repo"
    
    # Enable Pages with GitHub Actions source
    local pages_config='{
        "source": {
            "branch": "main",
            "path": "/"
        },
        "build_type": "workflow"
    }'
    
    if gh api --method POST "repos/$USERNAME/$repo/pages" --input - <<< "$pages_config" &> /dev/null; then
        echo "  ✅ Successfully enabled Pages for $repo"
        echo "  🌐 Site will be available at: https://$USERNAME.github.io/$repo/"
    else
        echo "  ⚠️  Failed to enable Pages (might already be enabled or need manual setup)"
        echo "  🔗 Manual setup: https://github.com/$USERNAME/$repo/settings/pages"
    fi
    echo ""
}

echo "🔍 Step 1: Authenticating with GitHub"
echo "====================================="

# Check GitHub CLI authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""

echo "🧹 Step 2: Disabling Pages for common repositories"
echo "=================================================="

# List of common repository names that might have Pages
repositories=(
    "portfolio"
    "website" 
    "blog"
    "docs"
    "landing-page"
    "$USERNAME.github.io"
    "personal-site"
    "homepage"
    "cv"
    "resume"
    "projects"
    "demo"
    "showcase"
    "react-app"
    "vue-app"
    "angular-app"
    "static-site"
    "next-app"
    "gatsby-site"
    "nuxt-app"
)

# Disable Pages for each repository
for repo in "${repositories[@]}"; do
    disable_pages "$repo"
done

echo "🎯 Step 3: Enabling Pages for current repository"
echo "================================================"
enable_pages "$CURRENT_REPO"

echo "📊 Step 4: Summary and Next Steps"
echo "=================================="
echo "✅ Remote disable process completed"
echo ""
echo "🔍 To verify results:"
echo "  1. Check Actions tab: https://github.com/$USERNAME/$CURRENT_REPO/actions"
echo "  2. Site URL: https://$USERNAME.github.io/$CURRENT_REPO/"
echo "  3. Deployment time: 2-3 minutes"
echo ""
echo "💡 If any repositories still show Pages enabled:"
echo "  - Run: gh repo list --limit 50"
echo "  - Check each repo manually: gh api repos/$USERNAME/[repo-name]/pages"