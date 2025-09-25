#!/bin/bash

# GitHub Pages Remote Management with Personal Access Token
# Alternative method if GitHub CLI is not available

echo "🔐 GitHub Pages Remote Disable (API Method)"
echo "============================================="
echo ""

USERNAME="renbran"
CURRENT_REPO="scholarix-global-3d"

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not set"
    echo ""
    echo "🔧 Setup Instructions:"
    echo "1. Go to: https://github.com/settings/tokens"
    echo "2. Click 'Generate new token (classic)'"
    echo "3. Select scopes: 'repo', 'delete_repo'"
    echo "4. Copy the token"
    echo "5. Run: export GITHUB_TOKEN=your_token_here"
    echo "6. Then run this script again"
    echo ""
    echo "Or run directly: GITHUB_TOKEN=your_token ./disable-pages-api.sh"
    echo ""
    exit 1
fi

# GitHub API base URL
API_BASE="https://api.github.com"

# Function to make authenticated API calls
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    if [ -n "$data" ]; then
        curl -s -X "$method" \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            -d "$data" \
            "$API_BASE/$endpoint"
    else
        curl -s -X "$method" \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.v3+json" \
            "$API_BASE/$endpoint"
    fi
}

# Function to check if repository exists
repo_exists() {
    local repo=$1
    local response=$(api_call "GET" "repos/$USERNAME/$repo")
    echo "$response" | grep -q '"id"'
}

# Function to check if Pages is enabled
pages_enabled() {
    local repo=$1
    local response=$(api_call "GET" "repos/$USERNAME/$repo/pages")
    echo "$response" | grep -q '"url"'
}

# Function to disable Pages
disable_pages_api() {
    local repo=$1
    echo "🔄 Processing: $repo"
    
    if repo_exists "$repo"; then
        echo "  ✅ Repository found"
        
        if pages_enabled "$repo"; then
            echo "  🌐 Pages enabled - disabling..."
            
            local response=$(api_call "DELETE" "repos/$USERNAME/$repo/pages")
            if [ $? -eq 0 ]; then
                echo "  ✅ Pages disabled successfully"
            else
                echo "  ⚠️  Error disabling Pages"
            fi
        else
            echo "  ℹ️  Pages not enabled"
        fi
    else
        echo "  ❌ Repository not found"
    fi
    echo ""
}

# Function to enable Pages for current repo
enable_pages_api() {
    local repo=$1
    echo "🎯 Enabling Pages for: $repo"
    
    local pages_config='{
        "source": {
            "branch": "main",
            "path": "/"
        },
        "build_type": "workflow"
    }'
    
    local response=$(api_call "POST" "repos/$USERNAME/$repo/pages" "$pages_config")
    
    if echo "$response" | grep -q '"url"'; then
        echo "  ✅ Pages enabled successfully"
        echo "  🌐 Site URL: https://$USERNAME.github.io/$repo/"
    else
        echo "  ⚠️  Error enabling Pages (might already be enabled)"
        echo "  🔗 Manual setup: https://github.com/$USERNAME/$repo/settings/pages"
    fi
    echo ""
}

echo "🧹 Disabling Pages for common repositories"
echo "=========================================="

# Common repository names
repos=(
    "portfolio" "website" "blog" "docs" "landing-page"
    "$USERNAME.github.io" "personal-site" "homepage" 
    "cv" "resume" "projects" "demo" "showcase"
    "react-app" "vue-app" "angular-app" "static-site"
)

# Process each repository
for repo in "${repos[@]}"; do
    disable_pages_api "$repo"
done

echo "🎯 Enabling Pages for current repository"
echo "========================================"
enable_pages_api "$CURRENT_REPO"

echo "✅ Remote API process completed!"
echo ""
echo "🔍 Verification:"
echo "  Site: https://$USERNAME.github.io/$CURRENT_REPO/"
echo "  Actions: https://github.com/$USERNAME/$CURRENT_REPO/actions"