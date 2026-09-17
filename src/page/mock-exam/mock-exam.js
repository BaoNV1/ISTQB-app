/**
 * Mock Exam Practice Page
 * Loads original practice exams from doc/Mock_Exam/ and runs interactive quizzes.
 * Tracks attempts via the learning progress tracker.
 */

const EXAMS = [
  {
    id: 'full-40',
    title: 'Full Practice Exam A (40 questions)',
    description: 'Complete mock exam covering CTFL fundamentals through tools. Timed practice recommended.',
    path: '../../../doc/Mock_Exam/Practice_Exam_Full_40.md',
    questionsHint: '40 questions',
    timeMinutes: 60,
    passPercent: 65,
    quizId: 'mock-full-40',
  },
  {
    id: 'full-40-b',
    title: 'Full Practice Exam B (40 questions)',
    description: 'Second original full mock exam — different questions on the same CTFL topics. Use for extra timed practice.',
    path: '../../../doc/Mock_Exam/Practice_Exam_Full_40_B.md',
    questionsHint: '40 questions',
    timeMinutes: 60,
    passPercent: 65,
    quizId: 'mock-full-40-b',
  },
  {
    id: 'focus-fundamentals',
    title: 'Focus Set 1 – Fundamentals & Principles',
    description: '10 questions on testing objectives, principles, verification/validation, and context.',
    path: '../../../doc/Mock_Exam/Practice_Exam_Chapter_Focus.md',
    section: 'Set 1',
    questionsHint: '10 questions',
    timeMinutes: 15,
    passPercent: 65,
    quizId: 'mock-focus-1',
  },
  {
    id: 'focus-techniques',
    title: 'Focus Set 2 – Test Techniques',
    description: '10 questions on EP, BVA, decision tables, state transitions, coverage, and exploratory testing.',
    path: '../../../doc/Mock_Exam/Practice_Exam_Chapter_Focus.md',
    section: 'Set 2',
    questionsHint: '10 questions',
    timeMinutes: 15,
    passPercent: 65,
    quizId: 'mock-focus-2',
  },
  {
    id: 'focus-management',
    title: 'Focus Set 3 – Test Management & Tools',
    description: '10 questions on strategy, risk, traceability, CM, automation benefits/risks, and metrics.',
    path: '../../../doc/Mock_Exam/Practice_Exam_Chapter_Focus.md',
    section: 'Set 3',
    questionsHint: '10 questions',
    timeMinutes: 15,
    passPercent: 65,
    quizId: 'mock-focus-3',
  },
  {
    id: 'chapters-1-5',
    title: 'Chapters 1–5 Mixed Practice',
    description: 'Existing mixed practice set from the project (Chapters 1–5 focus).',
    path: '../../../doc/Mock_Exam/Chapter1_to_5_Exam_Practice.md',
    questionsHint: 'Mixed set',
    timeMinutes: 45,
    passPercent: 65,
    quizId: 'mock-ch1-5',
  },
];

let currentExam = null;
let currentQuestions = [];
let quizStartTime = 0;
let timerInterval = null;
let timerRemainingSec = 0;

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Parse quiz markdown supporting:
 * - ### Question N
 * - **N.** / **1.** style
 * - A. / B. choices
 * - **Answer:** and **Explanation:**
 */
function parseQuizMarkdown(markdown, sectionFilter) {
  let text = markdown;
  if (sectionFilter) {
    // Extract a section like "## Set 1 – ..." until next ## Set or end
    const re = new RegExp(
      '##\\s*' + sectionFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s*Set\\s|\\n##\\s*Quick|$)',
      'i'
    );
    const m = text.match(re);
    if (m) text = m[1];
  }

  const lines = text.split(/\r?\n/);
  const questions = [];
  let current = null;
  let mode = null;

  const push = () => {
    if (current && (current.choices.length || current.prompt)) {
      questions.push(current);
    }
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line || line === '---') return;

    // ### Question N  OR  ### Question N.
    let qm = line.match(/^###\s+Question\s+(\d+)\s*[.:]?\s*(.*)$/i);
    if (qm) {
      push();
      current = {
        prompt: (qm[2] || '').trim(),
        choices: [],
        answer: '',
        explanation: '',
      };
      mode = current.prompt ? 'choices' : 'prompt';
      return;
    }

    // **N.** Question text  (older mock format)
    qm = line.match(/^\*\*(\d+)\.\*\*\s+(.*)$/);
    if (qm) {
      push();
      current = {
        prompt: qm[2].trim(),
        choices: [],
        answer: '',
        explanation: '',
      };
      mode = 'choices';
      return;
    }

    // A. choice / B. choice
    const cm = line.match(/^([A-E])\.\s+(.*)$/);
    if (cm && current) {
      current.choices.push({ label: cm[1], text: cm[2] });
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

    // Continuation lines
    if (current) {
      if (mode === 'prompt') {
        current.prompt = (current.prompt + ' ' + line).trim();
      } else if (mode === 'explanation') {
        current.explanation = (current.explanation + ' ' + line).trim();
      } else if (mode === 'answer' && !current.answer) {
        current.answer = line;
      }
    }
  });

  push();
  return questions.filter((q) => q.choices.length >= 2);
}

