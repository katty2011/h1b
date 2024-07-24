# Sponsorship Checker

## Overview
The H-1B Sponsorship Checker is a Chrome extension designed to assist job seekers in quickly identifying companies that sponsor H-1B visas. It enhances job listing pages on platforms like LinkedIn and Glassdoor by adding visual indicators next to company names, providing instant insight into their H-1B sponsorship status.

## Features
- **Visual Indicators**: 
  - Green circle: Exact match with H-1B sponsorship data
  - Orange circle: Partial match based on the first part of the company name
- **Interactive Tooltips**: Click on indicators to view detailed company information
- **Wide Coverage**: Works on both job listing pages and detailed job description pages
- **Supported Platforms**: Currently functional on LinkedIn and Glassdoor

## Installation
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/katty2011/h1b.git
   cd h1b
2. Open Google Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked" and select the cloned repository directory

## Usage
1. Browse job listings on LinkedIn or Glassdoor
2. Look for green or orange circles next to company names
3. Click on circles to view additional sponsorship information

## Technical Details
- **Languages**: JavaScript, HTML, CSS
- **APIs**: Chrome Extension API
- **Data Source**: Curated database of H-1B sponsoring companies

## Project Structure
 ```
  h1b/
  │
  ├── icons/
  │   ├── icon16.png
  │   ├── icon48.png
  │   └── icon128.png
  │
  ├── background.js
  ├── content.js
  ├── manifest.json
  └── popup.html
```

## Development
To contribute or modify the extension:
1. Make changes to the relevant files
2. Test locally by reloading the extension in Chrome
3. Submit pull requests for review

## Future Enhancements
- [ ] Expand to additional job listing platforms
- [ ] Implement user-contributed data for sponsorship information
- [ ] Add filters for job searches based on sponsorship likelihood

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements
- Thanks to all contributors who have helped shape this project
- Inspired by the challenges faced by international job seekers in the tech industry
