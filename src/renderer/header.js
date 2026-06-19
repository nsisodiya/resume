/**
 * Renders the resume header
 * @param {Object} headerData 
 * @returns {HTMLElement}
 */
export function renderHeader(headerData) {
  const header = document.createElement('header');
  header.className = 'resume-header';

  if (headerData.name) {
    const h1 = document.createElement('h1');
    
    // Split the name to style first name and last name differently
    const parts = headerData.name.trim().split(' ');
    const firstWord = parts[0];
    const rest = parts.slice(1).join(' ');

    const spanFirst = document.createElement('span');
    spanFirst.className = 'name-first';
    spanFirst.textContent = firstWord + (rest ? ' ' : '');
    
    const spanLast = document.createElement('span');
    spanLast.className = 'name-last';
    spanLast.textContent = rest;

    h1.appendChild(spanFirst);
    h1.appendChild(spanLast);
    header.appendChild(h1);
  }

  if (headerData.title) {
    const h2 = document.createElement('h2');
    h2.textContent = headerData.title;
    header.appendChild(h2);
  }

  if (headerData.links) {
    const linksDiv = document.createElement('div');
    linksDiv.className = 'header-links';

    const keys = Object.keys(headerData.links);
    keys.forEach((key, index) => {
      const value = headerData.links[key];
      
      let linkEl;
      const isUrl = value.startsWith('http') || value.startsWith('www');
      const isEmail = value.includes('@') && !value.includes(' ');
      const isPhone = /^[0-9+ ()-]+$/.test(value) && value.length > 5;

      if (isUrl || isEmail || isPhone) {
        linkEl = document.createElement('a');
        if (isUrl && !value.startsWith('http')) linkEl.href = 'https://' + value;
        else if (isUrl) linkEl.href = value;
        else if (isEmail) linkEl.href = 'mailto:' + value;
        else if (isPhone) linkEl.href = 'tel:' + value;
      } else {
        linkEl = document.createElement('span');
      }
      
      linkEl.textContent = key;

      linksDiv.appendChild(linkEl);

      if (index < keys.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'separator';
        sep.textContent = '|';
        linksDiv.appendChild(sep);
      }
    });

    header.appendChild(linksDiv);
  }

  return header;
}
