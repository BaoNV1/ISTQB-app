/**
 * Learning Progress Tracker - UI Components
 * 
 * Provides UI components for:
 * - Chapter progress display
 * - Quiz history display
 * - Statistics dashboard
 * - Mark complete button
 * - Data management UI
 */

/**
 * Create a progress indicator element for a chapter
 * @param {object} chapterProgress - ChapterProgress data
 * @param {string} chapterId - Chapter ID
 * @param {string} chapterTitle - Chapter title
 * @returns {HTMLElement} Progress indicator div
 */
function createChapterProgressIndicator(chapterProgress, chapterId, chapterTitle) {
    const div = document.createElement('div');
    div.className = 'chapter-progress-item';
    div.id = `chapter-progress-${chapterId}`;
    
    if (!chapterProgress) {
        div.innerHTML = `
            <div class="chapter-indicator">
                <span class="chapter-title">${chapterTitle || chapterId}</span>
                <span class="chapter-status">Not Started</span>
                <div class="status-badge not-started">○</div>
            </div>
        `;
    } else {
        const statusClass = chapterProgress.status;
        const statusText = chapterProgress.status === 'in-progress' ? 'In Progress' : 
                          chapterProgress.status === 'completed' ? 'Completed' : 'Started';
        const statusIcon = chapterProgress.status === 'completed' ? '✓' : 
                          chapterProgress.status === 'in-progress' ? '→' : '○';
        
        const timeSpent = formatDuration(chapterProgress.totalTimeSpent || 0);
        
        div.innerHTML = `
            <div class="chapter-indicator">
                <div class="chapter-info">
                    <span class="chapter-title">${chapterTitle || chapterId}</span>
                    <span class="chapter-meta">Views: ${chapterProgress.viewCount || 0} | Time: ${timeSpent}</span>
                </div>
                <span class="chapter-status">${statusText}</span>
                <div class="status-badge ${statusClass}">${statusIcon}</div>
            </div>
        `;
    }
    
    return div;
}

/**
 * Create "Mark Complete" button with confirmation dialog
 * @param {string} chapterId - Chapter ID
 * @param {Function} onConfirm - Callback when user confirms
 * @returns {HTMLElement} Button element
 */
function createMarkCompleteButton(chapterId, onConfirm) {
    const button = document.createElement('button');
    button.className = 'btn-mark-complete';
    button.id = `mark-complete-${chapterId}`;
    button.textContent = 'Mark as Complete';
    
    button.addEventListener('click', function() {
        // Show confirmation dialog
        const confirmed = showConfirmationDialog(
            'Mark Chapter Complete',
            'Are you sure you want to mark this chapter as complete?',
            function() {
                if (onConfirm) {
                    onConfirm(chapterId);
                }
                button.textContent = 'Marked Complete ✓';
                button.disabled = true;
            }
        );
    });
    
    return button;
}

/**
 * Show confirmation dialog
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {Function} onConfirm - Callback if user confirms
 * @returns {boolean} Whether confirmation was shown
 */
function showConfirmationDialog(title, message, onConfirm) {
    // Use browser confirm() for simplicity in MVP
    if (window.confirm(`${title}\n\n${message}`)) {
        if (onConfirm) onConfirm();
        return true;
    }
    return false;
}

/**
 * Create progress display component showing all chapters
 * @param {object} allProgress - Map of chapterId -> ChapterProgress
 * @param {object} chapterMap - Map of chapterId -> chapterTitle
 * @returns {HTMLElement} Container div with all chapter progress
 */
function createProgressDisplay(allProgress, chapterMap = {}) {
    const container = document.createElement('div');
    container.className = 'chapter-progress-container';
    container.id = 'chapter-progress-display';
    
    if (!allProgress || Object.keys(allProgress).length === 0) {
        container.innerHTML = '<p class="no-progress">No learning activity yet</p>';
        return container;
    }
    
    // Sort chapters by ID
    const chapterIds = Object.keys(allProgress).sort();
    
    for (let chapterId of chapterIds) {
        const progress = allProgress[chapterId];
        const title = chapterMap[chapterId] || `Chapter ${chapterId}`;
        const indicator = createChapterProgressIndicator(progress, chapterId, title);
        container.appendChild(indicator);
    }
    
    return container;
}

