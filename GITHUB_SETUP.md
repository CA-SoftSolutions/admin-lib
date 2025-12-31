# 🚀 GitHub Setup Guide

Complete guide to publish the SEO Tracker library on GitHub and make it available for external projects.

## 📋 Prerequisites

- GitHub account
- Git installed locally
- Node.js 14+ installed

## 🎯 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon → **"New repository"**
3. Repository settings:
   - **Name:** `seo-tracker`
   - **Description:** `Lightweight JavaScript tracking library for web analytics`
   - **Visibility:** Public (for CDN access)
   - **Initialize:** Don't check any boxes
4. Click **"Create repository"**

### Step 2: Initialize Local Repository

Open terminal/command prompt in the `seo-tracker-package` directory:

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: SEO Tracker v1.0.0"

# Add remote (replace with your GitHub username)
git remote add origin https://github.com/Tharshigan-zincat/admin-lib.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Create Release

1. Go to your repository on GitHub
2. Click **"Releases"** → **"Create a new release"**
3. Release settings:
   - **Tag:** `v1.0.0`
   - **Title:** `SEO Tracker v1.0.0`
   - **Description:**
     ```markdown
     ## 🎉 Initial Release

     ### Features
     - ✅ Auto-tracking: page views, clicks, scroll, visibility
     - ✅ Custom event tracking
     - ✅ Privacy-first: DNT support, opt-out, IP anonymization
     - ✅ Zero dependencies
     - ✅ TypeScript definitions included
     - ✅ Multiple integration examples

     ### Installation
     \`\`\`html
     <script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/seo-tracker@v1.0.0/seo-tracker.js"></script>
     \`\`\`

     ### Documentation
     See [README.md](https://github.com/YOUR-USERNAME/seo-tracker#readme)
     ```
4. Click **"Publish release"**

### Step 4: Enable GitHub Pages (Optional)

For documentation hosting:

1. Go to repository **Settings** → **Pages**
2. Source: Deploy from branch
3. Branch: `main` / `docs` folder
4. Click **Save**

### Step 5: Update README with Correct URLs

Replace all instances of `yourusername` in README.md with your actual GitHub username:

```bash
# In README.md, update:
- https://github.com/yourusername/seo-tracker
+ https://github.com/YOUR-ACTUAL-USERNAME/seo-tracker

- https://cdn.jsdelivr.net/gh/yourusername/seo-tracker
+ https://cdn.jsdelivr.net/gh/YOUR-ACTUAL-USERNAME/seo-tracker
```

Then commit and push:

```bash
git add README.md
git commit -m "Update repository URLs"
git push
```

## 🌐 CDN Access Methods

Once published on GitHub, your library is available via multiple CDNs:

### jsDelivr (Recommended)

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/seo-tracker@latest/seo-tracker.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/seo-tracker@v1.0.0/seo-tracker.js"></script>

<!-- Minified version -->
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/seo-tracker@latest/seo-tracker.min.js"></script>
```

### GitHub Raw

```html
<!-- Main branch -->
<script src="https://raw.githubusercontent.com/YOUR-USERNAME/seo-tracker/main/seo-tracker.js"></script>

<!-- Specific release -->
<script src="https://raw.githubusercontent.com/YOUR-USERNAME/seo-tracker/v1.0.0/seo-tracker.js"></script>
```

### unpkg (If published to npm)

```html
<script src="https://unpkg.com/seo-tracker@latest/seo-tracker.js"></script>
```

## 📦 Optional: Publish to npm

If you want to make it available via npm:

### 1. Create npm Account
- Sign up at [npmjs.com](https://www.npmjs.com/signup)

### 2. Login via CLI
```bash
npm login
```

### 3. Update package.json
```json
{
  "name": "seo-tracker",
  "version": "1.0.0",
  "repository": {
    "url": "https://github.com/YOUR-USERNAME/seo-tracker.git"
  },
  "author": "Your Name <your.email@example.com>"
}
```

### 4. Publish
```bash
# Test what will be published
npm publish --dry-run

# Publish to npm
npm publish
```

### 5. Install in Projects
```bash
npm install seo-tracker
```

## 🔖 Version Management

### Creating New Versions

1. **Update version in package.json:**
```json
{
  "version": "1.1.0"
}
```

2. **Commit changes:**
```bash
git add .
git commit -m "Version 1.1.0: Add new features"
```

3. **Create git tag:**
```bash
git tag v1.1.0
git push origin v1.1.0
git push
```

4. **Create GitHub release** (see Step 3 above)

5. **Publish to npm** (if applicable):
```bash
npm publish
```

## 📊 Usage in External Projects

### Method 1: Direct CDN Include

```html
<!DOCTYPE html>
<html>
<head>
  <title>External Project</title>
