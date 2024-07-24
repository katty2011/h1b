H-1B Sponsorship Checker
The H-1B Sponsorship Checker is a Chrome extension that helps job seekers quickly identify if companies sponsor H-1B visas. The extension works on job listing sites like LinkedIn and Glassdoor, adding a visual indicator (green or orange circle) next to the company names based on their H-1B sponsorship status.

Features
Exact Match Indicator (Green Circle): Displays a green circle next to company names that exactly match the H-1B sponsorship data.
Partial Match Indicator (Orange Circle): Displays an orange circle for partial matches based on the first token of the company name.
Dynamic Tooltip: Shows detailed information about the matched company when the indicator is clicked.
Support for Job Listings and Detailed Pages: Works on both job listing pages and detailed job description pages.
Installation
Clone the Repository:

sh
Copy code
git clone https://github.com/katty2011/h1b.git
cd h1b
Load the Extension in Chrome:

Open Chrome and navigate to chrome://extensions/.
Enable "Developer mode" using the toggle at the top right.
Click on "Load unpacked" and select the directory where you cloned the repository.
Usage
Visit LinkedIn or Glassdoor:

Go to any job listing page on LinkedIn or Glassdoor.
The extension will automatically add a green or orange circle next to the company names.
View Details:

Click on the circle to see detailed information about the matched company. The tooltip will appear and disappear after a few seconds.
Development
Directory Structure
css
Copy code
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
Key Files
manifest.json: The manifest file that defines the extension.
content.js: The content script that processes company names and displays indicators.
background.js: The background script for handling extension events.
popup.html: The HTML file for the extension's popup.
icons/: Directory containing the extension's icons.
Developing and Testing
Make Changes:

Modify the files as needed.
Save your changes.
Reload the Extension:

Go to chrome://extensions/ in Chrome.
Click the "Reload" button for the H-1B Sponsorship Checker extension.
Test Your Changes:

Visit LinkedIn or Glassdoor to see your changes in action.
Contributing
Fork the Repository:

Click the "Fork" button at the top right of the repository page.
Clone Your Fork:

sh
Copy code
git clone https://github.com/<your-username>/h1b.git
cd h1b
Create a Branch:

sh
Copy code
git checkout -b feature-branch
Make Your Changes:

Commit and push your changes to your fork.
sh
Copy code
git add .
git commit -m "Description of changes"
git push origin feature-branch
Open a Pull Request:

Go to the original repository and open a pull request with a description of your changes.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
This extension was inspired by the need to simplify the job search process for H-1B visa seekers.
