// Learning Progress Tracker Integration
function trackChapterView() {
  if (typeof trackChapterView_impl === 'function') {
    trackChapterView_impl('chapter5', 'Chapter 5: Test Management');
  }
}

const docs = {
  en: '../../../doc/chapter5/Chapter5_English.md',
  vi: '../../../doc/chapter5/Chapter5_Vietnamese.md',
  quiz1: '../../../doc/chapter5/Chapter5_Quiz.md',
  quiz2: '../../../doc/chapter5/Chapter5_Quiz_2.md',
  quiz3: '../../../doc/chapter5/Chapter5_Quiz_3.md',
  glossary: '../../../doc/chapter5/glossary_chapter5.md',
  glossaryVi: '../../../doc/chapter5/glossary_chapter5_vi.md',
  mindmap: '../../../doc/chapter5/mind_map_chapter5.md',
  mindmapVi: '../../../doc/chapter5/mind_map_chapter5_vi.md'
};

const contentArea = document.getElementById('content-area');
const buttons = document.querySelectorAll('[data-view]');
let currentLanguage = 'en';

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatInline(text) {
  return escapeHtml(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
}

function renderMarkdown(markdown) {
  const html = [];
  let listOpen = false;
  const closeList = () => { if (listOpen) { html.push('</ul>'); listOpen = false; } };

  markdown.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) { closeList(); return; }
    if (/^```/.test(line)) return;
    if (/^#{1,3}\s+/.test(line)) {
      closeList();
      const level = line.match(/^#+/)[0].length;
      html.push(`<h${level}>${formatInline(line.replace(/^#{1,3}\s+/, ''))}</h${level}>`);
      return;
    }
    if (/^[-*]\s+/.test(line)) {
      if (!listOpen) { html.push('<ul>'); listOpen = true; }
      html.push(`<li>${formatInline(line.replace(/^[-*]\s+/, ''))}</li>`);
      return;
    }
    if (/^---$/.test(line)) { closeList(); html.push('<hr />'); return; }
    closeList();
    html.push(`<p>${formatInline(line)}</p>`);
  });
  closeList();
  return html.join('');
}

function renderGlossary(markdown) {
  const rows = markdown.split(/\r?\n/).filter((line) => line.trim().startsWith('|')).slice(2);
  if (!rows.length) return '<p>No glossary entries were found.</p>';
  return `<div class="glossary-grid">${rows.map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim())).filter((row) => row.length >= 2).map(([term, meaning]) => `<article class="glossary-card"><div class="glossary-term">${escapeHtml(term)}</div><div class="glossary-meaning">${escapeHtml(meaning)}</div></article>`).join('')}</div>`;
}

function renderMindmap(markdown) {
  const sourceLines = markdown.split(/\r?\n/);
  const mindmapStart = sourceLines.findIndex((line) => line.trim() === 'mindmap');
  const mindmapEnd = mindmapStart >= 0
    ? sourceLines.findIndex((line, index) => index > mindmapStart && line.trim() === '```')
    : -1;
  const lines = (mindmapStart >= 0 ? sourceLines.slice(mindmapStart + 1, mindmapEnd >= 0 ? mindmapEnd : sourceLines.length) : sourceLines)
    .filter((line) => line.trim() && line.trim() !== 'mindmap');
  const root = { text: 'Mind Map', children: [] };
  const stack = [root];

  lines.forEach((line) => {
    const depth = Math.max(0, Math.floor(line.match(/^\s*/)[0].length / 2));
    const text = line.trim().replace(/^root\(\((.*)\)\)$/, '$1').replace(/^root\((.*)\)$/, '$1');
    const node = { text, children: [] };
    while (stack.length > depth + 1) stack.pop();
    if (depth === 0) {
      root.children.push(node);
      stack.length = 1;
      stack.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    }
  });

  const positions = [];
  let counter = 0;
  const walk = (node, depth, y, parentId = null) => {
    const id = `node-${counter++}`;
    const width = Math.min(220, 56 + node.text.length * 6.5);
    positions.push({ id, text: node.text, x: 36 + depth * 220, y, width, height: 58, parentId });
    let nextY = y + 88;
    node.children.forEach((child) => { nextY = walk(child, depth + 1, nextY, id); });
    return nextY;
  };

  walk(root.children[0] || root, 0, 24);
  const maxX = Math.max(...positions.map((position) => position.x + position.width), 560);
  const maxY = Math.max(...positions.map((position) => position.y + position.height), 200);
  const nodes = positions.map((position) => {
    const parent = positions.find((item) => item.id === position.parentId);
    const connector = parent ? `<line x1="${parent.x + parent.width / 2}" y1="${parent.y + parent.height}" x2="${position.x + position.width / 2}" y2="${position.y}" stroke="#34d399" stroke-width="2" stroke-dasharray="4 4" />` : '';
    return `${connector}<rect x="${position.x}" y="${position.y}" width="${position.width}" height="${position.height}" rx="12" fill="#111827" stroke="#34d399" stroke-width="1.5" /><text x="${position.x + position.width / 2}" y="${position.y + 34}" fill="#f8fafc" font-size="12" font-weight="600" text-anchor="middle">${escapeHtml(position.text)}</text>`;
  }).join('');

  return `<div style="margin:14px 0; padding:12px; border:1px solid #334155; border-radius:16px; background:#0f172a; overflow:auto"><svg viewBox="0 0 ${maxX + 40} ${maxY + 40}" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto">${nodes}</svg></div>`;
}

function parseQuiz(markdown) {
  const questions = [];
  let current;
  let mode;
  const push = () => { if (current) questions.push(current); };
  markdown.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;
    if (/^###\s+Question\s+\d+/.test(line)) {
      push(); current = { prompt: line.replace(/^###\s+Question\s+\d+/, '').trim(), choices: [], answer: '', explanation: '' }; mode = 'prompt';
    } else if (current && /^([A-D])\.\s+/.test(line)) {
      const match = line.match(/^([A-D])\.\s+(.*)$/); current.choices.push({ label: match[1], text: match[2] }); mode = 'choices';
    } else if (current && /^\*\*Answer:\*\*/i.test(line)) { current.answer = line.replace(/^\*\*Answer:\*\*/i, '').trim(); mode = 'answer';
    } else if (current && /^\*\*Explanation:\*\*/i.test(line)) { current.explanation = line.replace(/^\*\*Explanation:\*\*/i, '').trim(); mode = 'explanation';
    } else if (current && mode === 'explanation') current.explanation += ` ${line}`;
  });
  push();
  return questions;
}

function renderQuiz(questions) {
  return `<div class="quiz-shell"><div class="quiz-summary" id="quiz-summary">Select an answer for each question, then click Check Answers.</div>${questions.map((question, index) => `<article class="quiz-card"><strong>Question ${index + 1}. ${escapeHtml(question.prompt)}</strong><div class="quiz-options">${question.choices.map((choice) => `<label class="quiz-option"><input type="radio" name="quiz-${index}" value="${choice.label}" /><span>${choice.label}. ${escapeHtml(choice.text)}</span></label>`).join('')}</div><div class="quiz-feedback" id="quiz-feedback-${index}"></div><div class="quiz-explanation" id="quiz-explanation-${index}"></div></article>`).join('')}<div class="quiz-actions"><button type="button" id="quiz-check">Check Answers</button><button type="button" id="quiz-reset">Reset</button></div></div>`;
}

function bindQuiz(questions) {
  const summary = document.getElementById('quiz-summary');
  document.getElementById('quiz-check').addEventListener('click', () => {
    let score = 0;
    questions.forEach((question, index) => {
      const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);
      const correct = selected && selected.value === question.answer;
      if (correct) score += 1;
      document.getElementById(`quiz-feedback-${index}`).innerHTML = correct ? '<span class="quiz-correct">Correct!</span>' : `<span class="quiz-wrong">Incorrect. Answer: ${escapeHtml(question.answer)}</span>`;
      document.getElementById(`quiz-explanation-${index}`).textContent = question.explanation;
    });
    summary.textContent = `Score: ${score}/${questions.length}. Review the explanations below.`;
  });
  document.getElementById('quiz-reset').addEventListener('click', () => {
    document.querySelectorAll('input[type="radio"]').forEach((input) => { input.checked = false; });
    questions.forEach((_, index) => { document.getElementById(`quiz-feedback-${index}`).innerHTML = ''; document.getElementById(`quiz-explanation-${index}`).textContent = ''; });
    summary.textContent = 'Select an answer for each question, then click Check Answers.';
  });
}

