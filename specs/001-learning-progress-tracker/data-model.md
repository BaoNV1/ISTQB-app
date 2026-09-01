# Data Model: Learning Progress Tracker

**Date**: 2026-09-01 | **Feature**: Learning Progress Tracker

## Overview

This document defines the data model for the learning progress tracker. All entities are stored in browser localStorage as JSON objects. The model emphasizes simplicity and efficient serialization.

---

## Storage Architecture

### localStorage Namespace

Data is organized using a key-based namespace structure in localStorage:

```
tracker:profile                    → UserProfile (singleton)
tracker:session:{sessionId}        → LearningSession
tracker:chapter:{chapterId}        → ChapterProgress
tracker:quiz-attempt:{attemptId}   → QuizAttempt
tracker:config                     → Configuration (if needed)
```

### Serialization

All entities are serialized as JSON strings. Example:
```javascript
localStorage.setItem('tracker:profile', JSON.stringify(userProfile));
const userProfile = JSON.parse(localStorage.getItem('tracker:profile'));
```

---

## Core Entities

### 1. UserProfile

**Purpose**: Aggregate user learning statistics and performance metrics.

**Storage Key**: `tracker:profile`

**Schema**:

```javascript
{
  // Identity
  deviceId: string,                    // Unique per browser (UUID)
  createdAt: timestamp,                // First learning session on this device
  
  // Aggregated Statistics
  totalChaptersAttempted: number,      // Count of chapters user has started
  totalChaptersCompleted: number,      // Count of chapters marked complete
  totalQuizAttempts: number,           // Count of all quiz attempt records
  totalStudyTime: number,              // Total milliseconds spent on learning (aggregate)
  averageQuizScore: number,            // Mean of all quiz attempt scores
  
  // Learning Metadata
  lastActivityAt: timestamp,           // Last time any learning activity occurred
  weakTopics: [                        // Topics (quizzes) where user scores below average
    {
      quizId: string,
      quizTitle: string,               // Cached quiz title for display
      averageScore: number,            // User's average score on this quiz (over all attempts)
      attempts: number,                // How many times user took this quiz
      lastAttemptAt: timestamp
    }
  ],
  
  // Preferences (v1: minimal, can expand)
  preferences: {
    dataRetention: "indefinite"        // Policy: "indefinite" (default) or future: "30days", "6months"
  }
}
```

**Validation Rules**:
- `deviceId` must be non-empty string
- `totalChaptersAttempted` ≥ `totalChaptersCompleted`
- `totalStudyTime` ≥ 0
- `averageQuizScore` must be 0-100 (or N/A if no attempts)
- `weakTopics` array must not contain duplicates (by quizId)

**State Transitions**:
- Created on first user interaction
- Updated whenever chapter/quiz data changes
- Recalculated (derived) whenever ChapterProgress or QuizAttempt records added/modified

**Lifecycle**:
- Persists indefinitely (no automatic expiration)
- Cleared only by explicit user action via settings

---

### 2. ChapterProgress

**Purpose**: Track user's progress through a specific chapter.

**Storage Key**: `tracker:chapter:{chapterId}`

**Schema**:

```javascript
{
  // Identity
  chapterId: string,                   // e.g., "chapter1", "chapter2", etc.
  chapterTitle: string,                // e.g., "Fundamentals of Testing"
  
  // Progress Status
  status: enum,                        // "not-started" | "viewed" | "in-progress" | "completed"
  viewCount: number,                   // How many times user opened this chapter
  
  // Timestamps
  firstViewedAt: timestamp,            // When user first opened chapter
  lastViewedAt: timestamp,             // Most recent view
  completedAt: timestamp | null,       // When user explicitly marked complete (null if not completed)
  
  // Time Tracking
  totalTimeSpent: number,              // Total milliseconds spent viewing this chapter
  lastSessionDuration: number,         // Duration of most recent viewing session
  
  // Session Information
  lastSessionStart: timestamp,         // When last viewing session started
  lastSessionEnd: timestamp            // When last viewing session ended
}
```

