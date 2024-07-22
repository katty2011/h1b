// Function to clean up company names
function cleanCompanyName(name) {
  // Remove any non-alphanumeric characters except spaces, and normalize spaces
  return name.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

// Function to check for and process company elements
function processCompanyElements(data) {
  const companyNameElements = document.querySelectorAll('span.job-card-container__primary-description:not(.processed)');
  console.log(`Found ${companyNameElements.length} company elements`); // Log the number of elements found
  companyNameElements.forEach(element => {
    console.log('Element innerHTML:', element.innerHTML); // Log the innerHTML of each element
    if (element && element.textContent) {
      // Clean and normalize the company name
      const companyName = cleanCompanyName(element.textContent);
      console.log('Cleaned company name:', companyName); // Log the cleaned company name

      // First Pass: Check if the company name exists in the sponsorship data
      const sponsorInfo = data.find(company => company.Company.toLowerCase().includes(companyName));
      if (sponsorInfo) {
        console.log('Sponsorship info found:', sponsorInfo); // Log the sponsorship info
        displaySponsorshipInfo(element, 'green');
      } else {
        console.log(`Sponsorship info not found for company: ${companyName}`); // Log when not found
        // Second Pass: Check if the first token of the company name is a substring in any company name from the JSON
        const firstToken = companyName.split(' ')[0];
        const partialSponsorInfo = data.find(company => company.Company.toLowerCase().includes(firstToken));
        if (partialSponsorInfo) {
          console.log('Partial sponsorship info found:', partialSponsorInfo); // Log the partial sponsorship info
          displaySponsorshipInfo(element, '#ff4500');
        }
      }
      // Mark the element as processed
      element.classList.add('processed');
    } else {
      console.error('Company name element is undefined or has no text content:', element);
    }
  });
}

// Function to display the sponsorship info with the specified color
function displaySponsorshipInfo(companyNameElement, color) {
  const circle = document.createElement('div');
  circle.style.width = '10px';
  circle.style.height = '10px';
  circle.style.backgroundColor = color;
  circle.style.borderRadius = '50%';
  circle.style.opacity = '0.7';
  circle.style.marginLeft = '5px';
  circle.style.display = 'inline-block';
  circle.style.verticalAlign = 'middle';

  // Insert the circle next to the company name
  companyNameElement.appendChild(circle);
  console.log(`Appended ${color} circle to:`, companyNameElement);
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