# PowerShell Script for Remote GitHub Pages Management
# Run this in PowerShell after setting up your Personal Access Token

param(
    [Parameter(Mandatory=$false)]
    [string]$GitHubToken
)

$Username = "renbran"
$CurrentRepo = "scholarix-global-3d"

Write-Host "🚀 Remote GitHub Pages Disable Tool (PowerShell)" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""

# Check if token is provided
if (-not $GitHubToken) {
    if ($env:GITHUB_TOKEN) {
        $GitHubToken = $env:GITHUB_TOKEN
        Write-Host "✅ Using GITHUB_TOKEN from environment" -ForegroundColor Green
    } else {
        Write-Host "❌ GitHub Token required!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Setup Instructions:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor White
        Write-Host "2. Create new token with 'repo' and 'delete_repo' permissions" -ForegroundColor White
        Write-Host "3. Run this script with:" -ForegroundColor White
        Write-Host "   .\disable-pages-remote.ps1 -GitHubToken 'your_token_here'" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Or set environment variable:" -ForegroundColor Yellow
        Write-Host "`$env:GITHUB_TOKEN = 'your_token_here'" -ForegroundColor Cyan
        Write-Host ".\disable-pages-remote.ps1" -ForegroundColor Cyan
        exit 1
    }
}

# GitHub API headers
$Headers = @{
    'Authorization' = "token $GitHubToken"
    'Accept' = 'application/vnd.github.v3+json'
    'User-Agent' = 'PowerShell-GitHub-Pages-Manager'
}

# Function to check if repository exists
function Test-Repository($RepoName) {
    try {
        $Response = Invoke-RestMethod -Uri "https://api.github.com/repos/$Username/$RepoName" -Headers $Headers -Method Get
        return $true
    } catch {
        return $false
    }
}

# Function to check if Pages is enabled
function Test-PagesEnabled($RepoName) {
    try {
        $Response = Invoke-RestMethod -Uri "https://api.github.com/repos/$Username/$RepoName/pages" -Headers $Headers -Method Get
        return $true
    } catch {
        return $false
    }
}

# Function to disable Pages
function Disable-GitHubPages($RepoName) {
    Write-Host "🔄 Processing: $RepoName" -ForegroundColor Yellow
    
    if (Test-Repository $RepoName) {
        Write-Host "  ✅ Repository found" -ForegroundColor Green
        
        if (Test-PagesEnabled $RepoName) {
            Write-Host "  🌐 Pages enabled - disabling..." -ForegroundColor Blue
            
            try {
                Invoke-RestMethod -Uri "https://api.github.com/repos/$Username/$RepoName/pages" -Headers $Headers -Method Delete
                Write-Host "  ✅ Pages disabled successfully" -ForegroundColor Green
            } catch {
                Write-Host "  ⚠️  Error disabling Pages: $($_.Exception.Message)" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ℹ️  Pages not enabled" -ForegroundColor Gray
        }
    } else {
        Write-Host "  ❌ Repository not found" -ForegroundColor Red
    }
    Write-Host ""
}

# Function to enable Pages
function Enable-GitHubPages($RepoName) {
    Write-Host "🎯 Enabling Pages for: $RepoName" -ForegroundColor Green
    
    $Body = @{
        source = @{
            branch = "main"
            path = "/"
        }
        build_type = "workflow"
    } | ConvertTo-Json
    
    try {
        $Response = Invoke-RestMethod -Uri "https://api.github.com/repos/$Username/$RepoName/pages" -Headers $Headers -Method Post -Body $Body -ContentType 'application/json'
        Write-Host "  ✅ Pages enabled successfully" -ForegroundColor Green
        Write-Host "  🌐 Site URL: https://$Username.github.io/$RepoName/" -ForegroundColor Cyan
    } catch {
        Write-Host "  ⚠️  Error enabling Pages (might already be enabled)" -ForegroundColor Yellow
        Write-Host "  🔗 Manual setup: https://github.com/$Username/$RepoName/settings/pages" -ForegroundColor Blue
    }
    Write-Host ""
}

# Test API access
Write-Host "🔐 Testing GitHub API access..." -ForegroundColor Yellow
try {
    $User = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $Headers -Method Get
    Write-Host "✅ Authenticated as: $($User.login)" -ForegroundColor Green
} catch {
    Write-Host "❌ Authentication failed! Check your token." -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "🧹 Disabling Pages for common repositories..." -ForegroundColor Blue
Write-Host "=============================================" -ForegroundColor Blue

# Common repository names that might have Pages
$Repositories = @(
    "portfolio", "website", "blog", "docs", "landing-page",
    "$Username.github.io", "personal-site", "homepage", 
    "cv", "resume", "projects", "demo", "showcase",
    "react-app", "vue-app", "angular-app", "static-site"
)

# Process each repository
foreach ($Repo in $Repositories) {
    Disable-GitHubPages $Repo
}

Write-Host "🎯 Enabling Pages for current repository..." -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Enable-GitHubPages $CurrentRepo

Write-Host "✅ Remote disable process completed!" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 Verification links:" -ForegroundColor Yellow
Write-Host "  Site: https://$Username.github.io/$CurrentRepo/" -ForegroundColor Cyan
Write-Host "  Actions: https://github.com/$Username/$CurrentRepo/actions" -ForegroundColor Cyan
Write-Host "  Deploy time: 2-3 minutes" -ForegroundColor White