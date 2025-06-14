# Maintenance Guide for AI Models Dashboard

This guide provides comprehensive instructions for maintaining the AI Models Dashboard, specifically designed for AI assistants (ChatGPT, Claude, etc.) and human developers.

## 🤖 AI Assistant Quick Reference

### Common Maintenance Tasks

#### 1. Adding New AI Models
```bash
# Step 1: Open model_list.csv
# Step 2: Add new row with this format:
model_name,status,source,release_date,parameters,context_length,cost_per_1k_tokens
new-model-name,Available,Provider,2025-06-14,Unknown,32000,0.005

# Step 3: Update last-updated.txt with current timestamp
echo "2025-06-14 13:45:00" > last-updated.txt
```

#### 2. Updating Model Status
- Change "Available" to "Deprecated" for discontinued models
- Change "Limited Access" to "Available" for newly released models
- Update pricing information regularly

#### 3. Adding New Providers
When adding models from new providers, ensure:
- Provider name is consistent across all models
- Provider tag extraction works (check `extractProviderFromModelName()` function)
- New provider appears in filter dropdown

## 📋 Regular Maintenance Schedule

### Daily (Automated)
- [ ] Check for broken links or errors
- [ ] Monitor site performance
- [ ] Verify CSV data integrity

### Weekly
- [ ] Update model pricing (costs can change frequently)
- [ ] Add new model releases
- [ ] Check for deprecated models
- [ ] Review user feedback/issues

### Monthly
- [ ] Comprehensive data audit
- [ ] Update documentation
- [ ] Security review
- [ ] Performance optimization
- [ ] Backup data files

### Quarterly
- [ ] Major feature updates
- [ ] Design refreshes
- [ ] Accessibility audit
- [ ] Browser compatibility testing

## 🔧 Technical Maintenance

### File Structure Understanding

```
Repository Root/
├── index.html              # Main page - rarely needs changes
├── style.css               # Styling - update for design changes
├── app.js                  # Core functionality - update for features
├── model_list.csv          # DATA FILE - update frequently
├── model_list_headers.csv  # Column mapping - rarely change
├── last-updated.txt        # Timestamp - update with data changes
└── README.md               # Documentation - keep current
```

### Data File Formats

#### model_list.csv Format
```csv
model_name,status,source,release_date,parameters,context_length,cost_per_1k_tokens
```

**Column Definitions:**
- `model_name`: Unique identifier (e.g., "gpt-4-turbo", "claude-3-opus")
- `status`: Available | Limited Access | Deprecated | Beta
- `source`: Company/Organization name (OpenAI, Anthropic, Google, etc.)
- `release_date`: YYYY-MM-DD format
- `parameters`: Model size (1.76T, 70B, Unknown)
- `context_length`: Number (token limit)
- `cost_per_1k_tokens`: Decimal number (USD)

#### model_list_headers.csv Format
```csv
model_name,status,source,release_date,parameters,context_length,cost_per_1k_tokens
model_name,status,source,release_date,parameters,context_length,cost_per_1k_tokens
```
*Note: This file maps internal column names to display names. Usually doesn't need changes.*

### Common Code Modifications

#### Adding New Columns
1. **Update CSV files** with new column
2. **Modify app.js** `createTableRow()` function
3. **Update CSS** for new column styling
4. **Update header mapping** if needed

#### Modifying Filters
1. **Locate filter functions** in app.js
2. **Update `handleFilterChange()`** method
3. **Add new filter UI** in index.html
4. **Style new filter** in style.css

#### Provider Tag Extraction
The system automatically extracts provider tags from model names:

```javascript
// In app.js - extractProviderFromModelName() function
const providerMappings = {
    'gpt': 'GPT',
    'claude': 'Claude',
    'gemini': 'Gemini',
    'llama': 'LLaMA',
    'mistral': 'Mistral',
    'palm': 'PaLM',
    'command': 'Command',
    'yi': 'Yi',
    'deepseek': 'DeepSeek'
};
```

To add new providers, update this mapping object.

## 🚨 Troubleshooting

### Common Issues and Solutions

#### Data Not Loading
1. **Check CSV format** - ensure no missing commas or quotes
2. **Verify file paths** - confirm CSV files are in root directory
3. **Check browser console** - look for JavaScript errors
4. **Validate CSV content** - ensure no special characters breaking parsing

#### Filters Not Working
1. **Check column names** match between CSV and code
2. **Verify data types** (dates, numbers) are formatted correctly
3. **Test with minimal dataset** to isolate issues

#### Styling Issues
1. **Check CSS selectors** match HTML structure
2. **Verify responsive breakpoints** for mobile devices
3. **Test across different browsers**

#### Performance Issues
1. **Optimize large datasets** - consider pagination for 100+ models
2. **Minimize DOM updates** during filtering
3. **Check for memory leaks** in event listeners

## 🛡️ Security Maintenance

### Regular Security Checks
- [ ] Validate all user inputs are sanitized
- [ ] Ensure CSP headers are properly configured
- [ ] Check for XSS vulnerabilities in dynamic content
- [ ] Verify no external scripts loaded without integrity checks
- [ ] Monitor for suspicious activity or bot traffic

### Security Best Practices
1. **Never trust user input** - always sanitize
2. **Use HTTPS only** for all external resources
3. **Keep dependencies minimal** - fewer attack vectors
4. **Regular security audits** using automated tools
5. **Monitor GitHub security alerts**

## 📊 Performance Monitoring

### Key Metrics to Track
- **Page load time** (target: <3 seconds)
- **CSV parsing time** (target: <500ms)
- **Filter response time** (target: <100ms)
- **Mobile performance scores**
- **Accessibility scores**

### Optimization Tips
1. **Lazy load large datasets**
2. **Use efficient filtering algorithms**
3. **Minimize DOM manipulations**
4. **Optimize CSS for rendering performance**
5. **Compress images and assets**

## 🔄 Version Control Best Practices

### Commit Messages
```bash
# Good commit messages
git commit -m "Add GPT-4 Turbo model data"
git commit -m "Fix: Status filter not working with new data"
git commit -m "Update: Q1 2025 pricing information"
git commit -m "Feature: Add export to JSON functionality"

# Bad commit messages
git commit -m "updates"
git commit -m "fix bug"
git commit -m "changes"
```

### Branching Strategy
- `main` - Production ready code
- `develop` - Integration branch for new features
- `feature/model-updates` - Specific feature branches
- `hotfix/critical-bug` - Urgent fixes

## 🤝 AI Assistant Collaboration

### When Working with AI Assistants

#### Provide Context
```markdown
Current task: Adding new Anthropic models
Current model count: 15
Last update: 2025-06-14
Recent changes: Added Cohere Command-R models
Known issues: None
```

#### Clear Instructions
1. **Be specific** about what needs updating
2. **Provide example data** in the correct format
3. **Mention any constraints** or requirements
4. **Specify testing needs**

#### Validation Steps
After AI makes changes:
1. **Review data format** consistency
2. **Test all functionality** (search, filters, sorting)
3. **Check mobile responsiveness**
4. **Verify no broken features**

## 📞 Support and Resources

### Getting Help
- **GitHub Issues** - Report bugs or request features
- **GitHub Discussions** - Ask questions or share ideas
- **Documentation** - Check all `.md` files in repository
- **Code Comments** - Read inline documentation in source files

### Useful Resources
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [CSV Format Specification](https://tools.ietf.org/html/rfc4180)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Remember**: Always test changes in a development environment before pushing to the main branch. Keep backups of working versions, and document any custom modifications for future maintainers.