/**
 * Global Learning Tracker Initialization
 *
 * This script initializes the learning progress tracker on all pages.
 * Should be loaded after storage.js (and related modules).
 */

/**
 * Bridge used by chapter pages to record a chapter view.
 * Calls the real trackChapterView from storage.js when available.
 */
function trackChapterView_impl(chapterId, chapterTitle) {
    if (!chapterId) {
        console.warn('trackChapterView_impl: missing chapterId');
        return null;
    }

    // Prefer the real storage implementation (defined in storage.js).
    // storage.js defines: function trackChapterView(chapterId, chapterTitle = null)
    // which has .length === 1. Page stubs had .length === 0.
    if (typeof trackChapterView === 'function' && trackChapterView.length >= 1) {
        try {
            return trackChapterView(chapterId, chapterTitle || null);
        } catch (err) {
            console.error('trackChapterView failed:', err);
            return null;
        }
    }

    // Fallback: if storage helpers exist but trackChapterView is missing/wrong name
    if (typeof storageSet === 'function' && typeof storageGet === 'function') {
        console.warn('trackChapterView not found; chapter view may not be stored:', chapterId);
    } else {
        console.warn('Learning tracker storage not loaded; cannot track:', chapterId);
    }
    return null;
}

/**
 * Helper for chapter pages to record a quiz attempt safely.
 */
function trackQuizAttempt_impl(quizId, quizTitle, score, percentageScore) {
    if (typeof trackQuizAttempt === 'function') {
        try {
            return trackQuizAttempt(quizId, quizTitle, score, percentageScore);
        } catch (err) {
            console.error('trackQuizAttempt failed:', err);
            return null;
        }
    }
    console.warn('trackQuizAttempt not available; quiz result not stored:', quizId);
    return null;
}

// Initialize storage system on page load
document.addEventListener('DOMContentLoaded', function () {
    if (typeof initializeStorage === 'function') {
        initializeStorage();
        console.log('Learning tracker initialized');
    } else {
        console.warn('initializeStorage not found — tracker scripts may be missing');
    }
});

// Make bridge functions available globally
window.trackChapterView_impl = trackChapterView_impl;
window.trackQuizAttempt_impl = trackQuizAttempt_impl;
