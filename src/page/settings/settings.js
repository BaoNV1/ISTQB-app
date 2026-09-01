/**
 * Settings Page - Learning Tracker
 * 
 * Handles:
 * - Data summary display
 * - Clear all data functionality
 * - Navigation back to dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize functions (if modules are loaded)
    updateDataSummary();
    setupEventListeners();
});

/**
 * Update the data summary display
 */
function updateDataSummary() {
    const summaryContainer = document.getElementById('dataSummary');
    
    if (!summaryContainer) return;
    
    if (typeof getDataSummary !== 'undefined' && typeof getStorageUsage !== 'undefined') {
        const summary = getDataSummary();
        const storageUsage = getStorageUsage();
        const display = createDataSummaryDisplay(summary, storageUsage);
        
        summaryContainer.innerHTML = '';
        summaryContainer.appendChild(display);
    } else {
        // Fallback if modules not loaded
        summaryContainer.innerHTML = '<p>Unable to load data summary. Make sure learning tracker module is loaded.</p>';
    }
}

/**
 * Setup event listeners for buttons
 */
function setupEventListeners() {
    // Back button
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = '/';
        });
    }
    
    // Refresh button
    const refreshButton = document.getElementById('refreshButton');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            updateDataSummary();
        });
    }
    
    // Clear data button
    const clearButton = document.getElementById('clearDataButton');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            handleClearData();
        });
    }
}

/**
 * Handle clearing all data
 */
function handleClearData() {
    if (typeof clearAllDataWithConfirmation !== 'undefined') {
        const confirmed = confirm('Are you sure you want to clear ALL learning data? This cannot be undone.');
        
        if (confirmed) {
            const success = clearAllDataWithConfirmation(function() { return true; });
            
            if (success) {
                alert('All learning data has been cleared. Your progress tracker has been reset.');
                // Reload page to show fresh state
                setTimeout(function() {
                    location.reload();
                }, 1000);
            } else {
                alert('Failed to clear data. Please try again.');
            }
        }
    }
}

/**
 * Create data summary display (stub - will be provided by ui.js)
 */
function createDataSummaryDisplay(summary, storageUsage) {
    // This will be overridden by ui.js if loaded
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">Chapters Tracked</span>
            <span class="summary-value">${summary.chaptersTracked || 0}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Quiz Attempts</span>
            <span class="summary-value">${summary.quizAttempts || 0}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Total Study Time</span>
            <span class="summary-value">${formatDuration(summary.totalStudyTime || 0) || 'N/A'}</span>
        </div>
    `;
    return container;
}

/**
 * Format duration (fallback)
 */
function formatDuration(milliseconds) {
    if (!milliseconds) return 'N/A';
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}
