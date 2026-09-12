/**
 * Learning Progress Tracker - Storage Module
 * 
 * Provides abstraction layer for browser localStorage operations
 * Includes error handling, quota checking, and graceful degradation
 */

/**
 * Namespace prefix for all tracker data in localStorage
 */
const TRACKER_PREFIX = 'tracker:';

/**
 * Session storage mode flag (used when localStorage unavailable)
 */
let SESSION_ONLY_MODE = false;
let sessionCache = {};

/**
 * Active learning session state (in-memory, tracks current page view)
 * Used to accumulate real study time while the user is actively viewing a chapter.
 */
let currentActiveSession = null; // { chapterId, startTime, lastActivityTime, accumulatedMs, isIdle }
const IDLE_THRESHOLD_MS = 2 * 60 * 1000; // 2 minutes of inactivity pauses time
const HEARTBEAT_INTERVAL_MS = 15 * 1000; // flush progress every 15s
let heartbeatTimer = null;
let activityListenersAttached = false;

/**
 * Initialize storage system and device ID
 * Must be called once on app startup
 */
function initializeStorage() {
    // Check localStorage availability
    if (!isLocalStorageAvailable()) {
        SESSION_ONLY_MODE = true;
        console.warn('localStorage unavailable - operating in session-only mode');
        return false;
    }
    
    // Initialize device ID if not present
    if (!getDeviceId()) {
        const deviceId = generateUUID();
        try {
            localStorage.setItem(`${TRACKER_PREFIX}device-id`, deviceId);
        } catch (error) {
            console.error('Failed to initialize device ID:', error);
            return false;
        }
    }
    
    // Initialize UserProfile if not present
    initializeUserProfile();
    
    return true;
}

/**
 * Initialize UserProfile singleton on first app load
 */
function initializeUserProfile() {
    const existing = storageGet('profile');
    
    if (!existing) {
        // Import UserProfile if available, otherwise create inline
        let userProfile;
        
        if (typeof UserProfile !== 'undefined') {
            userProfile = new UserProfile(getDeviceId());
        } else {
            // Fallback if models.js not loaded
            userProfile = {
                deviceId: getDeviceId(),
                createdAt: Date.now(),
                totalChaptersAttempted: 0,
                totalChaptersCompleted: 0,
                totalQuizAttempts: 0,
                totalStudyTime: 0,
                averageQuizScore: 0,
                lastActivityAt: Date.now(),
                weakTopics: [],
                preferences: { dataRetention: 'indefinite' }
            };
        }
        
        const success = storageSet('profile', userProfile);
        if (!success) {
            console.error('Failed to initialize UserProfile');
        }
        return success;
    }
    
    return true;
}

/**
 * Check if localStorage is available and accessible
 */
function isLocalStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Get unique device ID (UUID for this browser)
 */
function getDeviceId() {
    if (SESSION_ONLY_MODE) {
        return sessionCache['device-id'] || null;
    }
    
    try {
        return localStorage.getItem(`${TRACKER_PREFIX}device-id`);
    } catch (error) {
        console.error('Error reading device ID:', error);
        return null;
    }
}

/**
 * Generate UUID v4
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Store data in localStorage
 * @param {string} key - Storage key (without prefix)
 * @param {any} data - Data to store (will be JSON stringified)
 * @returns {boolean} - Success flag
 */
function storageSet(key, data) {
    const fullKey = `${TRACKER_PREFIX}${key}`;
    
    try {
        if (SESSION_ONLY_MODE) {
            sessionCache[key] = data;
            return true;
        }
        
        const jsonString = JSON.stringify(data);
        localStorage.setItem(fullKey, jsonString);
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded:', error);
            return false;
        }
        console.error('Error storing data:', error);
        return false;
    }
}

/**
 * Retrieve data from localStorage
 * @param {string} key - Storage key (without prefix)
 * @returns {any} - Retrieved data or null if not found
 */
