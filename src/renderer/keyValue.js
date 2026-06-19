/**
 * Renders a key-value section
 * @param {Array} entries 
 * @returns {DocumentFragment}
 */
export function renderKeyValue(entries) {
  const fragment = document.createDocumentFragment();

  entries.forEach(entryData => {
    Object.entries(entryData).forEach(([key, value]) => {
      const article = document.createElement('article');
      article.className = 'key-value-entry';

      const keyDiv = document.createElement('div');
      keyDiv.className = 'key-value-key';
      // Append colon to key if not present, to match screenshot "Languages:"
      keyDiv.textContent = key.endsWith(':') ? key : `${key}:`;

      const valDiv = document.createElement('div');
      valDiv.className = 'key-value-value';
      valDiv.textContent = value;

      article.appendChild(keyDiv);
      article.appendChild(valDiv);

      fragment.appendChild(article);
    });
  });

  return fragment;
}