/**
 * Create resume-chapter link
 * @param {object} chapterProgress - ChapterProgress data
 * @param {string} chapterId - Chapter ID
 * @param {string} chapterTitle - Chapter title
 * @param {string} chapterUrl - URL to chapter page
 * @returns {HTMLElement} Link element
 */
function createResumeChapterLink(chapterProgress, chapterId, chapterTitle, chapterUrl) {
    const link = document.createElement('a');
    link.className = 'resume-chapter-link';
    link.href = chapterUrl || `/src/page/chapter${chapterId}/index.html`;
    
    if (chapterProgress && chapterProgress.status !== 'not-started') {
        link.innerHTML = `Resume: ${chapterTitle || chapterId}`;
        link.title = `Continue reading ${chapterTitle}`;
    } else {
        link.innerHTML = `Start: ${chapterTitle || chapterId}`;
        link.title = `Begin reading ${chapterTitle}`;
    }
    
    return link;
}

/**
 * Format duration in milliseconds to display string
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} Formatted duration
 */
function formatDuration(milliseconds) {
    if (!milliseconds || milliseconds < 0) return '0s';
    
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    } else if (minutes > 0) {
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        return `${seconds}s`;
    }
}


/**
 * Format attempt timestamp for display
 * @param {number} timestamp - Milliseconds since epoch
 * @returns {string} Human-readable date/time
 */
function formatAttemptDate(timestamp) {
    if (!timestamp) return 'Unknown';
    if (typeof formatTimestamp === 'function') {
        return formatTimestamp(timestamp);
    }
    try {
        const date = new Date(timestamp);
        if (Number.isNaN(date.getTime())) return 'Unknown';
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return 'Unknown';
    }
}

/**
 * Turn raw quizId (e.g. "chapter3-quiz2") into a readable label.
 * @param {string} quizId
 * @param {string} [fallbackTitle]
 * @returns {string}
 */
