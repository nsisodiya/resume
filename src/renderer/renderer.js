import { renderHeader } from './header.js';
import { renderSection } from './section.js';

/**
 * Main renderer that orchestrates building the resume HTML
 * @param {Object} json - The resume data
 * @param {HTMLElement} container - The DOM element to render into
 */
export function renderResume(json, container) {
  // Clear container
  container.innerHTML = '';

  // Apply page styling from JSON
  if (json.page) {
    // Apply screen padding
    if (json.page.margin) {
      container.style.padding = json.page.margin;
    }
    
    // Inject dynamic print styling for page margin
    let printStyleEl = document.getElementById('dynamic-print-style');
    if (!printStyleEl) {
      printStyleEl = document.createElement('style');
      printStyleEl.id = 'dynamic-print-style';
      document.head.appendChild(printStyleEl);
    }
    
    const marginValue = json.page.margin || '0.6in';
    printStyleEl.textContent = `
      @media print {
        @page {
          margin: ${marginValue} !important;
        }
        #resume-container {
          padding: 0 !important;
        }
      }
    `;
  }

  // Render Header
  if (json.header) {
    const headerEl = renderHeader(json.header);
    container.appendChild(headerEl);
  }

  // Render Sections
  if (json.sections && Array.isArray(json.sections)) {
    json.sections.forEach(sectionData => {
      const sectionEl = renderSection(sectionData);
      if (sectionEl) {
        container.appendChild(sectionEl);
      }
    });
  }
}

/**
 * Helper to trigger a print dialog
 */
export function printResume() {
  window.print();
}
