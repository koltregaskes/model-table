# Deployment Guide for AI Models Dashboard

This comprehensive guide covers deploying your AI Models Dashboard to GitHub Pages and other hosting platforms.

## 🚀 GitHub Pages Deployment (Recommended)

### Quick Setup (5 minutes)

1. **Fork or Clone Repository**
   ```bash
   git clone https://github.com/yourusername/ai-models-dashboard.git
   cd ai-models-dashboard
   ```

2. **Upload Your Data Files**
   - Replace `model_list.csv` with your actual data
   - Update `model_list_headers.csv` if you changed column names
   - Update `last-updated.txt` with current timestamp

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select "Deploy from a branch"
   - Select **Branch**: `main` (or `master`)
   - Select **Folder**: `/ (root)`
   - Click **Save**

4. **Access Your Site**
   - URL: `https://yourusername.github.io/repository-name`
   - May take 5-10 minutes for first deployment

### Advanced GitHub Pages Setup

#### Custom Domain Configuration
1. **Add CNAME file** to repository root:
   ```
   your-domain.com
   ```

2. **Configure DNS** at your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   
   Type: A (for apex domain)
   Name: @
   Value: 185.199.108.153
         185.199.109.153
         185.199.110.153
         185.199.111.153
   ```

3. **Enable HTTPS** in repository settings (recommended)

#### GitHub Actions for Automation
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 🌐 Alternative Hosting Platforms

### Netlify Deployment

1. **Connect Repository**
   - Sign up at [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: (leave empty)
   - Publish directory: (leave empty - use root)
   - Deploy branch: `main`

3. **Environment Variables** (if needed)
   - Go to Site settings → Environment variables
   - Add any required variables

4. **Custom Domain** (optional)
   - Site settings → Domain management
   - Add custom domain and configure DNS

### Vercel Deployment

1. **Connect Repository**
   - Sign up at [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Project Settings**
   - Framework: Other
   - Root directory: `./`
   - Build command: (leave empty)
   - Output directory: (leave empty)

3. **Deploy**
   - Click "Deploy"
   - Site will be live at `https://your-project.vercel.app`

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Project**
   ```bash
   firebase init hosting
   # Select your Firebase project
   # Public directory: . (current directory)
   # Single-page app: No
   # Overwrite index.html: No
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

## 📁 File Organization for Deployment

### Recommended Structure
```
your-repository/
├── index.html              # Entry point
├── style.css               # Styles
├── app.js                  # Application logic
├── model_list.csv          # Your data
├── model_list_headers.csv  # Column mappings
├── last-updated.txt        # Update timestamp
├── README.md               # Documentation
├── MAINTENANCE.md          # Maintenance guide
├── DEPLOYMENT.md           # This file
├── .gitignore              # Git ignore rules
├── CNAME                   # Custom domain (if used)
└── .github/
    └── workflows/
        └── deploy.yml      # CI/CD automation
```

### Essential Files Checklist
- [ ] `index.html` - Main page
- [ ] `style.css` - Styling
- [ ] `app.js` - JavaScript functionality
- [ ] `model_list.csv` - Your data
- [ ] `model_list_headers.csv` - Headers mapping
- [ ] `last-updated.txt` - Timestamp
- [ ] `README.md` - Documentation

## 🔧 Pre-Deployment Checklist

### Data Validation
- [ ] CSV files are properly formatted
- [ ] No missing or malformed data
- [ ] Dates are in YYYY-MM-DD format
- [ ] Numbers are valid (no text in numeric columns)
- [ ] All required columns present

### Functionality Testing
- [ ] Site loads without errors
- [ ] Search functionality works
- [ ] All filters function properly
- [ ] Table sorting works
- [ ] Export feature works
- [ ] Mobile responsiveness verified
- [ ] Theme toggle works

### Performance Optimization
- [ ] Images are optimized (if any)
- [ ] CSS is minified (optional)
- [ ] JavaScript is error-free
- [ ] No console errors
- [ ] Fast loading (< 3 seconds)

### Security Review
- [ ] No sensitive data exposed
- [ ] All external links use HTTPS
- [ ] CSP headers configured
- [ ] Input sanitization in place
- [ ] No XSS vulnerabilities

## 🚨 Troubleshooting Common Issues

### GitHub Pages Not Loading
**Symptoms**: 404 error or site not accessible
**Solutions**:
1. Check repository is public (or you have GitHub Pro)
2. Verify Pages source is set correctly
3. Ensure `index.html` exists in root directory
4. Wait 10-15 minutes for propagation
5. Check GitHub Pages status page

### CSS/JS Not Loading
**Symptoms**: Unstyled page or broken functionality
**Solutions**:
1. Check file paths are relative (not absolute)
2. Ensure case-sensitive filenames match
3. Verify files are committed to repository
4. Check browser console for 404 errors
5. Clear browser cache

### CSV Data Not Loading
**Symptoms**: Empty table or "Loading..." message persists
**Solutions**:
1. Verify CSV file format is correct
2. Check for UTF-8 encoding issues
3. Ensure file paths in JavaScript are correct
4. Test CSV parsing locally
5. Check browser network tab for failed requests

### Custom Domain Issues
**Symptoms**: Domain not resolving or SSL errors
**Solutions**:
1. Verify DNS records are correct
2. Wait for DNS propagation (up to 48 hours)
3. Check CNAME file contents
4. Ensure SSL is enabled in GitHub settings
5. Test with and without www prefix

## 🔄 Continuous Deployment

### Automated Updates
Set up automation for regular updates:

1. **Data Updates**: Use GitHub Actions to pull data from external APIs
2. **Dependency Updates**: Automated security updates
3. **Content Updates**: Scheduled tasks for routine maintenance
4. **Testing**: Automated testing on each deployment

### Update Workflow Example
```yaml
name: Update Model Data

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM
  workflow_dispatch:

jobs:
  update-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Update timestamp
        run: echo "$(date '+%Y-%m-%d %H:%M:%S')" > last-updated.txt
      
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add last-updated.txt
          git diff --staged --quiet || git commit -m "Auto-update timestamp"
          git push
```

## 📊 Monitoring and Analytics

### Performance Monitoring
1. **Google PageSpeed Insights**: Test site performance
2. **GTmetrix**: Comprehensive performance analysis
3. **WebPageTest**: Detailed loading analysis

### Analytics Setup
Add Google Analytics or similar:

```html
<!-- Add to <head> section of index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring
Consider services like:
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Performance and uptime tracking
- **StatusCake**: Website monitoring

## 🛡️ Security Considerations

### HTTPS Configuration
- Always use HTTPS (enabled by default on GitHub Pages)
- Redirect HTTP to HTTPS
- Use secure headers

### Content Security Policy
Add to `<head>` section:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### Regular Security Updates
- Monitor for security advisories
- Keep dependencies updated
- Regular security scans
- Review access permissions

## 📞 Support and Resources

### Documentation
- [GitHub Pages Official Docs](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

### Community Support
- GitHub Pages Community Forum
- Stack Overflow (tagged with `github-pages`)
- GitHub Issues in this repository

### Professional Support
- GitHub Support (for paid accounts)
- Platform-specific support channels
- Web development consultants

---

**Need Help?** Open an issue in the repository or check the documentation. This deployment guide is regularly updated to reflect best practices and platform changes.