function storageGet(key) {
    const fullKey = `${TRACKER_PREFIX}${key}`;
    
    try {
        if (SESSION_ONLY_MODE) {
            return sessionCache[key] || null;
        }
        
        const jsonString = localStorage.getItem(fullKey);
        return jsonString ? JSON.parse(jsonString) : null;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
}

/**
 * Delete data from localStorage
 * @param {string} key - Storage key (without prefix)
 * @returns {boolean} - Success flag
 */
function storageDelete(key) {
    const fullKey = `${TRACKER_PREFIX}${key}`;
    
    try {
        if (SESSION_ONLY_MODE) {
            delete sessionCache[key];
            return true;
        }
        
        localStorage.removeItem(fullKey);
        return true;
    } catch (error) {
        console.error('Error deleting data:', error);
        return false;
    }
}

/**
 * Clear all tracker data from localStorage
 * @returns {boolean} - Success flag
 */
function storageClearAll() {
    try {
        if (SESSION_ONLY_MODE) {
            sessionCache = {};
            return true;
        }
        
        const keys = Object.keys(localStorage);
        for (let key of keys) {
            if (key.startsWith(TRACKER_PREFIX)) {
                localStorage.removeItem(key);
            }
        }
        return true;
    } catch (error) {
        console.error('Error clearing data:', error);
        return false;
    }
}

/**
 * Check localStorage quota
 * @returns {object} - { used: bytes, quota: bytes, percentage: 0-100 }
 */
function getStorageQuota() {
    try {
        if (SESSION_ONLY_MODE) {
            const estimated = JSON.stringify(sessionCache).length;
            return {
                used: estimated,
                quota: 5000000, // Estimated 5MB for session
                percentage: Math.round((estimated / 5000000) * 100)
            };
        }
        
        // Estimate used space
        let used = 0;
        const keys = Object.keys(localStorage);
        for (let key of keys) {
            if (key.startsWith(TRACKER_PREFIX)) {
                used += localStorage.getItem(key).length;
            }
        }
        
        // Standard quota is 5-10MB per domain
        const quota = 10485760; // 10MB estimate
        
        return {
            used: used,
            quota: quota,
            percentage: Math.round((used / quota) * 100)
        };
    } catch (error) {
        console.error('Error checking storage quota:', error);
        return {
            used: 0,
            quota: 10485760,
            percentage: 0
        };
    }
}

/**
 * Check if storage is in session-only mode
 */
function isSessionOnlyMode() {
    return SESSION_ONLY_MODE;
}

/**
 * Track a chapter view (FR-001)
 * @param {string} chapterId - ID of chapter being viewed
 * @param {string} chapterTitle - Title of chapter
 * @returns {object} Updated ChapterProgress
 */
function trackChapterView(chapterId, chapterTitle = null) {
    if (!chapterId) {
        handleError('trackChapterView', new Error('Missing chapterId'));
        return null;
    }
    
    try {
        log(LOG_LEVEL.INFO, `Tracking chapter view: ${chapterId}`);
        
        // Get or create ChapterProgress
        const key = `chapter:${chapterId}`;
        let progress = storageGet(key);
        
        if (!progress) {
            // Create new ChapterProgress
            if (typeof ChapterProgress !== 'undefined') {
                progress = new ChapterProgress(chapterId);
            } else {
                progress = {
                    chapterId: chapterId,
                    status: 'started',
                    viewCount: 1,
                    firstViewedAt: Date.now(),
                    lastViewedAt: Date.now(),
                    totalTimeSpent: 0,
                    completedAt: null,
                    lastViewedPosition: null,
                    lastSessionStart: null,
                    lastSessionEnd: null,
                    lastSessionDuration: 0
                };
            }
        } else {
            // Update existing progress
            progress.viewCount++;
            progress.lastViewedAt = Date.now();
            if (progress.status === 'started') {
                progress.status = 'in-progress';
            }
            // Ensure new fields exist for older stored records
            if (typeof progress.totalTimeSpent !== 'number') progress.totalTimeSpent = 0;
            if (progress.lastSessionStart === undefined) progress.lastSessionStart = null;
            if (progress.lastSessionEnd === undefined) progress.lastSessionEnd = null;
            if (typeof progress.lastSessionDuration !== 'number') progress.lastSessionDuration = 0;
        }
        
        // Store updated progress
        const success = storageSet(key, progress);
        if (!success) {
            log(LOG_LEVEL.ERROR, 'Failed to store chapter progress', { chapterId });
            return null;
        }
        
        // Start / switch active learning session for this chapter
        startActiveLearningSession(chapterId);
        
        // Update UserProfile statistics
        updateUserProfileChapterStats();
        
        return progress;
    } catch (error) {
        handleError('trackChapterView', error, { chapterId });
        return null;
    }
}

/**
 * Start (or switch to) an active learning session for a chapter.
 * Flushes any previous session first.
 * @param {string} chapterId
 */
function startActiveLearningSession(chapterId) {
    if (!chapterId) return;

    // If already tracking the same chapter and not idle, just bump activity
    if (currentActiveSession && currentActiveSession.chapterId === chapterId) {
        touchActiveSession();
        return;
    }

    // Flush previous chapter session if switching
    if (currentActiveSession) {
        endActiveLearningSession();
    }

    const now = Date.now();
    currentActiveSession = {
        chapterId: chapterId,
        startTime: now,
        lastActivityTime: now,
        accumulatedMs: 0,
        isIdle: false
    };

    // Persist session start on the ChapterProgress record
    const key = `chapter:${chapterId}`;
    const progress = storageGet(key);
    if (progress) {
        progress.lastSessionStart = now;
        progress.lastViewedAt = now;
        storageSet(key, progress);
    }

    ensureActivityListeners();
    ensureHeartbeat();
    log(LOG_LEVEL.INFO, `Active learning session started: ${chapterId}`);
}

/**
 * Mark user activity (mouse, key, scroll, touch) so idle timer resets.
 */
function touchActiveSession() {
    if (!currentActiveSession) return;
    const now = Date.now();

    // If we were idle, resume from now (do not credit idle gap)
    if (currentActiveSession.isIdle) {
        currentActiveSession.isIdle = false;
        currentActiveSession.lastActivityTime = now;
        // Restart the "active" portion from now; previous active time already in accumulatedMs
        currentActiveSession.startTime = now;
        log(LOG_LEVEL.INFO, `Resumed active learning after idle: ${currentActiveSession.chapterId}`);
    } else {
        currentActiveSession.lastActivityTime = now;
    }
}

/**
 * Flush current active session time into ChapterProgress.totalTimeSpent
 * and update profile. Called on unload, visibility hidden, chapter switch, or heartbeat.
 * @param {boolean} endSession - if true, clear currentActiveSession after flush
 */
function flushActiveLearningSession(endSession = false) {
    if (!currentActiveSession) return;

    const now = Date.now();
    const sess = currentActiveSession;

    // Only credit time while not idle
    if (!sess.isIdle) {
        const elapsed = Math.max(0, now - sess.startTime);
        // Cap single flush to avoid huge jumps (e.g. tab sleeping)
        const MAX_FLUSH_MS = 30 * 60 * 1000; // 30 min safety
        const credit = Math.min(elapsed, MAX_FLUSH_MS);
        sess.accumulatedMs += credit;
        // Reset start so next flush only counts new time
        sess.startTime = now;
    }

    // Check idle: if no activity for IDLE_THRESHOLD, mark idle and stop accruing
    if (!sess.isIdle && (now - sess.lastActivityTime) >= IDLE_THRESHOLD_MS) {
        sess.isIdle = true;
        log(LOG_LEVEL.INFO, `Active learning paused (idle): ${sess.chapterId}`);
    }

    if (sess.accumulatedMs <= 0 && !endSession) {
        // Nothing to write yet
        return;
    }

    const chapterId = sess.chapterId;
    const key = `chapter:${chapterId}`;
    let progress = storageGet(key);

    if (!progress) {
        // Should not happen, but recover
        if (typeof ChapterProgress !== 'undefined') {
            progress = new ChapterProgress(chapterId);
        } else {
            progress = {
                chapterId,
                status: 'in-progress',
                viewCount: 1,
                firstViewedAt: now,
                lastViewedAt: now,
                totalTimeSpent: 0,
                completedAt: null,
                lastViewedPosition: null,
                lastSessionStart: sess.startTime,
                lastSessionEnd: null,
                lastSessionDuration: 0
            };
        }
    }

    const added = sess.accumulatedMs;
    progress.totalTimeSpent = (progress.totalTimeSpent || 0) + added;
    progress.lastViewedAt = now;
    progress.lastSessionDuration = (progress.lastSessionDuration || 0) + added;
    if (endSession) {
        progress.lastSessionEnd = now;
    }
    storageSet(key, progress);

    // Reset accumulated so we don't double-count on next flush
    sess.accumulatedMs = 0;

    // Keep UserProfile.totalStudyTime in sync (derived sum)
    updateUserProfileChapterStats();

    if (added > 0) {
        log(LOG_LEVEL.INFO, `Flushed ${added}ms study time for ${chapterId}. Total now: ${progress.totalTimeSpent}ms`);
    }

    if (endSession) {
        currentActiveSession = null;
        clearHeartbeat();
    }
}

/**
 * End the current active learning session and persist time.
 */
function endActiveLearningSession() {
    flushActiveLearningSession(true);
}

/**
 * Ensure activity listeners (mousemove, keydown, scroll, touchstart, visibility)
 * are attached once per page.
 */
function ensureActivityListeners() {
    if (activityListenersAttached || typeof document === 'undefined') return;
    activityListenersAttached = true;

    const onActivity = () => touchActiveSession();

    document.addEventListener('mousemove', onActivity, { passive: true });
    document.addEventListener('keydown', onActivity, { passive: true });
    document.addEventListener('scroll', onActivity, { passive: true });
    document.addEventListener('touchstart', onActivity, { passive: true });
    document.addEventListener('click', onActivity, { passive: true });

    // Visibility: pause when tab hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Flush and mark idle so time stops while tab is in background
            flushActiveLearningSession(false);
            if (currentActiveSession) {
                currentActiveSession.isIdle = true;
            }
        } else {
            // Tab became visible again — resume if we have a session
            if (currentActiveSession) {
                currentActiveSession.isIdle = false;
                currentActiveSession.startTime = Date.now();
                currentActiveSession.lastActivityTime = Date.now();
                touchActiveSession();
            }
        }
    });

    // Persist on page leave
    window.addEventListener('pagehide', () => endActiveLearningSession());
    window.addEventListener('beforeunload', () => endActiveLearningSession());
}

