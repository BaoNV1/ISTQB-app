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
 * Create a quiz attempt history display
 * @param {array} attempts - Array of QuizAttempt objects
 * @returns {HTMLElement} Container div with quiz history
 */
function createQuizHistoryDisplay(attempts) {
    const container = document.createElement('div');
    container.className = 'quiz-history-container';
    container.id = 'quiz-history-display';
    
    if (!attempts || attempts.length === 0) {
        container.innerHTML = '<p class="no-attempts">No quiz attempts yet</p>';
        return container;
    }
    
    // Create header
    const header = document.createElement('div');
    header.className = 'quiz-history-header';
    header.innerHTML = `
        <div class="quiz-header-item">Quiz</div>
        <div class="quiz-header-item">Score</div>
        <div class="quiz-header-item">Attempt</div>
        <div class="quiz-header-item">Date</div>
    `;
    container.appendChild(header);
    
    // Group attempts by quiz for display
    const attemptsMap = {};
    for (let attempt of attempts) {
        if (!attemptsMap[attempt.quizId]) {
            attemptsMap[attempt.quizId] = [];
        }
        attemptsMap[attempt.quizId].push(attempt);
    }
    
    // Display each quiz's attempts
    for (let quizId in attemptsMap) {
        const quizAttempts = attemptsMap[quizId];
        
        for (let attempt of quizAttempts) {
            const row = document.createElement('div');
            row.className = 'quiz-attempt-row';
            
            const scoreClass = attempt.percentageScore >= 70 ? 'score-pass' : 'score-fail';
            const dateStr = formatAttemptDate(attempt.attemptedAt || attempt.completedAt);
            
            row.innerHTML = `
                <div class="quiz-item quiz-title">${quizId}</div>
                <div class="quiz-item ${scoreClass}">${attempt.percentageScore}%</div>
                <div class="quiz-item">#{attempt.attemptNumber}</div>
                <div class="quiz-item">${dateStr}</div>
            `;
            
            container.appendChild(row);
        }
    }
    
    return container;
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
