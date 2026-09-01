# Quickstart: Learning Progress Tracker Validation

**Date**: 2026-09-01 | **Feature**: Learning Progress Tracker

This guide provides runnable scenarios to validate that the learning progress tracker feature works end-to-end. No implementation details are included; focus is on demonstrating that requirements are met.

---

## Prerequisites

1. **Browser Requirements**:
   - Modern browser with localStorage enabled (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+)
   - JavaScript enabled
   - No browser extensions blocking localStorage

2. **Development Setup**:
   ```bash
   cd ISTQB-app
   python -m http.server 8000
   # Navigate to http://127.0.0.1:8000/index.html
   ```

3. **Clear Data Before Testing**:
   - Open browser DevTools (F12)
   - Application tab → Local Storage → Clear all
   - Or use the Settings/Data Management page (once implemented) → Clear All

---

## Scenario 1: Track Chapter Progress (P1)

**Objective**: Verify that viewing a chapter creates a progress record and displays progress indicator.

**Steps**:

1. **Initial State**:
   - Navigate to landing page (index.html)
   - Observe Chapter Progress section (not yet visible; will be added)

2. **View Chapter 1**:
   - Click "Chapter 1" on dashboard
   - Observe Chapter 1 page loads
   - Open DevTools → Application → Local Storage → Look for `tracker:chapter:chapter1` key
   - **Expected**: ChapterProgress record exists with:
     - `status: "viewed"`
     - `viewCount: 1`
     - `firstViewedAt` is recent timestamp
     - `lastViewedAt` is recent timestamp

3. **Return to Dashboard**:
   - Navigate back to index.html
   - Scroll to Progress section
   - **Expected**: 
     - Chapter 1 shows progress indicator (e.g., "1/6 Chapters Viewed")
     - Chapter 1 has visual marker (checkmark or "In Progress" status)

4. **Resume Chapter**:
   - Click Chapter 1 link again
   - **Expected**:
     - Chapter page loads (demonstrates data was persisted)
     - Page offers "Resume reading" option or opens at last section
     - `lastViewedAt` timestamp updated in localStorage

**Acceptance**: ✅ Chapter views tracked, persisted, and displayed accurately

---

## Scenario 2: Mark Chapter Complete (P1)

**Objective**: Verify that user can explicitly mark a chapter complete and status is persisted.

**Steps**:

1. **Before Completion**:
   - Viewing Chapter 1 (from Scenario 1)
   - DevTools → localStorage → Review `tracker:chapter:chapter1`
   - **Observe**: `status: "viewed"`, `completedAt: null`

2. **Mark Chapter Complete**:
   - Locate "Mark Complete" button on Chapter 1 page
   - Click "Mark Complete"
   - Observe confirmation dialog: "Are you sure you want to mark this chapter complete?"
   - Confirm yes

3. **After Completion**:
   - Page displays success message or indicator
   - DevTools → localStorage → Review `tracker:chapter:chapter1`
   - **Expected**: 
     - `status: "completed"`
     - `completedAt` is recent timestamp
     - `totalTimeSpent` is calculated duration

4. **Return to Dashboard**:
   - Navigate back to index.html
   - Progress section shows:
     - Chapter 1 marked with checkmark or "Completed" badge
     - Completion percentage updated (e.g., "1/6 Chapters Completed")

5. **Verify Persistence**:
   - Close browser tab
   - Close browser completely
   - Clear browser cache (to test fresh session)
   - Reopen http://127.0.0.1:8000/index.html
   - **Expected**: Chapter 1 still shows as "Completed" with timestamp preserved

**Acceptance**: ✅ Chapter completion is user-driven, persistent across sessions, and accurately displayed

---

## Scenario 3: Track Quiz Attempts (P1)

**Objective**: Verify that quiz attempts are recorded with score, date, and attempt count.

**Steps**:

1. **Initial State**:
   - Navigate to Chapter 1
   - Open Chapter 1 Quiz
   - DevTools → localStorage → Search for `tracker:quiz-attempt:*` keys
   - **Expected**: No quiz attempt records yet

2. **Attempt Quiz**:
   - Complete Chapter 1 Quiz with arbitrary answers
   - Submit quiz
   - Observe result score displayed

3. **Verify Record Created**:
   - DevTools → localStorage → Examine new `tracker:quiz-attempt:*` record
   - **Expected** fields:
     - `quizId: "Chapter1_Quiz"` (or equivalent)
     - `score: <points earned>` (e.g., 75)
     - `percentageScore: 75`
     - `attemptNumber: 1`
     - `attemptedAt` is recent timestamp
     - `timeTaken` is reasonable duration (>0)