/**
 * Heartbeat: periodically flush time so progress is not lost if the tab is closed abruptly.
 */
function ensureHeartbeat() {
    if (heartbeatTimer) return;
    heartbeatTimer = setInterval(() => {
        if (currentActiveSession) {
            flushActiveLearningSession(false);
        }
    }, HEARTBEAT_INTERVAL_MS);
}

function clearHeartbeat() {
    if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
    }
}

/**
 * Mark a chapter as complete (FR-011)
 * @param {string} chapterId - ID of chapter to mark complete
 * @returns {boolean} Success flag
 */
function markChapterComplete(chapterId) {
    if (!chapterId) {
        handleError('markChapterComplete', new Error('Missing chapterId'));
        return false;
    }
    
    try {
        log(LOG_LEVEL.INFO, `Marking chapter complete: ${chapterId}`);
        
        const key = `chapter:${chapterId}`;
        const progress = storageGet(key);
        
        if (!progress) {
            log(LOG_LEVEL.WARN, 'Chapter not found', { chapterId });
            return false;
        }
        
        progress.status = 'completed';
        progress.completedAt = Date.now();
        
        const success = storageSet(key, progress);
        if (!success) {
            log(LOG_LEVEL.ERROR, 'Failed to mark chapter complete', { chapterId });
            return false;
        }
        
        // Update UserProfile statistics
        updateUserProfileChapterStats();
        
        return true;
    } catch (error) {
        handleError('markChapterComplete', error, { chapterId });
        return false;
    }
}