async function loadDoc(view) {
  const path = view === 'glossary' ? (currentLanguage === 'vi' ? docs.glossaryVi : docs.glossary) : view === 'mindmap' ? (currentLanguage === 'vi' ? docs.mindmapVi : docs.mindmap) : docs[view];
  contentArea.innerHTML = '<p>Loading chapter content...</p>';
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load content (${response.status})`);
    const markdown = await response.text();
    if (view.startsWith('quiz')) { const questions = parseQuiz(markdown); contentArea.innerHTML = renderQuiz(questions); bindQuiz(questions); }
    else if (view === 'glossary') contentArea.innerHTML = renderGlossary(markdown);
    else if (view === 'mindmap') contentArea.innerHTML = renderMindmap(markdown);
    else contentArea.innerHTML = renderMarkdown(markdown);
  } catch (error) { contentArea.innerHTML = `<div class="notice">Could not load this chapter view. ${escapeHtml(error.message)}</div>`; }
}

buttons.forEach((button) => button.addEventListener('click', () => {
  buttons.forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  if (button.dataset.view === 'en' || button.dataset.view === 'vi') currentLanguage = button.dataset.view;
  loadDoc(button.dataset.view === 'en' || button.dataset.view === 'vi' ? currentLanguage : button.dataset.view);
}));

loadDoc('en');