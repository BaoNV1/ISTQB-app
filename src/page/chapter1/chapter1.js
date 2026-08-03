const docs = {
  en: '../../../doc/chapter1/Chapter1_English.md',
  vi: '../../../doc/chapter1/Chapter1_Vietnamese.md',
  quiz: '../../../doc/chapter1/Chapter1_Quiz.md',
  glossary: '../../../doc/chapter1/glossary_chapter1.md',
  mindmap: '../../../doc/chapter1/mind_map_chapter1_vi.md'
};

const contentArea = document.getElementById('content-area');
const buttons = document.querySelectorAll('[data-view]');

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;');
}

function renderMindmap(code) {
  const lines = code.split(/\r?\n/).filter((line) => line.trim() && line.trim() !== 'mindmap');
  const root = { text: 'Mind Map', children: [] };
  const stack = [root];

  lines.forEach((line) => {
    const indent = line.match(/^\s*/)[0].length;
    const depth = Math.max(0, Math.floor(indent / 2));
    const text = line.trim().replace(/^root\(\((.*)\)\)$/, '$1').replace(/^root\((.*)\)$/, '$1');
    const node = { text, children: [] };

    while (stack.length > depth + 1) {
      stack.pop();
    }

    if (depth === 0) {
      root.text = text;
      root.children = [];
      stack.length = 1;
      stack[0] = root;
      root.children.push(node);
      stack.push(node);
      return;
    }

    stack[stack.length - 1].children.push(node);
    stack.push(node);
  });

  const positions = [];
  let counter = 0;
  const walk = (node, depth, y, parentId = null) => {
    const width = Math.min(220, 44 + node.text.length * 7);
    const id = `node-${counter++}`;
    positions.push({ id, text: node.text, x: 44 + depth * 220, y, width, height: 60, parentId });
    let nextY = y + 92;
    node.children.forEach((child) => {
      nextY = walk(child, depth + 1, nextY, id);
    });
    return nextY;
  };

  const treeRoot = root.children[0] || root;
  walk(treeRoot, 0, 30);

  const maxX = Math.max(...positions.map((pos) => pos.x + pos.width), 600);
  const maxY = Math.max(...positions.map((pos) => pos.y + pos.height), 220);

  return `<div style="margin:14px 0; padding:12px; border:1px solid #334155; border-radius:16px; background:#0f172a; overflow:auto;"><svg viewBox="0 0 ${maxX + 40} ${maxY + 40}" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto;">
    ${positions.map((pos) => {
      const parent = positions.find((item) => item.id === pos.parentId);
      const connector = parent ? `<line x1="${parent.x + parent.width / 2}" y1="${parent.y + parent.height}" x2="${pos.x + pos.width / 2}" y2="${pos.y}" stroke="#34d399" stroke-width="2" stroke-dasharray="4 4"></line>` : '';
      return `${connector}<rect x="${pos.x}" y="${pos.y}" width="${pos.width}" height="${pos.height}" rx="14" fill="#111827" stroke="#34d399" stroke-width="1.5"></rect><text x="${pos.x + pos.width / 2}" y="${pos.y + 24}" fill="#f8fafc" font-size="13" font-weight="600" text-anchor="middle">${escapeHtml(pos.text)}</text>`;
    }).join('')}
  </svg></div>`;
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

  const formatInline = (text) => {
    return escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  };

  const renderTable = (rows) => {
    const header = rows[0].split('|').map((cell) => cell.trim()).filter(Boolean);
    const bodyRows = rows.slice(2).map((row) => row.split('|').map((cell) => cell.trim()).filter(Boolean));
    return `<table style="width:100%; border-collapse:collapse; margin:12px 0;"><thead><tr>${header.map((cell) => `<th style="text-align:left; padding:8px; border:1px solid #334155; background:#0f172a;">${formatInline(cell)}</th>`).join('')}</tr></thead><tbody>${bodyRows.map((row) => `<tr>${row.map((cell) => `<td style="padding:8px; border:1px solid #334155; vertical-align:top;">${formatInline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      continue;
    }
    if (/^```mermaid\s*$/.test(trimmed)) {
      closeList();
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```$/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i++;
      }
      const code = codeLines.join('\n');
      html.push(code.includes('mindmap') ? renderMindmap(code) : `<pre style="margin:12px 0; padding:12px; border:1px solid #334155; border-radius:12px; background:#0f172a; white-space:pre-wrap;">${escapeHtml(code)}</pre>`);
      continue;
    }
    if (/^\|/.test(trimmed)) {
      const tableLines = [];
      while (i < lines.length && /^\|/.test(lines[i].trim())) {
        tableLines.push(lines[i].trim());
        i++;
      }
      i--;
      html.push(renderTable(tableLines));
      continue;
    }
    if (/^#{1,3}\s+/.test(trimmed)) {
      closeList();
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.replace(/^#{1,3}\s+/, '');
      html.push(`<h${level}>${formatInline(text)}</h${level}>`);
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList || listType !== 'ul') { closeList(); html.push('<ul>'); inList = true; listType = 'ul'; }
      html.push(`<li>${formatInline(trimmed.replace(/^[-*]\s+/, ''))}</li>`);
      continue;
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      if (!inList || listType !== 'ol') { closeList(); html.push('<ol>'); inList = true; listType = 'ol'; }
      html.push(`<li>${formatInline(trimmed.replace(/^\d+\.\s+/, ''))}</li>`);
      continue;
    }
    if (/^---$/.test(trimmed)) {
      closeList();
      html.push('<hr />');
      continue;
    }
    closeList();
    html.push(`<p>${formatInline(trimmed)}</p>`);
  }

  closeList();
  return html.join('');
}

async function loadDoc(view) {
  const path = docs[view];
  if (!path) {
    contentArea.innerHTML = '<p>Content is not available for this option.</p>';
    return;
  }

  contentArea.innerHTML = '<p>Loading chapter content...</p>';
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load content (${response.status})`);
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
    loadDoc(button.dataset.view);
  });
});

loadDoc('en');