/**
 * Get chapter progress
 * @param {string} chapterId - ID of chapter
 * @returns {object} ChapterProgress object or null
 */
function getChapterProgress(chapterId) {
    if (!chapterId) return null;
    
    try {
        const key = `chapter:${chapterId}`;
        return storageGet(key);
    } catch (error) {
        handleError('getChapterProgress', error, { chapterId });
        return null;
    }
}

/**
 * Get all chapter progress
 * @returns {object} Map of chapterId -> ChapterProgress
 */
function getAllChapterProgress() {
    try {
        const allProgress = {};
        const keys = SESSION_ONLY_MODE ? Object.keys(sessionCache) : Object.keys(localStorage);
        
        for (let key of keys) {
            if (key.startsWith(`${TRACKER_PREFIX}chapter:`)) {
                const chapterId = key.substring(`${TRACKER_PREFIX}chapter:`.length);
                allProgress[chapterId] = storageGet(`chapter:${chapterId}`);
            }
        }
        
        return allProgress;
    } catch (error) {
        handleError('getAllChapterProgress', error);
        return {};
    }
}

/**
 * Track a quiz attempt (FR-003)
 * @param {string} quizId - ID of quiz being attempted
 * @param {string} quizTitle - Title of quiz
 * @param {number} score - Raw score achieved
 * @param {number} percentageScore - Percentage score (0-100)
 * @returns {object} Created QuizAttempt or null
 */