**Validation Rules**:
- `chapterId` must be non-empty string
- `status` must be one of: "not-started", "viewed", "in-progress", "completed"
- `viewCount` ≥ 0
- If `status` is "completed", `completedAt` must not be null
- `totalTimeSpent` ≥ 0
- `firstViewedAt` ≤ `lastViewedAt`
- `lastSessionStart` ≤ `lastSessionEnd`

**State Transitions**:

```
not-started
    ↓ (user views chapter)
viewed
    ↓ (user clicks "Mark Complete")
completed
    ↓ (if user resumes reading — optional for v1)
in-progress (can cycle back to viewed, re-complete)
```

**Lifecycle**:
- Created when user first visits chapter
- Status updated as user interacts with chapter and marks complete
- Time tracking updated on chapter view/exit events
- Persists indefinitely (never auto-deleted)

---

### 3. QuizAttempt

**Purpose**: Record a single quiz attempt and its result.

**Storage Key**: `tracker:quiz-attempt:{attemptId}`

**Schema**:

```javascript
{
  // Identity
  attemptId: string,                   // UUID; unique per attempt
  quizId: string,                      // e.g., "Chapter1_Quiz", "Chapter2_Quiz_2"
  quizTitle: string,                   // Cached quiz title
  
  // Attempt Result
  score: number,                       // Points earned (0-100 as percentage)
  maxScore: number,                    // Maximum possible points (e.g., 100)
  percentageScore: number,             // Calculated: (score / maxScore) * 100
  
  // Attempt Metadata
  attemptNumber: number,               // Which attempt is this? (1, 2, 3...)
  attemptedAt: timestamp,              // When quiz was attempted
  completedAt: timestamp,              // When quiz was submitted/completed
  timeTaken: number,                   // Duration in milliseconds
  
  // Session Reference
  sessionId: string,                   // Reference to LearningSession this occurred in
  
  // Data Detail (v1: intentionally minimal)
  questionCount: number,               // Total questions in this quiz (metadata only)
  correctAnswerCount: number,          // How many answered correctly (derived from score if needed)
  
  // Notes (v1: optional, for future expansion)
  notes: string | null                 // User notes (if implemented later)
}
```

**Validation Rules**:
- `attemptId` must be non-empty UUID
- `score` and `maxScore` must be ≥ 0
- `percentageScore` must be 0-100
- `attemptNumber` ≥ 1
- `attemptedAt` ≤ `completedAt`
- `timeTaken` ≥ 0 (can be 0 if instant submission)
- `questionCount` ≥ 0
- `correctAnswerCount` ≤ `questionCount`

**Lifecycle**:
- Created when user submits a quiz attempt
- Immutable after creation (no updates to attempt records — new attempts are new records)
- Persists indefinitely
- Used for statistical calculations but never modified

---

### 4. LearningSession

**Purpose**: Represent a user's current or recent learning session.

**Storage Key**: `tracker:session:{sessionId}`

**Schema**:

```javascript
{
  // Identity
  sessionId: string,                   // UUID; generated per session
  deviceId: string,                    // Reference to UserProfile.deviceId
  
  // Session Duration
  startedAt: timestamp,                // When user first interacted
  lastActivityAt: timestamp,           // Last recorded activity (chapter view, quiz, etc.)
  
  // Session Activities
  chaptersAccessed: [                  // Which chapters accessed in this session
    {
      chapterId: string,
      accessedAt: timestamp,
      durationType: enum                // "brief" (< 2 min) | "moderate" (2-30 min) | "extended" (> 30 min)
    }
  ],
  quizzesAttempted: [                  // Quiz attempts in this session
    {
      attemptId: string,
      quizId: string,
      score: number,
      attemptedAt: timestamp
    }
  ],
  
  // Session Summary
  totalDuration: number,               // milliseconds (lastActivityAt - startedAt)
  totalActivities: number              // Count of chapter views + quiz attempts
}
```

**Validation Rules**:
- `sessionId` must be non-empty UUID
- `startedAt` ≤ `lastActivityAt`
- `totalDuration` ≥ 0
- `totalActivities` ≥ 0
- `chaptersAccessed` must not contain duplicates (by chapterId)