function renderExamPicker() {
  const grid = document.getElementById('exam-grid');
  if (!grid) return;
  grid.innerHTML = EXAMS.map(
    (ex) => `
    <article class="exam-card" data-exam-id="${ex.id}" role="button" tabindex="0">
      <h3>${escapeHtml(ex.title)}</h3>
      <p>${escapeHtml(ex.description)}</p>
      <div class="exam-meta">
        <span>${escapeHtml(ex.questionsHint)}</span>
        <span>~${ex.timeMinutes} min</span>
        <span>Pass ≥ ${ex.passPercent}%</span>
      </div>
    </article>
  `
  ).join('');

  grid.querySelectorAll('.exam-card').forEach((card) => {
    const start = () => {
      const id = card.getAttribute('data-exam-id');
      const exam = EXAMS.find((e) => e.id === id);
      if (exam) loadExam(exam);
    };
    card.addEventListener('click', start);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        start();
      }
    });
  });
}

async function loadExam(exam) {
  currentExam = exam;
  const picker = document.getElementById('exam-picker');
  const area = document.getElementById('quiz-area');
  const content = document.getElementById('content-area');
  const title = document.getElementById('quiz-title');
  const subtitle = document.getElementById('quiz-subtitle');

  if (picker) picker.classList.add('hidden');
  if (area) area.classList.add('visible');
  if (title) title.textContent = exam.title;
  if (subtitle) {
    subtitle.textContent = `${exam.questionsHint} · Suggested time ${exam.timeMinutes} min · Pass ≥ ${exam.passPercent}%`;
  }
  if (content) content.innerHTML = '<p style="color:#94a3b8">Loading exam questions…</p>';

  try {
    const res = await fetch(exam.path);
    if (!res.ok) throw new Error('Failed to load ' + exam.path);
    const md = await res.text();
    currentQuestions = parseQuizMarkdown(md, exam.section || null);

    if (!currentQuestions.length) {
      content.innerHTML =
        '<p style="color:#f87171">No questions could be parsed from this file. Check the markdown format.</p>';
      return;
    }

    content.innerHTML = renderQuizHtml(currentQuestions);
    bindQuizEvents(currentQuestions);
    startTimer(exam.timeMinutes);
    quizStartTime = Date.now();

    // Track chapter-style view for "mock exam" activity
    if (typeof trackChapterView_impl === 'function') {
      trackChapterView_impl('mock-exam', 'Mock Exam Practice');
    } else if (typeof trackChapterView === 'function') {
      trackChapterView('mock-exam', 'Mock Exam Practice');
    }
  } catch (err) {
    console.error(err);
    content.innerHTML = `<p style="color:#f87171">Could not load exam: ${escapeHtml(err.message)}. Serve the app via a local web server (e.g. python -m http.server).</p>`;
  }
}

function renderQuizHtml(questions) {
  return `
    <div class="quiz-shell">
      <div class="quiz-summary" id="quiz-summary">
        Select an answer for each question, then click <strong>Check Answers</strong>.
        Suggested time is a guide — finish at your own pace if needed.
      </div>
      ${questions
        .map(
          (q, index) => `
        <div class="quiz-card-q" data-question-index="${index}">
          <div class="quiz-prompt"><strong>Question ${index + 1}.</strong> ${escapeHtml(q.prompt)}</div>
          <div class="quiz-options">
            ${q.choices
              .map(
                (c) => `
              <label class="quiz-option">
                <input type="radio" name="quiz-${index}" value="${c.label}" />
                <span><strong>${c.label}.</strong> ${escapeHtml(c.text)}</span>
              </label>
            `
              )
              .join('')}
          </div>
          <div class="quiz-feedback" id="quiz-feedback-${index}"></div>
          <div class="quiz-explanation" id="quiz-explanation-${index}"></div>
        </div>
      `
        )
        .join('')}
      <div class="quiz-actions">
        <button type="button" class="btn btn-primary" id="quiz-check-button">Check Answers</button>
        <button type="button" class="btn btn-secondary" id="quiz-reset-button">Reset</button>
      </div>
    </div>
  `;
}