function trackQuizAttempt(quizId, quizTitle, score, percentageScore, timeTakenMs = 0) {
    if (!quizId || typeof percentageScore !== 'number') {
        handleError('trackQuizAttempt', new Error('Missing or invalid parameters'));
        return null;
    }
    
    try {
        log(LOG_LEVEL.INFO, `Recording quiz attempt: ${quizId} - ${percentageScore}%`);
        
        // Get existing attempts for this quiz to calculate attempt number
        const attempts = getQuizAttempts(quizId);
        const attemptNumber = attempts.length + 1;
        
        const now = Date.now();
        const safeTimeTaken = (typeof timeTakenMs === 'number' && timeTakenMs >= 0) ? timeTakenMs : 0;
        
        // Create QuizAttempt
        const attemptId = `${quizId}-attempt-${now}`;
        let attempt;
        
        if (typeof QuizAttempt !== 'undefined') {
            attempt = new QuizAttempt(attemptId, quizId, score, percentageScore);
            attempt.attemptNumber = attemptNumber;
            attempt.timeTaken = safeTimeTaken;
            attempt.attemptedAt = now - safeTimeTaken;
            attempt.completedAt = now;
        } else {
            attempt = {
                attemptId: attemptId,
                quizId: quizId,
                score: score,
                percentageScore: percentageScore,
                attemptNumber: attemptNumber,
                attemptedAt: now - safeTimeTaken,
                completedAt: now,
                timeTaken: safeTimeTaken,
                sessionId: null
            };
        }
        
        // Store the attempt
        const key = `quiz-attempt:${attemptId}`;
        const success = storageSet(key, attempt);
        
        if (!success) {
            log(LOG_LEVEL.ERROR, 'Failed to store quiz attempt', { quizId });
            return null;
        }
        
        // Update UserProfile aggregates
        updateUserProfileQuizStats(quizId, quizTitle, percentageScore);
        
        return attempt;
    } catch (error) {
        handleError('trackQuizAttempt', error, { quizId, percentageScore });
        return null;
    }
}

/**
 * Get all attempts for a specific quiz
 * @param {string} quizId - ID of quiz
 * @returns {array} Array of QuizAttempt objects
 */
function getQuizAttempts(quizId) {
    try {
        const attempts = [];
        const keys = SESSION_ONLY_MODE ? Object.keys(sessionCache) : Object.keys(localStorage);
        
        for (let key of keys) {
            if (key.startsWith(`${TRACKER_PREFIX}quiz-attempt:`)) {
                const attempt = storageGet(key.substring(TRACKER_PREFIX.length));
                if (attempt && attempt.quizId === quizId) {
                    attempts.push(attempt);
                }
            }
        }
        
        // Sort by date (newest first)
        attempts.sort((a, b) => (b.attemptedAt || b.completedAt) - (a.attemptedAt || a.completedAt));
        
        return attempts;
    } catch (error) {
        handleError('getQuizAttempts', error, { quizId });
        return [];
    }
}

/**
 * Get all quiz attempts across all quizzes
 * @returns {array} Array of all QuizAttempt objects
 */
function getAllQuizAttempts() {
    try {
        const attempts = [];
        const keys = SESSION_ONLY_MODE ? Object.keys(sessionCache) : Object.keys(localStorage);
        
        for (let key of keys) {
            if (key.startsWith(`${TRACKER_PREFIX}quiz-attempt:`)) {
                const attempt = storageGet(key.substring(TRACKER_PREFIX.length));
                if (attempt) {
                    attempts.push(attempt);
                }
            }
        }
        
        // Sort by date (newest first)
        attempts.sort((a, b) => (b.attemptedAt || b.completedAt) - (a.attemptedAt || a.completedAt));
        
        return attempts;
    } catch (error) {
        handleError('getAllQuizAttempts', error);
        return [];
    }
}


/**
 * Rebuild UserProfile chapter counters from stored ChapterProgress records
 */
