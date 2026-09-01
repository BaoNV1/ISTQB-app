# Public Contracts: Learning Progress Tracker

**Date**: 2026-09-01 | **Feature**: Learning Progress Tracker

## Overview

This feature is internal to the ISTQB learning web app. There are **no public APIs or external contracts** exposed in v1.

### Future Consideration (v2+)

If future versions require:
- **Exporting progress data**: Define export format (CSV, JSON)
- **Importing progress**: Define import schema
- **API for third-party integrations**: Define REST/GraphQL endpoints
- **Mobile app sync**: Define sync protocol

These should be defined in a future contracts document.

---

## Current Status (v1)

✅ **No public contracts** — All progress tracking is client-side, localStorage-based, per-browser.

The feature does not expose:
- HTTP endpoints
- Public APIs  
- Data export formats (beyond localStorage inspection)
- Webhook protocols
- CLI interfaces

---

## Internal Interfaces (for reference)

The implementation uses **internal module interfaces** (not contracts):

### `learning-tracker/storage.js`

```javascript
// Initialize tracker
export function initializeTracker();

// Chapter tracking
export function logChapterView(chapterId, chapterTitle);
export function getChapterProgress(chapterId);
export function markChapterComplete(chapterId);

// Quiz tracking
export function logQuizAttempt(quizId, score, timeTaken);
export function getQuizAttempts(quizId);

// Data management
export function getUserProfile();
export function getWeakTopics();
export function clearAllData();
```

### `learning-tracker/analytics.js`

```javascript
// Statistics
export function calculateTotalStudyTime();
export function calculateAverageQuizScore();
export function calculateChaptersCompleted();
export function identifyWeakTopics();
```

These are **implementation details**, not public contracts. See [data-model.md](data-model.md) for data structure specifications.

---

## Notes for Future Contracts

When external interfaces are needed, follow these patterns:

- **Data Export Format**: JSON schema for portability
- **API Versioning**: Semantic versioning (1.0.0)
- **Error Handling**: Standardized error codes and messages
- **Rate Limiting**: If backend added later
- **Authentication**: If user accounts added later