function bindQuizEvents(questions) {
  const summary = document.getElementById('quiz-summary');
  const checkBtn = document.getElementById('quiz-check-button');
  const resetBtn = document.getElementById('quiz-reset-button');
  if (!checkBtn || !resetBtn) return;

  checkBtn.addEventListener('click', () => {
    let score = 0;
    let answered = 0;

    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);
      const feedback = document.getElementById(`quiz-feedback-${index}`);
      const explanation = document.getElementById(`quiz-explanation-${index}`);
      const correctLabel = (q.answer || '').trim().toUpperCase().charAt(0);
      const isCorrect = selected && selected.value.toUpperCase() === correctLabel;

      if (selected) answered += 1;
      if (isCorrect) score += 1;

      if (feedback) {
        feedback.innerHTML = isCorrect
          ? `<span class="quiz-correct">Correct!</span>`
          : `<span class="quiz-wrong">Incorrect.</span> <span class="quiz-correct-answer">Answer: ${escapeHtml(
              correctLabel || q.answer
            )}</span>`;
      }
      if (explanation && q.explanation) {
        explanation.innerHTML = `<div class="quiz-explanation-label">Explanation</div><div>${escapeHtml(
          q.explanation
        )}</div>`;
      }
    });

    const total = questions.length || 1;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= (currentExam?.passPercent || 65);
    const timeTakenMs = Math.max(0, Date.now() - quizStartTime);

    if (summary) {
      summary.innerHTML = `
        <div class="score-banner ${passed ? 'score-pass' : 'score-fail'}">
          Score: ${score}/${questions.length} (${percentage}%)
          ${passed ? '— Pass' : '— Below pass mark (' + (currentExam?.passPercent || 65) + '%)'}
        </div>
        <div style="margin-top:8px;color:#94a3b8;font-size:0.9rem;">
          ${answered < questions.length ? 'Some questions were left blank. ' : ''}
          Review explanations below. Time used: ${formatTimeUsed(timeTakenMs)}.
        </div>
      `;
    }

    // Persist attempt
    const quizId = currentExam?.quizId || 'mock-exam';
    const quizTitle = currentExam?.title || 'Mock Exam';
    if (typeof trackQuizAttempt_impl === 'function') {
      trackQuizAttempt_impl(quizId, quizTitle, score, percentage, timeTakenMs);
    } else if (typeof trackQuizAttempt === 'function') {
      trackQuizAttempt(quizId, quizTitle, score, percentage, timeTakenMs);
    }

    stopTimer();
    checkBtn.disabled = true;
  });

  resetBtn.addEventListener('click', () => {
    questions.forEach((_, index) => {
      document.querySelectorAll(`input[name="quiz-${index}"]`).forEach((el) => {
        el.checked = false;
      });
      const feedback = document.getElementById(`quiz-feedback-${index}`);
      const explanation = document.getElementById(`quiz-explanation-${index}`);
      if (feedback) feedback.innerHTML = '';
      if (explanation) explanation.innerHTML = '';
    });
    if (summary) {
      summary.innerHTML =
        'Select an answer for each question, then click <strong>Check Answers</strong>.';
    }
    checkBtn.disabled = false;
    quizStartTime = Date.now();
    if (currentExam) startTimer(currentExam.timeMinutes);
  });
}

function formatTimeUsed(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const rs = s % 60;
  if (m <= 0) return `${rs}s`;
  return `${m}m ${rs}s`;
}

function startTimer(minutes) {
  stopTimer();
  timerRemainingSec = Math.max(1, (minutes || 60) * 60);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerRemainingSec -= 1;
    updateTimerDisplay();
    if (timerRemainingSec <= 0) {
      stopTimer();
      const summary = document.getElementById('quiz-summary');
      if (summary && !summary.querySelector('.score-banner')) {
        summary.innerHTML +=
          '<div style="margin-top:8px;color:#fbbf24;">Suggested time is up — you can still finish and check answers.</div>';
      }
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const el = document.getElementById('exam-timer');
  if (!el) return;
  const m = Math.floor(Math.max(0, timerRemainingSec) / 60);
  const s = Math.max(0, timerRemainingSec) % 60;
  el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  el.classList.remove('warn', 'danger');
  if (timerRemainingSec <= 300 && timerRemainingSec > 60) el.classList.add('warn');
  if (timerRemainingSec <= 60) el.classList.add('danger');
}

function backToPicker() {
  stopTimer();
  currentExam = null;
  currentQuestions = [];
  const picker = document.getElementById('exam-picker');
  const area = document.getElementById('quiz-area');
  if (picker) picker.classList.remove('hidden');
  if (area) area.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', () => {
  renderExamPicker();
  const backBtn = document.getElementById('btn-back-picker');
  if (backBtn) backBtn.addEventListener('click', backToPicker);
});
