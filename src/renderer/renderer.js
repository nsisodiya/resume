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
    if (json.page.margin) {
      container.style.padding = json.page.margin;
    }
    // We could add more page styles if needed here
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
