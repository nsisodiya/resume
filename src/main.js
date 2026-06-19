import './styles/resume.css';
import './styles/print.css';

import { renderResume, printResume } from './renderer/renderer.js';

// Expose printResume globally for easy access
window.printResume = printResume;

async function init() {
  try {
    const response = await fetch('/src/sample/resume.json');
    const json = await response.json();
    
    const container = document.getElementById('resume-container');
    renderResume(json, container);
  } catch (error) {
    console.error('Error loading resume.json:', error);
    document.getElementById('resume-container').innerHTML = `<p style="color:red">Failed to load resume JSON.</p>`;
  }
}

init();