function formatQuizLabel(quizId, fallbackTitle) {
    if (fallbackTitle && typeof fallbackTitle === 'string' && fallbackTitle.trim()) {
        // Prefer stored title when it is already friendly
        if (!/^chapter\d+-quiz/i.test(fallbackTitle)) {
            return fallbackTitle.trim();
        }
    }
    if (!quizId || typeof quizId !== 'string') return 'Unknown quiz';

    const m = quizId.match(/^chapter(\d+)[-_]?(quiz)?(\d+)?$/i) ||
              quizId.match(/^chapter(\d+)[-_]quiz[-_]?(\d+)$/i);
    if (m) {
        const ch = m[1];
        const qn = m[3] || m[2] || '';
        return qn ? `Chapter ${ch} · Quiz ${qn}` : `Chapter ${ch} · Quiz`;
    }
    // Generic cleanup: chapter3-quiz3 → Chapter 3 · Quiz 3
    return quizId
        .replace(/[-_]+/g, ' ')
        .replace(/\bchapter\s*(\d+)/i, 'Chapter $1')
        .replace(/\bquiz\s*(\d+)/i, 'Quiz $1')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Create a quiz attempt history display (improved for easy tracking)
 * - Fixes attempt number interpolation bug
 * - Human-readable quiz names
 * - Grouped by quiz with summary (best / latest / attempts / trend)
 * - Attempts sorted newest first
 * @param {array} attempts - Array of QuizAttempt objects
 * @returns {HTMLElement} Container div with quiz history
 */
function createQuizHistoryDisplay(attempts) {
    const container = document.createElement('div');
    container.className = 'quiz-history-container';
    container.id = 'quiz-history-display';

    // Inject styles once
    if (!document.getElementById('quiz-history-styles')) {
        const style = document.createElement('style');
        style.id = 'quiz-history-styles';
        style.textContent = `
            .quiz-history-container { color: #e2e8f0; font-size: 0.95rem; }
            .qh-empty { color: #94a3b8; padding: 12px 0; }
            .qh-summary-bar {
                display: flex; flex-wrap: wrap; gap: 12px 20px;
                margin-bottom: 16px; padding: 12px 14px;
                background: rgba(30,41,59,0.7); border-radius: 12px;
                border: 1px solid rgba(148,163,184,0.15);
            }
            .qh-summary-bar span { color: #94a3b8; }
            .qh-summary-bar strong { color: #f1f5f9; margin-left: 4px; }
            .qh-quiz-card {
                margin-bottom: 14px; border-radius: 14px;
                background: rgba(15,23,42,0.75);
                border: 1px solid rgba(148,163,184,0.18);
                overflow: hidden;
            }
            .qh-quiz-head {
                display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px;
                padding: 12px 14px; cursor: pointer;
                background: rgba(30,41,59,0.55);
            }
            .qh-quiz-head:hover { background: rgba(30,41,59,0.85); }
            .qh-quiz-name { font-weight: 600; color: #f8fafc; flex: 1 1 160px; min-width: 140px; }
            .qh-badge {
                display: inline-flex; align-items: center; gap: 4px;
                padding: 3px 10px; border-radius: 999px; font-size: 0.8rem; font-weight: 600;
            }
            .qh-badge-pass { background: rgba(34,197,94,0.18); color: #86efac; }
            .qh-badge-fail { background: rgba(239,68,68,0.18); color: #fca5a5; }
            .qh-meta { color: #94a3b8; font-size: 0.85rem; }
            .qh-trend-up { color: #4ade80; }
            .qh-trend-down { color: #f87171; }
            .qh-trend-same { color: #94a3b8; }
            .qh-attempts { display: none; border-top: 1px solid rgba(148,163,184,0.12); }
            .qh-quiz-card.open .qh-attempts { display: block; }
            .qh-attempt-row {
                display: grid;
                grid-template-columns: 72px 64px 1fr 90px;
                gap: 8px; align-items: center;
                padding: 8px 14px; border-bottom: 1px solid rgba(148,163,184,0.08);
            }
            .qh-attempt-row:last-child { border-bottom: none; }
            .qh-attempt-row:hover { background: rgba(51,65,85,0.35); }
            .qh-score-pass { color: #4ade80; font-weight: 600; }
            .qh-score-fail { color: #f87171; font-weight: 600; }
            .qh-chevron { transition: transform 0.2s; color: #64748b; font-size: 0.75rem; }
            .qh-quiz-card.open .qh-chevron { transform: rotate(90deg); }
            @media (max-width: 560px) {
                .qh-attempt-row { grid-template-columns: 60px 56px 1fr; }
                .qh-attempt-row .qh-time { display: none; }
            }
        `;
        document.head.appendChild(style);
    }

    if (!attempts || attempts.length === 0) {
        container.innerHTML = '<p class="qh-empty">No quiz attempts yet. Complete a chapter quiz to see your history here.</p>';
        return container;
    }

    // Normalize + sort all attempts newest first
    const normalized = attempts
        .filter(a => a && a.quizId)
        .map(a => ({
            ...a,
            percentageScore: typeof a.percentageScore === 'number' ? a.percentageScore : 0,
            attemptNumber: a.attemptNumber || 1,
            ts: a.attemptedAt || a.completedAt || 0
        }))
        .sort((a, b) => b.ts - a.ts);

    // Group by quizId
    const byQuiz = {};
    for (const a of normalized) {
        if (!byQuiz[a.quizId]) byQuiz[a.quizId] = [];
        byQuiz[a.quizId].push(a);
    }

    // Overall summary
    const totalAttempts = normalized.length;
    const avgScore = Math.round(
        (normalized.reduce((s, a) => s + a.percentageScore, 0) / totalAttempts) * 10
    ) / 10;
    const passCount = normalized.filter(a => a.percentageScore >= 70).length;
    const uniqueQuizzes = Object.keys(byQuiz).length;

    const summary = document.createElement('div');
    summary.className = 'qh-summary-bar';
    summary.innerHTML = `
        <div><span>Quizzes practiced</span><strong>${uniqueQuizzes}</strong></div>
        <div><span>Total attempts</span><strong>${totalAttempts}</strong></div>
        <div><span>Average score</span><strong>${avgScore}%</strong></div>
        <div><span>Pass rate (≥70%)</span><strong>${Math.round((passCount / totalAttempts) * 100)}%</strong></div>
    `;
    container.appendChild(summary);

    // Sort quiz groups by most recent activity
    const quizIds = Object.keys(byQuiz).sort((a, b) => {
        const ta = byQuiz[a][0].ts;
        const tb = byQuiz[b][0].ts;
        return tb - ta;
    });

    for (const quizId of quizIds) {
        const list = byQuiz[quizId]; // already newest-first
        // Ensure attempt numbers are sensible (fallback by chronological order)
        const chronological = [...list].sort((a, b) => a.ts - b.ts);
        chronological.forEach((a, i) => {
            if (!a.attemptNumber || a.attemptNumber < 1) a.attemptNumber = i + 1;
        });

        const latest = list[0];
        const best = list.reduce((m, a) => (a.percentageScore > m.percentageScore ? a : m), list[0]);
        const first = chronological[0];
        const last = chronological[chronological.length - 1];

        let trendHtml = '<span class="qh-trend-same">—</span>';
        if (list.length >= 2) {
            const delta = last.percentageScore - first.percentageScore;
            if (delta > 0) trendHtml = `<span class="qh-trend-up">↑ +${delta}%</span>`;
            else if (delta < 0) trendHtml = `<span class="qh-trend-down">↓ ${delta}%</span>`;
            else trendHtml = '<span class="qh-trend-same">→ same</span>';
        }

        const label = formatQuizLabel(quizId, latest.quizTitle);
        const latestPass = latest.percentageScore >= 70;
        const bestPass = best.percentageScore >= 70;

        const card = document.createElement('div');
        card.className = 'qh-quiz-card';
        card.innerHTML = `
            <div class="qh-quiz-head" role="button" tabindex="0" aria-expanded="false">
                <span class="qh-chevron">▶</span>
                <span class="qh-quiz-name">${escapeHtmlUi(label)}</span>
                <span class="qh-badge ${latestPass ? 'qh-badge-pass' : 'qh-badge-fail'}">
                    Latest ${latest.percentageScore}%
                </span>
                <span class="qh-badge ${bestPass ? 'qh-badge-pass' : 'qh-badge-fail'}">
                    Best ${best.percentageScore}%
                </span>
                <span class="qh-meta">${list.length} attempt${list.length > 1 ? 's' : ''} · Trend ${trendHtml}</span>
            </div>
            <div class="qh-attempts">
                <div class="qh-attempt-row" style="font-size:0.8rem;color:#94a3b8;font-weight:600;">
                    <div>Attempt</div>
                    <div>Score</div>
                    <div>Date</div>
                    <div class="qh-time">Time</div>
                </div>
                ${list.map(a => {
                    const scoreClass = a.percentageScore >= 70 ? 'qh-score-pass' : 'qh-score-fail';
                    const dateStr = formatAttemptDate(a.ts);
                    const timeStr = (typeof a.timeTaken === 'number' && a.timeTaken > 0 && typeof formatDuration === 'function')
                        ? formatDuration(a.timeTaken)
                        : '—';
                    return `
                        <div class="qh-attempt-row">
                            <div>#${a.attemptNumber}</div>
                            <div class="${scoreClass}">${a.percentageScore}%</div>
                            <div>${dateStr}</div>
                            <div class="qh-time qh-meta">${timeStr}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        const head = card.querySelector('.qh-quiz-head');
        const toggle = () => {
            card.classList.toggle('open');
            head.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');
        };
        head.addEventListener('click', toggle);
        head.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });

        // Open the most recently practiced quiz by default
        if (quizId === quizIds[0]) {
            card.classList.add('open');
            head.setAttribute('aria-expanded', 'true');
        }

        container.appendChild(card);
    }

    return container;
}

