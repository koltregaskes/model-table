# Contributing to AI Models Dashboard

Thank you for your interest in contributing to the AI Models Dashboard! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Search existing issues before creating new ones
- Use the provided issue templates
- Include clear, detailed descriptions
- Add screenshots when applicable

### Suggesting Features
- Use the feature request template
- Explain the use case and benefit
- Consider implementation complexity
- Discuss with maintainers before starting work

### Code Contributions
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Test** your changes thoroughly
5. **Commit** with clear messages (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Create** a Pull Request

## 📋 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow JavaScript best practices
- Comment complex logic
- Use meaningful variable names
- Keep functions focused and small

### Testing
- Test all functionality before submitting
- Verify mobile responsiveness
- Check cross-browser compatibility
- Validate data formats

### Documentation
- Update README.md for new features
- Add inline comments for complex code
- Update MAINTENANCE.md for new processes
- Include examples where helpful

## 🔍 Pull Request Process

### Before Submitting
- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No merge conflicts exist
- [ ] Branch is up to date with main

### PR Requirements
- Clear title and description
- Link to related issues
- Include screenshots for UI changes
- List breaking changes (if any)
- Request appropriate reviewers

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** by reviewers
4. **Approval** and merge

## 🎯 Types of Contributions

### Data Updates
- Adding new AI models
- Updating pricing information
- Correcting model specifications
- Adding new providers

### Feature Development
- New filtering options
- Enhanced search capabilities
- Additional export formats
- Performance improvements

### Bug Fixes
- Fixing broken functionality
- Resolving display issues
- Correcting data parsing errors
- Improving error handling

### Documentation
- Improving README clarity
- Adding code comments
- Creating tutorials
- Updating maintenance guides

## 🚀 Getting Started

### Development Setup
1. **Clone** the repository:
   ```bash
   git clone https://github.com/yourusername/ai-models-dashboard.git
   cd ai-models-dashboard
   ```

2. **Create** a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Open** in browser: `http://localhost:8000`

### Making Changes
1. **Edit** the relevant files
2. **Test** locally
3. **Validate** CSV data format
4. **Check** for JavaScript errors
5. **Verify** responsive design

## 📊 Data Contribution Guidelines

### Adding New Models
When adding new AI models to `model_list.csv`:

- **Research** thoroughly for accurate information
- **Use consistent** naming conventions
- **Verify** all data points
- **Include** release date in YYYY-MM-DD format
- **Update** last-updated.txt timestamp

### Data Quality Standards
- All fields must be complete (use "Unknown" if necessary)
- Dates must be in ISO format (YYYY-MM-DD)
- Costs must be in USD per 1K tokens
- Status must be: Available, Limited Access, Deprecated, or Beta
- Source must be the official provider name

## 🎨 Design Contributions

### UI/UX Improvements
- Maintain consistent design language
- Ensure accessibility compliance
- Test on multiple devices
- Consider colorblind users
- Maintain fast loading times

### Responsive Design
- Mobile-first approach
- Test on various screen sizes
- Ensure touch-friendly interactions
- Optimize for performance

## 🔧 Technical Requirements

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance Standards
- Page load time < 3 seconds
- Mobile performance score > 80
- Accessibility score > 90
- SEO score > 80

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Request Comments**: Code-specific discussions

### Maintainer Contact
- Create an issue for general questions
- Tag maintainers in urgent matters
- Use draft PRs for early feedback

## 🏆 Recognition

Contributors are recognized in several ways:
- Listed in repository contributors
- Mentioned in release notes
- Featured in documentation
- Repository badges and achievements

## 📜 Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards
- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment
- Respect different viewpoints and experiences

---

Thank you for contributing to making the AI Models Dashboard better for everyone! 🚀