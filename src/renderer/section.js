import { renderTimeline } from './timeline.js';
import { renderKeyValue } from './keyValue.js';

/**
 * Dispatcher for rendering a section based on its type.
 * Adding new section types is as easy as adding a case here.
 * @param {Object} sectionData 
 * @returns {HTMLElement}
 */
export function renderSection(sectionData) {
  const section = document.createElement('section');
  section.className = 'resume-section';

  if (sectionData.title) {
    const h3 = document.createElement('h3');
    h3.textContent = sectionData.title;
    section.appendChild(h3);
  }

  // Dispatch rendering based on section type
  switch (sectionData.type) {
    case 'timeline':
      const timelineContent = renderTimeline(sectionData.entries || []);
      section.appendChild(timelineContent);
      break;

    case 'keyValue':
      const keyValueContent = renderKeyValue(sectionData.entries || []);
      section.appendChild(keyValueContent);
      break;

    default:
      console.warn(`Unknown section type: ${sectionData.type}`);
      break;
  }

  return section;
}
