# AI Models Dashboard

A professional, interactive dashboard for tracking AI language models, their capabilities, pricing, and availability. Built for GitHub Pages with modern web technologies.

## 🚀 Features

- **Interactive Data Table**: Sortable, filterable table with all AI model information
- **Advanced Search & Filtering**: Real-time search with status, source, and date range filters
- **Dynamic Tags**: Auto-generated provider tags with intelligent extraction
- **Professional Design**: Modern, responsive design with dark/light theme support
- **Export Functionality**: Download filtered data as CSV
- **Security-First**: Built with security best practices and CSP headers
- **Mobile-Responsive**: Optimized for all devices and screen sizes

## 📁 File Structure

```
your-repo/
├── index.html              # Main HTML file
├── style.css               # CSS styles
├── app.js                  # JavaScript functionality
├── model_list.csv          # AI models data
├── model_list_headers.csv  # Column headers mapping
├── last-updated.txt        # Last update timestamp
├── README.md               # This file
├── MAINTENANCE.md          # Maintenance guide
├── DEPLOYMENT.md           # Deployment instructions
└── docs/                   # Additional documentation
    ├── SECURITY.md         # Security guidelines
    └── CONTRIBUTING.md     # Contribution guidelines
```

## 🎯 Quick Start

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages** in repository settings
3. **Update your data files**:
   - `model_list.csv` - Your AI models data
   - `model_list_headers.csv` - Column headers
   - `last-updated.txt` - Update timestamp
4. **Customize** the website title and content as needed
5. **Deploy** - Your site will be live at `https://yourusername.github.io/repository-name`

## 📊 Data Format

### model_list.csv
```csv
model_name,status,source,release_date,parameters,context_length,cost_per_1k_tokens
gpt-4-turbo,Available,OpenAI,2024-04-09,1.76T,128000,0.01
claude-3-opus,Available,Anthropic,2024-02-29,Unknown,200000,0.015
```

### model_list_headers.csv
```csv
model_name,status,source,release_date,parameters,context_length,cost_per_1k_tokens
model_name,status,source,release_date,parameters,context_length,cost_per_1k_tokens
```

## 🔧 Customization

### Adding New Models
1. Add new rows to `model_list.csv`
2. Update `last-updated.txt` with current timestamp
3. Commit and push changes - GitHub Pages will auto-update

### Styling
- Modify `style.css` to change colors, fonts, or layout
- CSS variables are defined at the top for easy customization
- Responsive breakpoints are clearly marked

### Functionality
- Edit `app.js` to add new features or modify existing ones
- All functions are documented with comments
- Modular design allows easy extension

## 🤖 AI Assistant Integration

This project is designed to be easily maintained by AI assistants like ChatGPT, Claude, or other LLMs:

### For AI Assistants:
- **Clear file structure** with descriptive names
- **Comprehensive comments** in all code files
- **Modular design** for easy understanding
- **Detailed documentation** explaining all components
- **Version control friendly** with clear commit messages

### Common AI Maintenance Tasks:
1. **Data Updates**: Modify CSV files with new model information
2. **Feature Additions**: Add new columns, filters, or search capabilities
3. **Design Updates**: Modify CSS for new styling or layout changes
4. **Bug Fixes**: Debug and fix issues with clear error messages
5. **Performance Optimization**: Improve loading times and responsiveness

## 🛠️ Maintenance

### Regular Updates
- **Monthly**: Update model data and pricing information
- **Quarterly**: Review and update deprecated models
- **As Needed**: Add new AI models and providers

### Automated Workflows
Consider setting up GitHub Actions for:
- **Data validation** to ensure CSV format correctness
- **Automatic updates** from external data sources
- **Security scanning** for vulnerabilities
- **Performance monitoring** for load times

## 🔐 Security

- **Content Security Policy (CSP)** headers implemented
- **Input sanitization** for all user inputs
- **No external dependencies** that could introduce vulnerabilities
- **HTTPS only** for all external requests
- **Regular security audits** recommended

## 📱 Browser Support

- **Modern browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile browsers**: iOS Safari 13+, Chrome Mobile 80+
- **Responsive design**: Works on all screen sizes from 320px to 4K

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and community chat

## 🙏 Acknowledgments

- Built with modern web standards and best practices
- Designed for GitHub Pages hosting
- Optimized for AI assistant maintenance
- Focused on security and performance

---

**Last Updated**: June 2025  
**Version**: 1.0.0  
**Maintainer**: Your Name (@yourusername)