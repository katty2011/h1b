console.log('Content script loaded');

// Function to clean up company names
function cleanCompanyName(name) {
  // Remove any non-alphanumeric characters except spaces, and normalize spaces
  return name.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

// Function to check for and process company elements
function processCompanyElements(data) {
  const linkedInSelector = 'span.job-card-container__primary-description:not(.processed)';
  const glassdoorSelector = 'span.EmployerProfile_compactEmployerName__LE242:not(.processed)'; // Updated selector for Glassdoor

  const companyNameElements = document.querySelectorAll(`${linkedInSelector}, ${glassdoorSelector}`);
  console.log(`Found ${companyNameElements.length} company elements`); // Log the number of elements found

  companyNameElements.forEach(element => {
    console.log('Element innerHTML:', element.innerHTML); // Log the innerHTML of each element
    if (element && element.textContent) {
      // Clean and normalize the company name
      const companyName = cleanCompanyName(element.textContent);
      console.log('Cleaned company name:', companyName); // Log the cleaned company name

      // Ensure the cleaned company name is significant (longer than 2 characters)
      if (companyName.length <= 2) {
        console.log(`Company name "${companyName}" is too short to be considered.`);
        return;
      }

      // First Pass: Exact match of the company name
      const sponsorInfo = data.find(company => {
        const cleanedCompany = cleanCompanyName(company.Company);
        // Ensure the JSON company name is significant (longer than 2 characters)
        return cleanedCompany.length > 2 && (cleanedCompany === companyName || cleanedCompany.includes(companyName) || companyName.includes(cleanedCompany));
      });

      if (sponsorInfo) {
        console.log('Exact sponsorship info found:', sponsorInfo); // Log the sponsorship info
        displaySponsorshipInfo(element, 'green', sponsorInfo.Company);
      } else {
        console.log(`Exact sponsorship info not found for company: ${companyName}`); // Log when not found

        // Second Pass: Check for partial match based on the first token
        const firstToken = companyName.split(' ')[0];
        const partialSponsorInfo = data.find(company => {
          const cleanedCompany = cleanCompanyName(company.Company);
          const companyFirstToken = cleanedCompany.split(' ')[0];
          return companyFirstToken === firstToken && firstToken.length > 2 && companyFirstToken.length > 2; // Ensure the token is significant
        });

        if (partialSponsorInfo) {
          console.log('Partial sponsorship info found:', partialSponsorInfo); // Log the partial sponsorship info
          displaySponsorshipInfo(element, '#ff4500', partialSponsorInfo.Company); // Updated color for orange circle
        } else {
          console.log(`No significant partial sponsorship info found for company: ${companyName}`); // Log when not found
        }
      }
      // Mark the element as processed to avoid reprocessing
      element.classList.add('processed');
    } else {
      console.error('Company name element is undefined or has no text content:', element);
    }
  });
}

// Function to display the sponsorship info with the specified color and tooltip
function displaySponsorshipInfo(companyNameElement, color, matchedCompanyName) {
  const circle = document.createElement('div');
  circle.style.width = '10px';
  circle.style.height = '10px';
  circle.style.backgroundColor = color;
  circle.style.borderRadius = '50%';
  circle.style.opacity = '0.7';
  circle.style.marginLeft = '5px';
  circle.style.display = 'inline-block';
  circle.style.verticalAlign = 'middle';
  circle.style.position = 'relative'; // Ensure the circle has a position context
  circle.style.zIndex = '1001'; // Ensure the circle is on top

  console.log(`Appending ${color} circle to:`, companyNameElement); // Debug log

  // Insert the circle next to the company name
  companyNameElement.appendChild(circle);
  console.log(`Appended ${color} circle to:`, companyNameElement);

  // Add click event to display the matched company name
  circle.addEventListener('click', () => {
    const label = document.createElement('div');
    label.textContent = `Matched with: ${matchedCompanyName}`;
    label.style.position = 'absolute';
    label.style.backgroundColor = '#333';
    label.style.color = '#fff';
    label.style.padding = '5px';
    label.style.borderRadius = '3px';
    label.style.zIndex = '1000'; // Ensure it appears above other elements
    label.style.opacity = '0.9';

    // Position the label near the circle
    const rect = circle.getBoundingClientRect();
    label.style.top = `${rect.top + window.scrollY + 20}px`;
    label.style.left = `${rect.left + window.scrollX + 20}px`;

    document.body.appendChild(label);

    // Remove the label after 3 seconds
    setTimeout(() => {
      document.body.removeChild(label);
    }, 3000);
  });
}

// Function to load the H-1B sponsorship data and start observing
function loadDataAndObserve() {
  console.log('Loading H-1B sponsorship data...');
  fetch(chrome.runtime.getURL('h1b_sponsors.json'))
    .then(response => {
      console.log('Fetch response:', response); // Log the response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data loaded:', data); // Log the loaded data

      // Filter out invalid or too short company names from JSON data
      data = data.filter(company => cleanCompanyName(company.Company).length > 2);

      // Create a MutationObserver to watch for changes in the DOM
      const observer = new MutationObserver(() => {
        processCompanyElements(data);
      });

      // Start observing the entire document for changes
      observer.observe(document, { childList: true, subtree: true });

      // Process the initial elements
      processCompanyElements(data);
    })
    .catch(error => {
      console.error('Failed to fetch H-1B sponsorship data:', error); // Log detailed error
    });
}

// Load data and start observing when the window loads
window.onload = loadDataAndObserve;