4. **View Quiz History**:
   - Navigate to dashboard
   - Scroll to Quiz Performance section (or dedicated Quiz History page)
   - **Expected**: 
     - Chapter 1 Quiz entry shows with score and date
     - Date format: Human-readable (e.g., "Sep 1, 2026 at 3:45 PM")
     - Link or button to "View All Attempts"

5. **Attempt Quiz Again**:
   - Click Chapter 1 Quiz again
   - Complete with different answers
   - Submit with (hopefully) different score

6. **Verify Multiple Attempts**:
   - DevTools → localStorage → Find all `tracker:quiz-attempt:*` with `quizId: "Chapter1_Quiz"`
   - **Expected**:
     - Two records exist
     - Both have `quizId: "Chapter1_Quiz"`
     - `attemptNumber: 1` and `attemptNumber: 2` respectively
     - Timestamps ordered (first attempt < second attempt)

7. **View Quiz History**:
   - Dashboard → Quiz Performance section
   - **Expected**:
     - Both attempts visible
     - Listed newest first (second attempt before first)
     - Both scores displayed with dates

**Acceptance**: ✅ Quiz attempts recorded with correct metadata; multiple attempts tracked independently

---

## Scenario 4: View Learning Statistics (P2)

**Objective**: Verify that dashboard displays aggregate statistics accurately.

**Steps**:

1. **Setup State** (complete several activities):
   - Mark 2-3 chapters complete (e.g., Chapters 1, 2, 3)
   - Attempt 5-6 quizzes with varying scores
   - DevTools → localStorage → Review:
     - `tracker:profile` for aggregates
     - Multiple `tracker:chapter:*` and `tracker:quiz-attempt:*` records

2. **View Dashboard Statistics**:
   - Navigate to dashboard
   - Scroll to Learning Statistics section
   - **Expected displays**:
     - Total Chapters Viewed: `N` (chapters with any viewing)
     - Chapters Completed: `M` out of 6
     - Overall Progress: `M/6` or `(M/6)*100%`
     - Total Study Time: Human-readable (e.g., "2 hours 15 minutes")
     - Average Quiz Score: `X%` (mean of all attempts)

3. **Accuracy Verification**:
   - Manually count completed chapters in localStorage
   - Verify displayed count matches
   - Manually calculate total study time from all `totalTimeSpent` fields
   - Verify displayed time matches (allow ±1 minute margin for ongoing sessions)

4. **Improvement Trend**:
   - Check if UI shows quiz score progression (e.g., chart or list)
   - **Expected**: Can see if scores improving/declining over multiple attempts

**Acceptance**: ✅ Statistics calculated accurately and displayed clearly

---

## Scenario 5: Weak Topic Highlighting (P1 + P2)

**Objective**: Verify that quizzes with below-average scores are identified and highlighted.

**Steps**:

