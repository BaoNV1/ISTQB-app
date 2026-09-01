/**
 * Learning Progress Tracker - Analytics Module
 * 
 * Provides statistics calculation and weak topic identification
 */

/**
 * Calculate total study time across all chapters (T032)
 * @returns {number} Total milliseconds spent on all chapters
 */
function calculateTotalStudyTime() {
    if (typeof getAllChapterProgress !== 'undefined') {
        const allProgress = getAllChapterProgress();
        let totalTime = 0;
        
        for (let chapterId in allProgress) {
            totalTime += allProgress[chapterId].totalTimeSpent || 0;
        }
        
        return totalTime;
    }
    return 0;
}

/**
 * Calculate average quiz score (T032)
 * @returns {number} Average score as percentage (0-100)
 */
function calculateAverageQuizScore() {
    if (typeof getAllQuizAttempts !== 'undefined') {
        const attempts = getAllQuizAttempts();
        
        if (attempts.length === 0) return 0;
        
        const total = attempts.reduce((sum, attempt) => sum + (attempt.percentageScore || 0), 0);
        return Math.round((total / attempts.length) * 100) / 100;
    }
    return 0;
}

/**
 * Calculate chapters completed (T032)
 * @returns {number} Count of chapters marked as completed
 */
function calculateChaptersCompleted() {
    if (typeof getAllChapterProgress !== 'undefined') {
        const allProgress = getAllChapterProgress();
        let count = 0;
        
        for (let chapterId in allProgress) {
            if (allProgress[chapterId].status === 'completed') {
                count++;
            }
        }
        
        return count;
    }
    return 0;
}

/**
 * Calculate total chapters viewed (T032)
 * @returns {number} Count of chapters with at least one view
 */
function calculateTotalChaptersViewed() {
    if (typeof getAllChapterProgress !== 'undefined') {
        return Object.keys(getAllChapterProgress()).length;
    }
    return 0;
}

/**
 * Identify weak topics - quizzes where user scores below average (T033)
 * @returns {array} Array of weak topic objects
 */
function identifyWeakTopics() {
    if (typeof getAllQuizAttempts !== 'undefined' && typeof storageGet !== 'undefined') {
        const profile = storageGet('profile');
        
        if (!profile) return [];
        
        return profile.weakTopics || [];
    }
    return [];
}

/**
 * Get all statistics in one object (T034)
 * @returns {object} Statistics object with all metrics
 */
function getStatistics() {
    return {
        totalStudyTime: calculateTotalStudyTime(),
        averageQuizScore: calculateAverageQuizScore(),
        chaptersCompleted: calculateChaptersCompleted(),
        totalChaptersViewed: calculateTotalChaptersViewed(),
        weakTopics: identifyWeakTopics(),
        completionPercentage: calculateCompletionPercentage()
    };
}

/**
 * Calculate completion percentage
 * @returns {number} Percentage of chapters completed (0-100)
 */
function calculateCompletionPercentage() {
    const total = calculateTotalChaptersViewed();
    const completed = calculateChaptersCompleted();
    
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
}

// Export analytics functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateTotalStudyTime,
        calculateAverageQuizScore,
        calculateChaptersCompleted,
        calculateTotalChaptersViewed,
        identifyWeakTopics,
        getStatistics,
        calculateCompletionPercentage
    };
}