function updateUserProfileChapterStats() {
    try {
        let profile = storageGet('profile');
        if (!profile) {
            initializeUserProfile();
            profile = storageGet('profile');
        }
        if (!profile) {
            log(LOG_LEVEL.ERROR, 'updateUserProfileChapterStats: no profile');
            return false;
        }

        const allProgress = getAllChapterProgress();
        const chapterIds = Object.keys(allProgress || {});
        let completed = 0;
        let totalStudyTime = 0;
        for (const id of chapterIds) {
            if (allProgress[id]) {
                if (allProgress[id].status === 'completed') {
                    completed += 1;
                }
                totalStudyTime += (allProgress[id].totalTimeSpent || 0);
            }
        }

        profile.totalChaptersAttempted = chapterIds.length;
        profile.totalChaptersCompleted = completed;
        profile.totalStudyTime = totalStudyTime;
        profile.lastActivityAt = Date.now();

        const success = storageSet('profile', profile);
        if (!success) {
            log(LOG_LEVEL.ERROR, 'Failed to save profile after chapter stats update');
        }
        return success;
    } catch (error) {
        handleError('updateUserProfileChapterStats', error);
        return false;
    }
}

/**
 * Update UserProfile quiz aggregates after a new attempt
 * @param {string} quizId
 * @param {string} quizTitle
 * @param {number} percentageScore - 0-100
 */
function updateUserProfileQuizStats(quizId, quizTitle, percentageScore) {
    try {
        let profile = storageGet('profile');
        if (!profile) {
            initializeUserProfile();
            profile = storageGet('profile');
        }
        if (!profile) {
            log(LOG_LEVEL.ERROR, 'updateUserProfileQuizStats: no profile');
            return false;
        }

        const allAttempts = getAllQuizAttempts();
        const totalAttempts = allAttempts.length;
        let sum = 0;
        for (const a of allAttempts) {
            sum += (typeof a.percentageScore === 'number' ? a.percentageScore : 0);
        }
        const average = totalAttempts > 0 ? Math.round((sum / totalAttempts) * 100) / 100 : 0;

        profile.totalQuizAttempts = totalAttempts;
        profile.averageQuizScore = average;
        profile.lastActivityAt = Date.now();

        // Maintain weakTopics: topics with average score < 70
        if (!Array.isArray(profile.weakTopics)) {
            profile.weakTopics = [];
        }

        if (quizId) {
            const quizAttempts = allAttempts.filter(a => a.quizId === quizId);
            const quizSum = quizAttempts.reduce((s, a) => s + (a.percentageScore || 0), 0);
            const quizAvg = quizAttempts.length > 0 ? quizSum / quizAttempts.length : percentageScore;
            const lastAt = quizAttempts.length
                ? Math.max(...quizAttempts.map(a => a.attemptedAt || a.completedAt || 0))
                : Date.now();

            const existingIdx = profile.weakTopics.findIndex(t => t.quizId === quizId);
            const entry = {
                quizId: quizId,
                quizTitle: quizTitle || quizId,
                averageScore: Math.round(quizAvg * 100) / 100,
                attempts: quizAttempts.length,
                lastAttemptAt: lastAt
            };

            if (quizAvg < 70) {
                if (existingIdx >= 0) {
                    profile.weakTopics[existingIdx] = entry;
                } else {
                    profile.weakTopics.push(entry);
                }
            } else if (existingIdx >= 0) {
                // No longer weak — remove
                profile.weakTopics.splice(existingIdx, 1);
            }
        }

        const success = storageSet('profile', profile);
        if (!success) {
            log(LOG_LEVEL.ERROR, 'Failed to save profile after quiz stats update');
        }
        return success;
    } catch (error) {
        handleError('updateUserProfileQuizStats', error, { quizId, percentageScore });
        return false;
    }
}

/**
 * Clear all learning data with confirmation (FR-008, T042)
 * @param {Function} onConfirm - Callback to show confirmation dialog
 * @returns {boolean} True if data was cleared
 */
function clearAllDataWithConfirmation(onConfirm) {
    if (onConfirm && !onConfirm()) {
        log(LOG_LEVEL.INFO, 'Data clear cancelled by user');
        return false;
    }
    
    return storageClearAll();
}

/**
 * Get data summary for display (T044)
 * @returns {object} Summary of stored data
 */