1. **Create Mixed Performance**:
   - Attempt Chapter 1 Quiz 3 times: scores 70%, 72%, 75% (average: 72%)
   - Attempt Chapter 2 Quiz 2 times: scores 85%, 88% (average: 86%)
   - Attempt Chapter 3 Quiz 2 times: scores 60%, 65% (average: 62%)
   - (User's overall average: ~73%)

2. **Check Weak Topics Calculation**:
   - DevTools → localStorage → Review `tracker:profile.weakTopics`
   - **Expected array should include**:
     - Chapter 3 Quiz (62% < 73% user average) ✓
     - Might include Chapter 1 Quiz (72% < 73%) if strictly defined
     - Should NOT include Chapter 2 Quiz (86% > 73%)

3. **View Weak Topics on Dashboard**:
   - Dashboard → Learning Statistics section
   - Look for "Weak Topics" or "Focus Learning" section
   - **Expected**:
     - Lists quizzes where user underperforms
     - Shows user's average score on that quiz
     - Shows comparison to overall average
     - Suggests focusing on Chapter 2 or 3 content

4. **Interaction**:
   - Click on weak topic entry
   - **Expected**: Navigates to that chapter or quiz with encouragement

**Acceptance**: ✅ Weak topics correctly identified; users guided to focus areas

---

## Scenario 6: Handle Missing localStorage (P1 - Edge Case)

**Objective**: Verify system gracefully handles when localStorage is unavailable.

**Steps**:

1. **Disable localStorage**:
   - DevTools → Console
   - Run: 
   ```javascript
   Object.defineProperty(window, 'localStorage', {
     get: function() { throw new Error('localStorage disabled'); }
   });
   ```

2. **Attempt Activities**:
   - View Chapter 1
   - Try to view progress dashboard
   - Attempt a quiz

3. **Expected Behavior**:
   - No JavaScript errors in console
   - Chapter/quiz pages still load and function normally
   - Dashboard displays message: "Progress tracking unavailable (localStorage disabled). Data will not be saved between sessions."
   - User can still use app (session-only mode)

4. **Verify No Data Persists**:
   - Refresh page
   - Progress should be cleared (no persistence)
   - Dashboard resets

**Acceptance**: ✅ Graceful degradation without crashes; session-only mode works

---

## Scenario 7: Clear All Data (P3)

**Objective**: Verify user can clear all stored data with appropriate warnings.

**Steps**:

1. **Accumulate Data**:
   - Complete activities as in Scenario 5
   - DevTools → localStorage → Verify multiple `tracker:*` keys exist

2. **Navigate to Settings**:
   - Dashboard → Settings (or gear icon)
   - Scroll to "Data Management" section

3. **Initiate Clear**:
   - Click "Clear All Learning Data" button
   - Observe warning dialog:
     ```
     ⚠️ WARNING: This action is irreversible.
     You will lose all learning progress data.
     
     [Cancel] [Confirm Clear All]
     ```
   - Click "Confirm Clear All"

4. **Verify Data Cleared**:
   - DevTools → localStorage → No `tracker:*` keys remain
   - Dashboard → Progress section empty/reset
   - All statistics show zero

5. **Fresh Start**:
   - View Chapter 1 again
   - Dashboard shows fresh start (1 chapter viewed, 0 completed)

**Acceptance**: ✅ User can completely reset progress with appropriate warnings

---

## Scenario 8: Multi-Tab Concurrent Access (Edge Case)

**Objective**: Verify last-write-wins behavior for concurrent updates.

**Steps**:

1. **Setup**:
   - Open ISTQB app in Tab A
   - Open same app in Tab B (same browser)
   - View Chapter 1 in both tabs

2. **Simultaneous Quiz Attempts**:
   - **Tab A**: Attempt Chapter 1 Quiz, score 70%, submit
   - **Tab B**: Attempt Chapter 1 Quiz, score 85%, submit (within 1-2 seconds)

3. **Check Storage**:
   - DevTools → localStorage → Review `tracker:quiz-attempt:*` records
   - **Expected**: 
     - Two records exist OR one record (last-write-wins overwrites)
     - If two exist: both visible in history
     - If one exists: Most recent attempt (Tab B's 85%) persists
     - Behavior is documented (not an error)

4. **Dashboard Display**:
   - Reload both tabs
   - Verify dashboard shows consistent data (no crashes)
   - Stats reflect whichever write persisted

**Acceptance**: ✅ No data corruption; graceful last-write-wins behavior

---

## Scenario 9: Performance Target: 5-Second Resume (P1)

**Objective**: Verify users can resume learning within 5 seconds.

**Steps**:

1. **Accumulate Data**:
   - Complete activities across multiple chapters and quizzes
   - DevTools → localStorage → Verify 20+ KB of data

2. **Measure Resume Time**:
   - Close browser tab
   - Record current time
   - Reopen http://127.0.0.1:8000/index.html
   - Record time when dashboard fully loaded with all progress data displayed
   - **Expected**: Time elapsed < 5 seconds

3. **Repeat Test**:
   - Test 3 times (warm cache, cold cache, etc.)
   - All should complete in <5 seconds

**Acceptance**: ✅ Resume performance meets requirement (SC-001)

---

## Summary Checklist

| Scenario | Requirement(s) | Status |
|----------|----------------|--------|
| 1: Track Chapter Progress | FR-001, FR-002, FR-005, SC-003 | ⬜ |
| 2: Mark Chapter Complete | FR-011, SC-003 | ⬜ |
| 3: Track Quiz Attempts | FR-003, FR-006, SC-002 | ⬜ |
| 4: View Statistics | FR-007, SC-004 | ⬜ |
| 5: Weak Topic Highlight | FR-013, SC-008 | ⬜ |
| 6: Handle Missing localStorage | FR-009, SC-006 | ⬜ |
| 7: Clear Data | FR-008 | ⬜ |
| 8: Multi-Tab Concurrent | FR-012 | ⬜ |
| 9: Performance Target | SC-001 | ⬜ |

**Validation Complete When**: All scenarios pass ✅

---

## Debugging Tips

- **View all localStorage data**: DevTools → Application → Local Storage → http://127.0.0.1:8000
- **Clear and restart**: `localStorage.clear()` in DevTools Console
- **Manual record inspection**: 
  ```javascript
  const profile = JSON.parse(localStorage.getItem('tracker:profile'));
  console.log(profile);
  ```
- **Timestamp conversion**: 
  ```javascript
  const ts = 1693521600000;
  new Date(ts).toLocaleString();
  ```
