/**
 * Learning Progress Tracker - Data Models
 * 
 * Defines data model classes:
 * - UserProfile
 * - ChapterProgress  
 * - QuizAttempt
 * - LearningSession
 * - WeakTopicTracking
 */

/**
 * UserProfile - Aggregate of all learning data
 */
class UserProfile {
    constructor(deviceId) {
        this.deviceId = deviceId;
        this.createdAt = Date.now();
        this.totalChaptersAttempted = 0;
        this.totalChaptersCompleted = 0;
        this.totalQuizAttempts = 0;
        this.totalStudyTime = 0; // milliseconds
        this.averageQuizScore = 0; // 0-100
        this.lastActivityAt = Date.now();
        this.weakTopics = []; // Array of { quizId, quizTitle, averageScore, attempts, lastAttemptAt }
        this.preferences = {
            dataRetention: 'indefinite'
        };
    }
    
    validate() {
        if (!this.deviceId || typeof this.deviceId !== 'string') {
            throw new Error('Invalid deviceId');
        }
        if (this.totalChaptersAttempted < 0 || this.totalChaptersCompleted < 0) {
            throw new Error('Invalid chapter counts');
        }
        if (this.totalChaptersAttempted < this.totalChaptersCompleted) {
            throw new Error('Completed chapters cannot exceed attempted chapters');
        }
        if (this.totalQuizAttempts < 0) {
            throw new Error('Invalid quiz attempt count');
        }
        if (this.totalStudyTime < 0) {
            throw new Error('Invalid study time');
        }
        if (this.averageQuizScore < 0 || this.averageQuizScore > 100) {
            throw new Error('Average quiz score must be 0-100');
        }
        if (!Array.isArray(this.weakTopics)) {
            throw new Error('weakTopics must be an array');
        }
        // Check for duplicate quizIds in weakTopics
        const quizIds = this.weakTopics.map(t => t.quizId);
        if (new Set(quizIds).size !== quizIds.length) {
            throw new Error('Duplicate quizId in weakTopics');
        }
        return true;
    }
}

/**
 * ChapterProgress - Track user's progress through a specific chapter
 */
class ChapterProgress {
    constructor(chapterId) {
        this.chapterId = chapterId;
        this.status = 'started'; // 'started', 'in-progress', 'completed'
        this.viewCount = 1;
        this.firstViewedAt = Date.now();
        this.lastViewedAt = Date.now();
        this.totalTimeSpent = 0; // milliseconds
        this.completedAt = null; // timestamp when marked complete
        this.lastViewedPosition = null; // section/scroll position for resume
    }
    
    validate() {
        if (!this.chapterId || typeof this.chapterId !== 'string') {
            throw new Error('Invalid chapterId');
        }
        if (!['started', 'in-progress', 'completed'].includes(this.status)) {
            throw new Error('Invalid status');
        }
        if (this.viewCount < 1) {
            throw new Error('viewCount must be at least 1');
        }
        if (this.totalTimeSpent < 0) {
            throw new Error('totalTimeSpent must be >= 0');
        }
        if (this.completedAt && this.completedAt < this.firstViewedAt) {
            throw new Error('completedAt cannot be before firstViewedAt');
        }
        return true;
    }
}

/**
 * QuizAttempt - Record of a single quiz attempt
 */
class QuizAttempt {
    constructor(attemptId, quizId, score, percentageScore) {
        this.attemptId = attemptId;
        this.quizId = quizId;
        this.score = score;
        this.percentageScore = percentageScore; // 0-100
        this.attemptNumber = 1;
        this.attemptedAt = Date.now();
        this.completedAt = Date.now();
        this.timeTaken = 0; // milliseconds
        this.sessionId = null; // ID of learning session
    }
    
    validate() {
        if (!this.attemptId || typeof this.attemptId !== 'string') {
            throw new Error('Invalid attemptId');
        }
        if (!this.quizId || typeof this.quizId !== 'string') {
            throw new Error('Invalid quizId');
        }
        if (typeof this.score !== 'number' || this.score < 0) {
            throw new Error('Invalid score');
        }
        if (this.percentageScore < 0 || this.percentageScore > 100) {
            throw new Error('percentageScore must be 0-100');
        }
        if (this.attemptNumber < 1) {
            throw new Error('attemptNumber must be >= 1');
        }
        if (this.timeTaken < 0) {
            throw new Error('timeTaken must be >= 0');
        }
        return true;
    }
}

/**
 * LearningSession - Represents a user's current session
 */
class LearningSession {
    constructor(sessionId) {
        this.sessionId = sessionId;
        this.startedAt = Date.now();
        this.lastActivityAt = Date.now();
        this.activitiesCount = 0;
        this.chaptersVisited = [];
        this.quizzesAttempted = [];
    }
    
    validate() {
        if (!this.sessionId || typeof this.sessionId !== 'string') {
            throw new Error('Invalid sessionId');
        }
        if (!Array.isArray(this.chaptersVisited) || !Array.isArray(this.quizzesAttempted)) {
            throw new Error('activities must be arrays');
        }
        return true;
    }
}

/**
 * WeakTopicTracking - Identifies topics where user scores below average
 */
class WeakTopicTracking {
    constructor(quizId, quizTitle) {
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.averageScore = 0;
        this.attempts = 0;
        this.lastAttemptAt = null;
        this.flaggedForStudy = false;
    }
    
    validate() {
        if (!this.quizId || typeof this.quizId !== 'string') {
            throw new Error('Invalid quizId');
        }
        if (!this.quizTitle || typeof this.quizTitle !== 'string') {
            throw new Error('Invalid quizTitle');
        }
        if (this.averageScore < 0 || this.averageScore > 100) {
            throw new Error('averageScore must be 0-100');
        }
        if (this.attempts < 0) {
            throw new Error('attempts must be >= 0');
        }
        return true;
    }
}

/**
 * Validate all model instances have required fields
 */
function validateModel(model) {
    if (!model || typeof model.validate !== 'function') {
        throw new Error('Model must have validate method');
    }
    model.validate();
    return true;
}

// Export model classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        UserProfile,
        ChapterProgress,
        QuizAttempt,
        LearningSession,
        WeakTopicTracking,
        validateModel
    };
}
