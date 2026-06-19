/**
 * Renders a timeline section containing multiple entries
 * @param {Array} entries 
 * @returns {DocumentFragment}
 */
export function renderTimeline(entries) {
  const fragment = document.createDocumentFragment();

  entries.forEach(entryData => {
    const article = document.createElement('article');
    article.className = 'timeline-entry';

    // First Row: Title (Left) and Location/Date (Right)
    const row1 = document.createElement('div');
    row1.className = 'timeline-row';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'entry-title';
    titleDiv.textContent = entryData.title || '';
    row1.appendChild(titleDiv);

    // Depending on if there's location, we put location on first row, else date
    // In screenshot: 
    // Education: ASU (Left), 2017-Sep 2022 (Right) => Title and Date on same line.
    // Experience: Intuit (Left), San Francisco, CA (Right) => Title and Location on same line.
    const right1 = document.createElement('div');
    if (entryData.location) {
      right1.className = 'entry-location';
      right1.textContent = entryData.location;
    } else if (entryData.date) {
      right1.className = 'entry-date';
      right1.textContent = entryData.date;
    }
    row1.appendChild(right1);
    article.appendChild(row1);

    // Second Row: Subtitle (Left) and Date (Right) if location was on row 1
    if (entryData.subtitle || (entryData.location && entryData.date)) {
      const row2 = document.createElement('div');
      row2.className = 'timeline-row';
      
      const subDiv = document.createElement('div');
      subDiv.className = 'entry-subtitle';
      
      // In Education, we might want bold. For now we output regular as requested, 
      // but let's check the title. We can make subtitle bold if type is Education? 
      // No, requirements say no section-title checks! 
      // We will render it as is.
      if (entryData.subtitle) {
          // If the title of the section is "Education", the subtitle is bold. Wait, we can't check that.
          // Let's just output it.
          subDiv.innerHTML = entryData.subtitle;
      }
      row2.appendChild(subDiv);

      const right2 = document.createElement('div');
      if (entryData.location && entryData.date) {
        right2.className = 'entry-date';
        right2.textContent = entryData.date;
      }
      row2.appendChild(right2);
      article.appendChild(row2);
    }

    // Details Object (key/value list rendered as bullets)
    if (entryData.details) {
      const detailsList = document.createElement('ul');
      detailsList.className = 'entry-details';

      Object.entries(entryData.details).forEach(([key, value]) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${key} ${value}`;
        li.appendChild(span);
        detailsList.appendChild(li);
      });

      article.appendChild(detailsList);
    }

    // Bullets Array
    if (entryData.bullets && Array.isArray(entryData.bullets)) {
      const bulletsList = document.createElement('ul');
      bulletsList.className = 'entry-bullets';

      entryData.bullets.forEach(bullet => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = bullet;
        li.appendChild(span);
        bulletsList.appendChild(li);
      });

      article.appendChild(bulletsList);
    }

    fragment.appendChild(article);
  });

  return fragment;
}
