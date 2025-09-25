# Remote GitHub Pages Management Guide

## 🚀 **Two Methods to Remotely Disable GitHub Pages**

### **Method 1: GitHub CLI (Recommended)**

#### **Setup:**
```bash
# Install GitHub CLI (Windows)
winget install --id GitHub.cli

# Or download from: https://github.com/cli/cli/releases

# Authenticate
gh auth login
```

#### **Run Remote Disable:**
```bash
chmod +x disable-pages-remote.sh
./disable-pages-remote.sh
```

### **Method 2: Personal Access Token + API**

#### **Setup:**
1. **Create Token**: https://github.com/settings/tokens
2. **Select Scopes**: `repo`, `delete_repo`
3. **Copy the token**

#### **Run Remote Disable:**
```bash
# Set token (replace with your actual token)
export GITHUB_TOKEN=ghp_your_token_here

# Run script
chmod +x disable-pages-api.sh
./disable-pages-api.sh
```

### **Method 3: One-Line Commands**

#### **Using GitHub CLI:**
```bash
# List all repositories with Pages
gh repo list --limit 50 --json name | jq -r '.[].name' | xargs -I {} gh api repos/renbran/{}/pages

# Disable Pages for specific repo
gh api --method DELETE repos/renbran/portfolio/pages

# Enable Pages for current repo
gh api --method POST repos/renbran/scholarix-global-3d/pages --input - <<< '{"source":{"branch":"main","path":"/"},"build_type":"workflow"}'
```

#### **Using curl + Personal Access Token:**
```bash
# Disable Pages for a repository
curl -X DELETE \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/renbran/portfolio/pages

# Enable Pages for current repository
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"source":{"branch":"main","path":"/"},"build_type":"workflow"}' \
  https://api.github.com/repos/renbran/scholarix-global-3d/pages
```

## 🎯 **Quick Start Instructions**

### **Option A: Automated Script**
```bash
# Run the automated remote disable script
./disable-pages-remote.sh
```

### **Option B: Manual API Calls**
```bash
# Set your token
export GITHUB_TOKEN=your_token_here

# Run API-based script
./disable-pages-api.sh
```

## 📊 **What These Scripts Do**

1. **Authentication Check**: Verify GitHub access
2. **Repository Scan**: Check common repo names for Pages
3. **Bulk Disable**: Remove Pages from all found repositories
4. **Enable Current**: Set up Pages for scholarix-global-3d
5. **Verification**: Provide deployment status links

## ✅ **Expected Results**

- **Disabled**: All other GitHub Pages sites
- **Enabled**: scholarix-global-3d with GitHub Actions
- **URL**: https://renbran.github.io/scholarix-global-3d/
- **Deploy Time**: 2-3 minutes after enable

## 🔍 **Troubleshooting**

### **GitHub CLI Issues:**
```bash
# Check auth status
gh auth status

# Login if needed
gh auth login

# Test API access
gh api user
```

### **Personal Access Token Issues:**
```bash
# Test token
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Check permissions
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/renbran/scholarix-global-3d
```

## 🎉 **Advantages of Remote Method**

- ✅ **Fast**: Bulk disable in seconds
- ✅ **Automated**: No manual clicking
- ✅ **Reliable**: API-based operations
- ✅ **Repeatable**: Can run multiple times safely
- ✅ **Comprehensive**: Checks all common repo names