function getDataSummary() {
    try {
        const profile = storageGet('profile');
        const allProgress = getAllChapterProgress();
        const allAttempts = getAllQuizAttempts();
        
        const chapterIds = Object.keys(allProgress || {});
        
        return {
            deviceId: profile?.deviceId || 'Not set',
            chaptersTracked: chapterIds.length,
            chaptersCompleted: chapterIds.filter(id => allProgress[id]?.status === 'completed').length,
            quizAttempts: allAttempts?.length || 0,
            totalStudyTime: profile?.totalStudyTime || 0,
            createdAt: profile?.createdAt || Date.now(),
            lastActivityAt: profile?.lastActivityAt || Date.now(),
            storageSummary: `${chapterIds.length} chapters, ${allAttempts?.length || 0} quiz attempts`
        };
    } catch (error) {
        handleError('getDataSummary', error);
        return null;
    }
}

/**
 * Get storage usage and quota (T045)
 * @returns {object} Storage usage information
 */
function getStorageUsage() {
    return getStorageQuota();
}

/**
 * Check if storage quota is nearly full (T046)
 * @param {number} threshold - Percentage threshold (default 80)
 * @returns {boolean} True if usage is above threshold
 */
function isStorageNearlyFull(threshold = 80) {
    const quota = getStorageQuota();
    return quota.percentage >= threshold;
}

/**
 * Logging infrastructure for debugging
 */

const LOG_LEVEL = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
};

let currentLogLevel = LOG_LEVEL.INFO;
const logHistory = [];

/**
 * Internal logging function
 */
function log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level,
        message,
        data
    };
    
    logHistory.push(logEntry);
    
    // Keep only last 100 log entries
    if (logHistory.length > 100) {
        logHistory.shift();
    }
    
    // Output to console based on level
    if (level === LOG_LEVEL.ERROR) {
        console.error(`[${timestamp}] ${message}`, data);
    } else if (level === LOG_LEVEL.WARN) {
        console.warn(`[${timestamp}] ${message}`, data);
    } else if (level === LOG_LEVEL.DEBUG) {
        if (currentLogLevel === LOG_LEVEL.DEBUG) {
            console.debug(`[${timestamp}] ${message}`, data);
        }
    } else {
        console.log(`[${timestamp}] ${message}`, data);
    }
}

/**
 * Set logging level
 */
function setLogLevel(level) {
    if (Object.values(LOG_LEVEL).includes(level)) {
        currentLogLevel = level;
    }
}

/**
 * Get logging history
 */
function getLogHistory() {
    return [...logHistory];
}

/**
 * Error handler wrapper
 */
function handleError(operation, error, context = null) {
    log(LOG_LEVEL.ERROR, `${operation} failed`, {
        error: error.message,
        stack: error.stack,
        context
    });
    
    // Graceful degradation
    if (error.name === 'QuotaExceededError') {
        log(LOG_LEVEL.WARN, 'Storage quota exceeded - operations may fail', null);
        return false;
    }
    
    return false;
}

/**
 * Verify storage health
 */
function verifyStorageHealth() {
    const health = {
        localStorageAvailable: isLocalStorageAvailable(),
        sessionOnlyMode: SESSION_ONLY_MODE,
        deviceIdPresent: getDeviceId() !== null,
        quotaInfo: getStorageQuota()
    };
    
    log(LOG_LEVEL.INFO, 'Storage health check', health);
    
    return health;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeStorage,
        isLocalStorageAvailable,
        getDeviceId,
        generateUUID,
        storageSet,
        storageGet,
        storageDelete,
        storageClearAll,
        getStorageQuota,
        isSessionOnlyMode,
        setLogLevel,
        getLogHistory,
        handleError,
        verifyStorageHealth,
        trackChapterView,
        markChapterComplete,
        getChapterProgress,
        getAllChapterProgress,
        updateUserProfileChapterStats,
        trackQuizAttempt,
        getQuizAttempts,
        getAllQuizAttempts,
        updateUserProfileQuizStats,
        clearAllDataWithConfirmation,
        getDataSummary,
        getStorageUsage,
        isStorageNearlyFull,
        startActiveLearningSession,
        endActiveLearningSession,
        flushActiveLearningSession,
        touchActiveSession,
        LOG_LEVEL
    };
}
