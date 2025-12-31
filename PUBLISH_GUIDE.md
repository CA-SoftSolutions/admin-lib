# 🚀 Complete Publishing Guide - GitHub + npm

This guide will help you publish the SEO Tracker library to both GitHub and npm so users can:
- Install via npm: `npm install @yourusername/seo-tracker`
- Use via CDN: `<script src="https://cdn.jsdelivr.net/npm/@yourusername/seo-tracker"></script>`

---

## 📋 Prerequisites

### 1. GitHub Account
- Sign up at https://github.com if you don't have an account

### 2. npm Account
- Sign up at https://www.npmjs.com/signup
- Verify your email address

### 3. Git Installed
Check if installed:
```powershell
git --version
```
If not installed, download from: https://git-scm.com/download/win

---

## 🎯 Part 1: Publish to GitHub (10 minutes)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository settings:
   - **Name:** `seo-tracker`
   - **Description:** `Lightweight JavaScript tracking library for web analytics`
   - **Visibility:** **Public** (required for free npm scoped packages)
   - **Initialize:** Leave all checkboxes UNCHECKED
3. Click **"Create repository"**
4. **IMPORTANT:** Copy your GitHub username (you'll need it)

### Step 2: Update Package Files

Open `package.json` and replace:
- `@yourusername` → `@YOUR-ACTUAL-GITHUB-USERNAME`
- `yourusername` → `YOUR-ACTUAL-GITHUB-USERNAME`

Also update in `README.md`:
- All instances of `yourusername` → `YOUR-ACTUAL-GITHUB-USERNAME`
- All instances of `your-domain.com` → `YOUR-ADMIN-DOMAIN.com`

### Step 3: Initialize Git and Push

Open PowerShell in the `seo-tracker-package` folder:

```powershell
# Navigate to package folder
cd "c:\Tharshigan\Practice Project\Google test tools project\SEO-Admin-board\seo-tracker-package"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial release v1.0.0"

# Add remote (REPLACE with your username)
git remote add origin https://github.com/YOUR-USERNAME/seo-tracker.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You may be prompted to login to GitHub. Use your GitHub credentials.

### Step 4: Create GitHub Release

1. Go to your repository: `https://github.com/YOUR-USERNAME/seo-tracker`
2. Click **"Releases"** → **"Create a new release"**
3. Release settings:
   - **Tag:** `v1.0.0` (type this in, it will be created)
   - **Title:** `v1.0.0 - Initial Release`
   - **Description:** Copy from CHANGELOG.md
4. Click **"Publish release"**

✅ **GitHub publishing complete!** Your library is now on GitHub.

---

## 📦 Part 2: Publish to npm (5 minutes)

### Step 1: Login to npm

```powershell
# Login to npm (you'll be prompted for username, password, email)
npm login
```

Enter your npm credentials:
- Username: your npm username
- Password: your npm password
- Email: your npm email

### Step 2: Verify Package Name

Check if your package name is available:

```powershell
npm view @YOUR-USERNAME/seo-tracker
```

If you get an error "npm ERR! code E404", the name is available! ✅

### Step 3: Publish to npm

```powershell
# Make sure you're in the package folder
cd "c:\Tharshigan\Practice Project\Google test tools project\SEO-Admin-board\seo-tracker-package"

# Publish to npm (public access required for scoped packages)
npm publish --access public
```

**Expected output:**
```
+ @yourusername/seo-tracker@1.0.0
```

✅ **npm publishing complete!** Your library is now on npm registry.

### Step 4: Verify Publication

1. Check npm: https://www.npmjs.com/package/@YOUR-USERNAME/seo-tracker
2. Test installation in another folder:

```powershell
# Create test folder
mkdir C:\temp\test-install
cd C:\temp\test-install

# Initialize npm
npm init -y

# Install your package
npm install @YOUR-USERNAME/seo-tracker

# Verify it's installed
dir node_modules\@YOUR-USERNAME\seo-tracker
```

---

## 🌐 Part 3: Usage Methods

Once published, users can use your library in 3 ways:

### Method 1: npm Install (Node.js/React/Vue/etc.)

```bash
npm install @YOUR-USERNAME/seo-tracker
```

```javascript
// Import in JavaScript
const SEOTracker = require('@YOUR-USERNAME/seo-tracker');

// Or ES6
import SEOTracker from '@YOUR-USERNAME/seo-tracker';

// Initialize
SEOTracker.init({
  apiUrl: 'https://your-admin.com/api/tracking',
  projectId: 'your-project-uuid'
});
```

### Method 2: CDN via jsDelivr (HTML websites)

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/@YOUR-USERNAME/seo-tracker@latest/seo-tracker.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@YOUR-USERNAME/seo-tracker@1.0.0/seo-tracker.js"></script>

<script>
  SEOTracker.init({
    apiUrl: 'https://your-admin.com/api/tracking',
    projectId: 'your-project-uuid'
  });
</script>
```

### Method 3: CDN via GitHub (Alternative)

```html
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/seo-tracker@v1.0.0/seo-tracker.js"></script>
```

---

## 🔄 Publishing Updates

When you make changes and want to publish a new version:

### Step 1: Update Version

```powershell
cd "c:\Tharshigan\Practice Project\Google test tools project\SEO-Admin-board\seo-tracker-package"

# Update version (choose one)
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor  # 1.0.0 → 1.1.0 (new features)
npm version major  # 1.0.0 → 2.0.0 (breaking changes)
```

### Step 2: Push to GitHub

```powershell
git add .
git commit -m "Version 1.0.1: Bug fixes"
git push
git push --tags
```

### Step 3: Publish to npm

```powershell
npm publish
```

### Step 4: Create GitHub Release

1. Go to GitHub → Releases → Create new release
2. Select the new tag (e.g., v1.0.1)
3. Add release notes
4. Publish

---

## ✅ Complete Checklist

### GitHub Publishing:
- [ ] GitHub account created
- [ ] Repository created (public)
- [ ] package.json updated with your username
- [ ] README.md updated with your username and domain
- [ ] Git initialized
- [ ] Code pushed to GitHub
- [ ] Release v1.0.0 created
- [ ] Repository visible at github.com/YOUR-USERNAME/seo-tracker

### npm Publishing:
- [ ] npm account created and verified
- [ ] Logged in via `npm login`
- [ ] Package name available
- [ ] Published with `npm publish --access public`
- [ ] Package visible at npmjs.com/package/@YOUR-USERNAME/seo-tracker
- [ ] Test installation successful

### Documentation:
- [ ] README.md updated with correct URLs
- [ ] Installation examples tested
- [ ] CDN links tested and working

---

## 🎯 Quick Command Reference

```powershell
# Navigate to package
cd "c:\Tharshigan\Practice Project\Google test tools project\SEO-Admin-board\seo-tracker-package"

# Initialize and push to GitHub
git init
git add .
git commit -m "Initial release v1.0.0"
git remote add origin https://github.com/YOUR-USERNAME/seo-tracker.git
git branch -M main
git push -u origin main

# Publish to npm
npm login
npm publish --access public

# Update version
npm version patch
git push
git push --tags
npm publish
```

---

## 🐛 Troubleshooting

### Problem: "403 Forbidden" when publishing to npm

**Solution:** 
```powershell
npm publish --access public
```
Scoped packages (@username/package) require public access flag.

### Problem: "Repository not found" on GitHub

**Solution:** 
- Verify repository is created
- Check remote URL: `git remote -v`
- Update remote: `git remote set-url origin https://github.com/YOUR-USERNAME/seo-tracker.git`

### Problem: Package name already taken

**Solution:** 
- Use scoped package: `@YOUR-USERNAME/seo-tracker`
- Try different name: `seo-tracker-YOUR-USERNAME`
- Check availability: `npm view PACKAGE-NAME`

### Problem: Git authentication fails

**Solution:**
- Use personal access token instead of password
- Go to GitHub → Settings → Developer settings → Personal access tokens
- Generate new token with "repo" scope
- Use token as password when prompted

### Problem: CDN not loading

**Solution:**
- Wait 5-10 minutes for CDN cache
- Verify package is published: https://www.npmjs.com/package/@YOUR-USERNAME/seo-tracker
- Check URL is correct
- Try clearing browser cache

---

## 📊 After Publishing

### Share Your Library

Update your main project documentation to include:

```markdown
## 📦 Installation

npm install @YOUR-USERNAME/seo-tracker

## 🌐 CDN Usage

<script src="https://cdn.jsdelivr.net/npm/@YOUR-USERNAME/seo-tracker@latest/seo-tracker.js"></script>
```

### Monitor Usage

- npm downloads: https://www.npmjs.com/package/@YOUR-USERNAME/seo-tracker
- GitHub stars: https://github.com/YOUR-USERNAME/seo-tracker
- Issues: https://github.com/YOUR-USERNAME/seo-tracker/issues

---

## 🎉 Success!

Once published, users can install your library with:

```bash
npm install @YOUR-USERNAME/seo-tracker
```

Or use via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@YOUR-USERNAME/seo-tracker@latest/seo-tracker.js"></script>
```

**Your tracking library is now publicly available!** 🚀

---

## 📞 Next Steps

1. Share the npm package link with your team
2. Update main project docs with installation instructions
3. Add npm badge to README.md
4. Monitor for issues and feature requests
5. Consider setting up CI/CD for automated publishing

**Questions?** Create an issue on GitHub or check npm documentation.
