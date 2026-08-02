const docs = {
  en: '../../../doc/chapter1/Chapter1_English.md',
  vi: '../../../doc/chapter1/Chapter1_Vietnamese.md',
  quiz: '../../../doc/chapter1/Chapter1_Quiz.md'
};

const contentArea = document.getElementById('content-area');
const buttons = document.querySelectorAll('[data-lang]');

function formatInline(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = [];
  let inList = false;
  let listType = '';

  const closeList = () => {
    if (inList) {
      html.push(listType === 'ol' ? '</ol>' : '</ul>');
      inList = false;
      listType = '';
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      return;
    }

    if (/^#{1,3}\s+/.test(trimmed)) {
      closeList();
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.replace(/^#{1,3}\s+/, '');
      html.push(`<h${level}>${formatInline(text)}</h${level}>`);
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList || listType !== 'ul') {
        closeList();
        html.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      html.push(`<li>${formatInline(trimmed.replace(/^[-*]\s+/, ''))}</li>`);
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      if (!inList || listType !== 'ol') {
        closeList();
        html.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      html.push(`<li>${formatInline(trimmed.replace(/^\d+\.\s+/, ''))}</li>`);
      return;
    }

    if (/^---$/.test(trimmed)) {
      closeList();
      html.push('<hr />');
      return;
    }

    closeList();
    html.push(`<p>${formatInline(trimmed)}</p>`);
  });

  closeList();
  return html.join('');
}

async function loadDoc(lang) {
  if (!docs[lang]) {
    return '<p>Content is not available for this option.</p>';
  }

  contentArea.innerHTML = '<p>Loading chapter content...</p>';

  try {
    const response = await fetch(docs[lang]);
    if (!response.ok) {
      throw new Error(`Unable to load content (${response.status})`);
    }
    const markdown = await response.text();
    contentArea.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    contentArea.innerHTML = `<p>Could not load the content. ${error.message}</p>`;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    loadDoc(button.dataset.lang);
  });
});

loadDoc('en');
