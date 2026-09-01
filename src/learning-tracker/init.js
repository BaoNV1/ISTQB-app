/**
 * Global Learning Tracker Initialization
 * 
 * This script initializes the learning progress tracker on all pages
 * Should be loaded in the <head> or early in page load
 */

// Implement the trackChapterView_impl function that chapter pages call
function trackChapterView_impl(chapterId, chapterTitle) {
    if (typeof trackChapterView === 'function' && trackChapterView.length === 0) {
        // Called from storage module
        return;
    }
    
    // Import storage functions if available
    if (typeof storageSet !== 'undefined' && typeof storageGet !== 'undefined') {
        // Use the storage module directly
        if (typeof trackChapterView === 'undefined') {
            // Define it locally
            window.trackChapterView = function(id, title) {
                // Will be defined by storage module
            };
        }
    }
    
    console.log('Tracking chapter view:', chapterId, chapterTitle);
}

// Initialize storage system on page load
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initializeStorage === 'function') {
        initializeStorage();
        console.log('Learning tracker initialized');
    }
});

// Make functions available globally
window.trackChapterView_impl = trackChapterView_impl;
