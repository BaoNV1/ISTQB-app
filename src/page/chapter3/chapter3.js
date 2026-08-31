const docs = {
  en: '../../../doc/chapter3/Chapter3_English.md',
  vi: '../../../doc/chapter3/Chapter3_Vietnamese.md',
  quiz1: '../../../doc/chapter3/Chapter3_Quiz.md',
  quiz2: '../../../doc/chapter3/Chapter3_Quiz_2.md',
  quiz3: '../../../doc/chapter3/Chapter3_Quiz_3.md',
  glossary: '../../../doc/chapter3/glossary_chapter3.md',
  glossaryVi: '../../../doc/chapter3/glossary_chapter3_vi.md',
  mindmap: '../../../doc/chapter3/mind_map_chapter3.md',
  mindmapVi: '../../../doc/chapter3/mind_map_chapter3_vi.md'
};

const contentArea = document.getElementById('content-area');
const buttons = document.querySelectorAll('[data-view]');
let currentLanguage = 'en';

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

function renderGlossary(markdown) {
  const lines = markdown.split(/\r?\n/).filter((line) => line.trim());
  const title = lines.find((line) => line.startsWith('# '))?.replace(/^#\s+/, '') || 'Glossary';
  const tableLines = lines.filter((line) => line.startsWith('|'));

  if (tableLines.length < 2) {
    return `<div class="glossary-shell"><h2>${escapeHtml(title)}</h2><p>No glossary entries available yet.</p></div>`;
  }

  const rows = tableLines.slice(1).map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));
  const entries = rows.filter((row) => row.length >= 2 && !row.every((cell) => /^-+:*$/.test(cell)));
  const cards = entries.map(([term, meaning]) => `
    <article class="glossary-card">
      <div class="glossary-term">${escapeHtml(term)}</div>
      <div class="glossary-meaning">${escapeHtml(meaning)}</div>
    </article>
  `).join('');

  return `<div class="glossary-shell">
    <div class="glossary-intro">${escapeHtml(title)} — review the key terms in a compact visual card layout.</div>
    <div class="glossary-grid">${cards}</div>
  </div>`;
}

