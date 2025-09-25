# GitHub Pages Batch Disable Guide

## 🎯 **Goal**: Free up GitHub Pages quota by disabling unused sites

### **Quick Action Plan**

#### **1. Identify Your Pages Sites**
Visit your repositories and look for the 🌐 icon next to repository names:
- **Main Profile**: https://github.com/renbran?tab=repositories
- Look for repositories with "github-pages" environment

#### **2. Common Repository Names to Check**
These repository patterns often have Pages enabled:

| Repository Pattern | Settings URL |
|-------------------|--------------|
| `renbran.github.io` | https://github.com/renbran/renbran.github.io/settings/pages |
| `portfolio` | https://github.com/renbran/portfolio/settings/pages |
| `website` | https://github.com/renbran/website/settings/pages |
| `blog` | https://github.com/renbran/blog/settings/pages |
| `docs` | https://github.com/renbran/docs/settings/pages |
| `landing-page` | https://github.com/renbran/landing-page/settings/pages |
| `react-app` | https://github.com/renbran/react-app/settings/pages |
| `vue-app` | https://github.com/renbran/vue-app/settings/pages |
| `static-site` | https://github.com/renbran/static-site/settings/pages |
| `homepage` | https://github.com/renbran/homepage/settings/pages |

#### **3. Batch Disable Process**

**For each repository above:**
1. Click the Settings URL
2. Scroll to "GitHub Pages" section
3. Under "Source", select **"None"**
4. Click **"Save"**

#### **4. Enable Pages for Current Repository**
**Final Step**: https://github.com/renbran/scholarix-global-3d/settings/pages
1. Under "Source", select **"GitHub Actions"**
2. Click **"Save"**

### **🚀 Automation Options**

#### **Option A: GitHub CLI (if available)**
```bash
# List all repositories
gh repo list --limit 50

# Disable Pages for a specific repo (requires API access)
gh api --method DELETE repos/renbran/[REPO-NAME]/pages
```

#### **Option B: Browser Bookmarklet**
Save this as a bookmark for quick access:
```javascript
javascript:(function(){window.open('https://github.com/renbran/'+prompt('Repository name:')+'/settings/pages');})()
```

### **📊 Expected Results**
- **Before**: 10+ Pages sites (hitting limit)
- **After**: 1 active site (scholarix-global-3d)
- **Deployment**: 2-3 minutes after enabling
- **URL**: https://renbran.github.io/scholarix-global-3d/

### **🔄 Re-enabling Later**
You can always re-enable Pages for any repository by:
1. Going to repository Settings > Pages
2. Selecting source (GitHub Actions or Deploy from branch)
3. Saving the configuration