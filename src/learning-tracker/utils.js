/**
 * Learning Progress Tracker - Utilities
 * 
 * Shared utility functions:
 * - UUID generation
 * - Timestamp formatting
 * - Duration calculation
 */

/**
 * Generate UUID v4
 * @returns {string} UUID
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Format timestamp to human-readable string
 * @param {number} timestamp - Milliseconds since epoch
 * @returns {string} Formatted date string
 */
function formatTimestamp(timestamp) {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    if (dateStr === today.toLocaleDateString()) {
        return `Today at ${timeStr}`;
    } else if (dateStr === yesterday.toLocaleDateString()) {
        return `Yesterday at ${timeStr}`;
    } else {
        return `${dateStr} at ${timeStr}`;
    }
}

/**
 * Format duration in milliseconds to human-readable string
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} Formatted duration (e.g., "1h 30m", "45m", "2s")
 */
function formatDuration(milliseconds) {
    if (!milliseconds || milliseconds < 0) return '0s';
    
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        const remainingHours = hours % 24;
        return `${days}d ${remainingHours}h`;
    } else if (hours > 0) {
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
 * Calculate duration between two timestamps
 * @param {number} startTime - Start timestamp (milliseconds)
 * @param {number} endTime - End timestamp (milliseconds)
 * @returns {number} Duration in milliseconds
 */
function calculateDuration(startTime, endTime) {
    if (!startTime || !endTime) return 0;
    const duration = endTime - startTime;
    return Math.max(0, duration); // Ensure non-negative
}

/**
 * Calculate average of array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Average (0 if empty array)
 */
function calculateAverage(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return Math.round((sum / numbers.length) * 100) / 100; // Round to 2 decimals
}

/**
 * Calculate percentage
 * @param {number} part - Part value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100, rounded)
 */
function calculatePercentage(part, total) {
    if (!total || total === 0) return 0;
    return Math.round((part / total) * 100);
}

/**
 * Convert seconds to milliseconds
 * @param {number} seconds - Seconds
 * @returns {number} Milliseconds
 */
function secondsToMillis(seconds) {
    return seconds * 1000;
}

/**
 * Convert milliseconds to seconds
 * @param {number} milliseconds - Milliseconds
 * @returns {number} Seconds
 */
function millisToSeconds(milliseconds) {
    return Math.floor(milliseconds / 1000);
}

/**
 * Validate timestamp is a valid number
 * @param {number} timestamp - Milliseconds since epoch
 * @returns {boolean} True if valid
 */
function isValidTimestamp(timestamp) {
    return typeof timestamp === 'number' && timestamp > 0 && timestamp <= Date.now();
}

/**
 * Clamp value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateUUID,
        formatTimestamp,
        formatDuration,
        calculateDuration,
        calculateAverage,
        calculatePercentage,
        secondsToMillis,
        millisToSeconds,
        isValidTimestamp,
        clamp
    };
}