function parseQuiz(markdown) {
  const lines = markdown.split(/\r?\n/);
  const questions = [];
  let current = null;
  let mode = null;

  const pushCurrent = () => {
    if (current) {
      questions.push(current);
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      return;
    }
    const questionMatch = line.match(/^###\s+Question\s+\d+/);
    if (questionMatch) {
      pushCurrent();
      current = { prompt: line.replace(/^###\s+Question\s+\d+/, '').trim() || '', choices: [], answer: '', explanation: '' };
      mode = 'prompt';
      return;
    }
    const choiceMatch = line.match(/^([A-D])\.\s+(.*)$/);
    if (choiceMatch && current) {
      current.choices.push({ label: choiceMatch[1], text: choiceMatch[2] });
      mode = 'choices';
      return;
    }
    if (/^\*\*Answer:\*\*/i.test(line) && current) {
      current.answer = line.replace(/^\*\*Answer:\*\*/i, '').trim();
      mode = 'answer';
      return;
    }
    if (/^\*\*Explanation:\*\*/i.test(line) && current) {
      current.explanation = line.replace(/^\*\*Explanation:\*\*/i, '').trim();
      mode = 'explanation';
      return;
    }
    if (/^---$/.test(line)) {
      return;
    }
    if (current) {
      if (mode === 'prompt') {
        current.prompt += ' ' + line;
      } else if (mode === 'explanation') {
        current.explanation += ' ' + line;
      }
    }
  });

  pushCurrent();
  return questions;
}

function renderQuiz(markdown) {
  const questions = parseQuiz(markdown);
  if (!questions.length) {
    return '<p>No quiz questions were found.</p>';
  }

  return `<div class="quiz-shell"><div class="quiz-summary" id="quiz-summary">Select an answer for each question, then click Check Answers.</div>${questions.map((q, index) => `
    <div class="quiz-card" data-question-index="${index}">
      <div class="quiz-prompt"><strong>Question ${index + 1}.</strong> ${escapeHtml(q.prompt)}</div>
      <div class="quiz-options">
        ${q.choices.map((choice) => `
          <label class="quiz-option" data-answer="${choice.label}">
            <input type="radio" name="quiz-${index}" value="${choice.label}" />
            <span class="quiz-option-label">${choice.label}.</span>
            <span>${escapeHtml(choice.text)}</span>
          </label>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback-${index}" aria-live="polite"></div>
      <div class="quiz-explanation" id="quiz-explanation-${index}"></div>
    </div>
  `).join('')}
  <div class="quiz-actions">
    <button type="button" id="quiz-check-button">Check Answers</button>
    <button type="button" id="quiz-reset-button">Reset</button>
  </div>
  </div>`;
}

function bindQuizEvents(questions) {
  const summary = document.getElementById('quiz-summary');
  const checkButton = document.getElementById('quiz-check-button');
  const resetButton = document.getElementById('quiz-reset-button');

  if (!checkButton || !resetButton) {
    return;
  }

  checkButton.addEventListener('click', () => {
    let score = 0;
    let answered = 0;

    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);
      const feedback = document.getElementById(`quiz-feedback-${index}`);
      const explanation = document.getElementById(`quiz-explanation-${index}`);
      const correctLabel = q.answer.trim();
      const isCorrect = selected && selected.value === correctLabel;

      if (selected) answered += 1;
      if (isCorrect) score += 1;

      if (feedback) {
        feedback.innerHTML = isCorrect ? `<span class="quiz-correct">Correct!</span>` : `<span class="quiz-wrong">Incorrect.</span> <span class="quiz-correct-answer">Answer: ${escapeHtml(correctLabel)}</span>`;
      }
      if (explanation) {
        explanation.innerHTML = `<div class="quiz-explanation-label">Explanation:</div><div>${escapeHtml(q.explanation)}</div>`;
      }
    });

    summary.innerHTML = `Score: ${score}/${questions.length} — ${answered < questions.length ? 'Please answer all questions to finalize your results.' : 'Review each explanation below.'}`;
  });

  resetButton.addEventListener('click', () => {
    questions.forEach((_, index) => {
      const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);
      if (selected) selected.checked = false;
      const feedback = document.getElementById(`quiz-feedback-${index}`);
      const explanation = document.getElementById(`quiz-explanation-${index}`);
      if (feedback) feedback.innerHTML = '';
      if (explanation) explanation.innerHTML = '';
    });
    summary.innerHTML = 'Select an answer for each question, then click Check Answers.';
  });
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
  const path = view === 'glossary'
    ? (currentLanguage === 'vi' ? docs.glossaryVi : docs.glossary)
    : view === 'mindmap'
    ? (currentLanguage === 'vi' ? docs.mindmapVi : docs.mindmap)
    : docs[view];
  if (!path) {
    contentArea.innerHTML = '<p>Content is not available for this option.</p>';
    return;
  }

  contentArea.innerHTML = '<p>Loading chapter content...</p>';
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load content (${response.status})`);
    const markdown = await response.text();
    if (view.startsWith('quiz')) {
      contentArea.innerHTML = renderQuiz(markdown);
      bindQuizEvents(parseQuiz(markdown));
    } else if (view === 'glossary') {
      contentArea.innerHTML = renderGlossary(markdown);
    } else {
      contentArea.innerHTML = renderMarkdown(markdown);
    }
  } catch (error) {
    contentArea.innerHTML = `<p>Could not load the content. ${escapeHtml(error.message)}</p>`;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    if (button.dataset.view === 'en') {
      currentLanguage = 'en';
    } else if (button.dataset.view === 'vi') {
      currentLanguage = 'vi';
    }

    loadDoc(button.dataset.view);
  });
});

loadDoc('en');