/**
 * Minimal HTML escape for labels in quiz history UI
 */
function escapeHtmlUi(text) {
    if (text == null) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * Create statistics display component (T035)
 * @param {object} stats - Statistics object with metrics
 * @returns {HTMLElement} Statistics container div
 */
function createStatisticsDisplay(stats) {
    const container = document.createElement('div');
    container.className = 'statistics-container';
    container.id = 'statistics-display';
    
    if (!stats) {
        container.innerHTML = '<p>No statistics available yet</p>';
        return container;
    }
    
    const completionPercentage = stats.completionPercentage || 0;
    const timeSpent = formatDuration(stats.totalStudyTime || 0);
    
    container.innerHTML = `
        <div class="statistics-grid">
            <div class="stat-item">
                <span class="stat-label">Chapters Completed</span>
                <span class="stat-value">${stats.chaptersCompleted || 0}/${stats.totalChaptersViewed || 0}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${completionPercentage}%"></div>
                </div>
                <span class="stat-percentage">${completionPercentage}%</span>
            </div>
            
            <div class="stat-item">
                <span class="stat-label">Total Study Time</span>
                <span class="stat-value">${timeSpent}</span>
            </div>
            
            <div class="stat-item">
                <span class="stat-label">Average Quiz Score</span>
                <span class="stat-value">${stats.averageQuizScore || 0}%</span>
            </div>
            
            <div class="stat-item">
                <span class="stat-label">Quiz Attempts</span>
                <span class="stat-value">${stats.totalQuizAttempts || 0}</span>
            </div>
        </div>
    `;
    
    return container;
}

/**
 * Create data summary display for settings page (T044)
 * @param {object} summary - Data summary object
 * @param {object} storageUsage - Storage usage object
 * @returns {HTMLElement} Data summary container div
 */
function createDataSummaryDisplay(summary, storageUsage) {
    const container = document.createElement('div');
    container.className = 'data-summary-container';
    container.id = 'data-summary';
    
    if (!summary) {
        container.innerHTML = '<p>No data available</p>';
        return container;
    }
    
    const storagePercent = storageUsage?.percentage || 0;
    const storageUsedMB = (storageUsage?.used || 0) / 1024 / 1024;
    const storageQuotaMB = (storageUsage?.quota || 0) / 1024 / 1024;
    
    const summaryHTML = `
        <div class="summary-section">
            <div class="summary-item">
                <span class="summary-label">Device ID</span>
                <span class="summary-value">${summary.deviceId || 'Not set'}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Chapters Tracked</span>
                <span class="summary-value">${summary.chaptersTracked || 0}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Chapters Completed</span>
                <span class="summary-value">${summary.chaptersCompleted || 0}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Quiz Attempts Recorded</span>
                <span class="summary-value">${summary.quizAttempts || 0}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Total Study Time</span>
                <span class="summary-value">${formatDuration(summary.totalStudyTime || 0)}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">First Activity</span>
                <span class="summary-value">${new Date(summary.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Last Activity</span>
                <span class="summary-value">${new Date(summary.lastActivityAt).toLocaleDateString()}</span>
            </div>
        </div>
        
        <div class="storage-section">
            <h4>Storage Usage</h4>
            <div class="storage-info">
                <div class="storage-text">
                    ${storageUsedMB.toFixed(2)} MB / ${storageQuotaMB.toFixed(2)} MB
                </div>
                <div class="storage-bar-container">
                    <div class="storage-bar">
                        <div class="storage-bar-fill" style="width: ${storagePercent}%"></div>
                    </div>
                </div>
                <div class="storage-percentage">${storagePercent}% used</div>
            </div>
        </div>
    `;
    
    container.innerHTML = summaryHTML;
    
    // Add warning if storage is nearly full
    if (storagePercent >= 80) {
        const warning = document.createElement('div');
        warning.className = 'storage-warning';
        warning.innerHTML = '⚠️ Storage usage is approaching limit';
        container.appendChild(warning);
    }
    
    return container;
}


/**
 * Update an existing chapter progress indicator in the DOM
 * @param {string} chapterId
 * @param {object} chapterProgress
 * @param {string} chapterTitle
 */
function updateProgressIndicator(chapterId, chapterProgress, chapterTitle) {
    const existing = document.getElementById(`chapter-progress-${chapterId}`);
    if (!existing) {
        return createChapterProgressIndicator(chapterProgress, chapterId, chapterTitle);
    }
    const replacement = createChapterProgressIndicator(chapterProgress, chapterId, chapterTitle);
    existing.replaceWith(replacement);
    return replacement;
}

/**
 * Create weak topics display component
 * @param {array} weakTopics - Array of { quizId, quizTitle, averageScore, attempts, lastAttemptAt }
 * @returns {HTMLElement}
 */
function createWeakTopicsDisplay(weakTopics) {
    const container = document.createElement('div');
    container.className = 'weak-topics-container';
    container.id = 'weak-topics-display';

    if (!weakTopics || weakTopics.length === 0) {
        container.innerHTML = '<p class="no-weak-topics">No weak topics identified yet</p>';
        return container;
    }

    const list = document.createElement('div');
    list.className = 'weak-topics-list';

    for (const topic of weakTopics) {
        const row = document.createElement('div');
        row.className = 'weak-topic-row';
        const title = topic.quizTitle || topic.quizId || 'Unknown quiz';
        const avg = typeof topic.averageScore === 'number' ? topic.averageScore : 0;
        const attempts = topic.attempts || 0;
        const last = topic.lastAttemptAt ? formatAttemptDate(topic.lastAttemptAt) : '—';
        row.innerHTML = `
            <div class="weak-topic-title">${title}</div>
            <div class="weak-topic-avg">Avg: ${avg}%</div>
            <div class="weak-topic-attempts">Attempts: ${attempts}</div>
            <div class="weak-topic-last">Last: ${last}</div>
        `;
        list.appendChild(row);
    }

    container.appendChild(list);
    return container;
}

// Browser globals (pages load these as classic scripts)
if (typeof window !== 'undefined') {
    window.createChapterProgressIndicator = createChapterProgressIndicator;
    window.createMarkCompleteButton = createMarkCompleteButton;
    window.showConfirmationDialog = showConfirmationDialog;
    window.createProgressDisplay = createProgressDisplay;
    window.createResumeChapterLink = createResumeChapterLink;
    window.formatDuration = formatDuration;
    window.updateProgressIndicator = updateProgressIndicator;
    window.createQuizHistoryDisplay = createQuizHistoryDisplay;
    window.formatAttemptDate = formatAttemptDate;
    window.createStatisticsDisplay = createStatisticsDisplay;
    window.createWeakTopicsDisplay = createWeakTopicsDisplay;
    window.createDataSummaryDisplay = createDataSummaryDisplay;
}

// Export UI components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createChapterProgressIndicator,
        createMarkCompleteButton,
        showConfirmationDialog,
        createProgressDisplay,
        createResumeChapterLink,
        formatDuration,
        updateProgressIndicator,
        createQuizHistoryDisplay,
        formatAttemptDate,
        createStatisticsDisplay,
        createWeakTopicsDisplay,
        createDataSummaryDisplay
    };
}