</head>
<body>
  <h1>My External Website</h1>

  <script src="https://cdn.jsdelivr.net/gh/Tharshigan-zincat/admin-lib@latest/seo-tracker.js"></script>
  <script>
    SEOTracker.init({
      apiUrl: 'https://your-admin-domain.com/api/tracking',
      projectId: 'your-project-uuid-from-admin-panel'
    });
  </script>
</body>
</html>
```

### Method 2: npm Package

```bash
npm install seo-tracker
```

```javascript
import SEOTracker from 'seo-tracker';

SEOTracker.init({
  apiUrl: 'https://your-admin-domain.com/api/tracking',
  projectId: 'your-project-uuid'
});
```

### Method 3: Download and Self-Host

1. Download `seo-tracker.js` from GitHub
2. Host on your own server
3. Include in your project:

```html
<script src="/js/seo-tracker.js"></script>
```

## 🛡️ Security Best Practices

1. **Enable Branch Protection:**
   - Go to Settings → Branches
   - Add rule for `main` branch
   - Require pull request reviews

2. **Add Security Policy:**
   - Create `SECURITY.md` in repository
   - Describe how to report vulnerabilities

3. **Enable Dependabot:**
   - Go to Settings → Security & analysis
   - Enable Dependabot alerts

4. **Code Scanning:**
   - Enable CodeQL analysis
   - Review security alerts regularly

## 📝 Repository Maintenance

### Required Files Checklist

- ✅ `README.md` - Main documentation
- ✅ `LICENSE` - MIT License
- ✅ `package.json` - Package configuration
- ✅ `seo-tracker.js` - Main library file
- ✅ `seo-tracker.d.ts` - TypeScript definitions
- ✅ `.gitignore` - Git ignore rules
- ✅ `EXAMPLES.md` - Usage examples

### Recommended Additional Files

- `CONTRIBUTING.md` - Contribution guidelines
- `CHANGELOG.md` - Version history
- `CODE_OF_CONDUCT.md` - Community guidelines
- `SECURITY.md` - Security policy
- `.github/workflows/` - CI/CD workflows

## 🔗 Integration with Admin Dashboard

### Update Admin Dashboard Documentation

1. Update your admin dashboard docs with the correct CDN URL:

```javascript
// In your docs/guide page
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/seo-tracker@latest/seo-tracker.js"></script>
```

2. Update API endpoint in examples:

```javascript
SEOTracker.init({
  apiUrl: 'https://YOUR-ADMIN-DOMAIN.com/api/tracking',
  projectId: 'GET-FROM-ADMIN-PANEL'
});
```

### Test Integration

1. Deploy admin dashboard to production
2. Create test project in admin panel
3. Copy project UUID
4. Create test HTML page with CDN script
5. Initialize with production API URL
6. Verify events appear in tracking dashboard

## 🎉 Success Checklist

- ✅ Repository created on GitHub
- ✅ Initial commit pushed
- ✅ Release v1.0.0 published
- ✅ CDN URLs tested and working
- ✅ README updated with correct URLs
- ✅ Documentation complete
- ✅ Examples provided
- ✅ TypeScript definitions included
- ✅ Integration tested end-to-end

## 📧 Next Steps

1. Share the repository link with your team
2. Add badges to README (build status, npm version, etc.)
3. Set up CI/CD for automated testing
4. Create example integrations for popular frameworks
5. Write blog post announcing the release
6. Submit to JavaScript library directories

## 🆘 Troubleshooting

### CDN Not Loading
- Wait 5-10 minutes after release for CDN propagation
- Clear browser cache
- Check GitHub release is published
- Verify URL is correct

### 404 Errors
- Ensure files are in repository root, not subdirectory
- Check file paths are case-sensitive
- Verify release tag matches URL

### CORS Issues
- Ensure your API endpoint has proper CORS headers
- Check browser console for specific errors
- Verify apiUrl is correct

---

**Need Help?** Open an issue on GitHub or contact the maintainer.

**Ready to Deploy?** Follow the steps above and your library will be live! 🚀