**Lifecycle**:
- Created on first user interaction
- Updated as activities occur
- Closed/archived when user leaves app (or after inactivity timeout for v2)
- Optional storage (can be cleared periodically if v2 implements session-based analytics)

---

### 5. WeakTopicTracking (Derived from QuizAttempt)

**Purpose**: Identify and surface topics where user consistently underperforms.

**Calculation** (not stored; derived on read):

```
For each quiz:
  1. Get all QuizAttempt records for this quizId
  2. Calculate average score across attempts
  3. Compare to UserProfile.averageQuizScore
  
If (quizAverage < userAverage):
  Add to UserProfile.weakTopics
```

**Display Example**:
```
Quiz: "Chapter2_Quiz" 
User's Score on This Quiz: 62%
User's Overall Average: 75%
Status: ⚠️ Below Average — Focus Learning on Chapter 2
```

**Update Trigger**: Recalculated whenever:
- New QuizAttempt record created
- UserProfile aggregates are refreshed
- User views statistics dashboard

---

## Data Size Estimation

### Per-User Storage

Assume typical user over 2-3 months of study:

| Entity | Example Count | Size Per Record | Total |
|--------|---------------|-----------------|-------|
| UserProfile | 1 | ~500 bytes | ~500 bytes |
| ChapterProgress | 6 chapters | ~300 bytes each | ~1.8 KB |
| QuizAttempt | 40-50 attempts | ~200 bytes each | ~9 KB |
| LearningSession | 20 sessions | ~400 bytes each | ~8 KB |
| **Total** | — | — | **~20 KB** |

**Conclusion**: Typical user data ~20-50 KB. Even after months/years, unlikely to exceed 500 KB. Well under 5-10 MB localStorage quota.

---

## Relationships

```
UserProfile
  ├── weakTopics[] → QuizAttempt records (via quizId)
  └── References ChapterProgress (implicit via derived stats)

ChapterProgress
  └── One per chapter; referenced by UserProfile statistics

QuizAttempt
  ├── One per attempt; many per quiz (quizId groups them)
  ├── References LearningSession (sessionId)
  └── Data feeds UserProfile aggregates

LearningSession
  ├── Contains references to ChapterProgress (via chaptersAccessed)
  └── Contains references to QuizAttempt (via quizzesAttempted)
```

---

## Migration & Versioning

### Schema Versioning

Add optional `version` field to UserProfile for future migrations:

```javascript
UserProfile {
  version: 1,  // Schema version; increment on breaking changes
  ...
}
```

For v1, no versioning needed. If major schema changes occur in v2+, implement migration logic to upgrade existing records.

---

## Implementation Considerations

### Indexes (if needed in future)

For fast lookups, consider these natural groupings:
- QuizAttempt by quizId (find all attempts of a quiz)
- ChapterProgress by chapterId (direct lookup)
- QuizAttempt by attemptedAt (for timeline/history views)

In v1, linear scan of relevant records is acceptable (few records).

### Concurrent Access Safety

With last-write-wins approach:
- No locking mechanism needed
- Latest localStorage.setItem() wins in multi-tab scenario
- Accept risk of losing recent data from one tab if both tabs update simultaneously

### Garbage Collection

For v1: No automatic cleanup. All records persisted indefinitely.

Future enhancement (v2): Implement optional archive/cleanup when approaching storage quota.

---

## Validation & Constraints Summary

| Constraint | Why | Implementation |
|-----------|-----|-----------------|
| No negative numbers | Invalid metrics | Always validate ≥ 0 |
| Timestamps monotonic | Logical correctness | Assert start ≤ end |
| Enum values strict | Type safety | Use constants, not strings |
| Unique IDs | Identify records | Use UUID generation |
| No orphaned records | Data integrity | Delete parent → delete children |

---

## Data Model Checklist

- [x] All entities have clear purpose and schema
- [x] Relationships documented
- [x] Validation rules specified
- [x] State transitions defined (where applicable)
- [x] Storage keys consistent and namespaced
- [x] Size estimates confirm localStorage quota adequacy
- [x] Migration strategy (deferred to v2)
- [x] Last-write-wins concurrency model documented
