# Research Phase: Learning Progress Tracker

**Date**: 2026-09-01 | **Feature**: Learning Progress Tracker

## Overview

This document consolidates research findings on technical choices and alternatives for the learning progress tracking feature. All major clarifications were resolved during the `/speckit-clarify` phase; this research validates those decisions with technical context.

---

## 1. Storage Technology: Browser localStorage

### Decision
Use **Browser localStorage API** for persistent client-side data storage.

### Rationale
- **Native to web browsers**: No external dependencies required; available across all target browsers (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+)
- **Sufficient capacity**: 5-10 MB per domain quota exceeds estimated requirements (<1 MB for typical user)
- **Simple API**: JSON serialization works directly with localStorage (getItem/setItem)
- **Offline-capable**: Data accessible even when offline; aligns with existing ISTQB app philosophy
- **No backend needed**: Keeps v1 simple, focused on client-side tracking

### Alternatives Considered
- **IndexedDB**: More complex API, unnecessary for v1 use case; localStorage sufficient
- **Session Storage**: Lost on browser close; insufficient for multi-session tracking requirement
- **Backend/Server Storage**: Adds infrastructure, authentication, sync complexity; out of scope for v1

### Implementation Notes
- Wrap localStorage in abstraction layer (`storage.js`) to handle quota overflow and missing localStorage gracefully
- Fall back to session-only mode if localStorage unavailable (FR-009)

---

## 2. Concurrency Strategy: Last-Write-Wins

### Decision
Accept **last-write-wins** behavior for multi-tab concurrent writes with no locking or merging.

### Rationale
- **Simplicity**: Avoids need for distributed locks or conflict resolution logic
- **User expectation**: Single user, likely single tab primary usage; multi-tab edge case acceptable with minor data loss
- **v1 scope appropriate**: Complexity of merging outweighs rare edge case benefit
- **Trade-off accepted**: User clarification explicitly approved this approach during `/speckit-clarify`

### Alternatives Considered
- **Pessimistic Locking**: Prevent concurrent writes; requires cross-tab communication (complex), impacts UX (queuing writes)
- **Conflict Merging**: Combine attempt records from both tabs; complex to implement, risk of duplicate counting
- **Timestamps + Resolution**: Keep entry with latest timestamp; effectively same as last-write-wins

### Implementation Notes
- No need for SharedWorker or broadcast channels in v1
- Document behavior explicitly in Help/FAQ
- Track this as improvement opportunity for v2 (if multi-device sync added)

---

## 3. Quiz Data Detail Level: Metadata Only (No Per-Question Tracking)

### Decision
Store only **quiz-level metadata** (quiz ID, score, attempt number, timestamp, time taken) in v1. Do NOT store per-question details.

### Rationale
- **Reduced storage footprint**: Keeps localStorage usage minimal, well under quota
- **User value captured**: Meets success criteria for identifying trends and weak topics (FR-013)
- **Scope alignment**: Per-question analysis can be added in v2 if needed
- **Performance**: Faster read/write with smaller records
- **User clarification approved**: Feature request explicitly asked to "focus learning more on incorrect topics" — achieved via weak-topic highlighting without per-question tracking

### Alternatives Considered
- **Full Question Tracking**: Store which questions answered correctly/incorrectly; adds ~3-5x storage overhead, enables detailed review but not needed for v1 MVP
- **Selective Tracking**: Store only incorrect question IDs; still adds storage, unnecessary for trend analysis

### Implementation Notes
- Include `quizId` field to link attempts to quiz content (allows later correlation with question data if added)
- Implement weak-topic identification by comparing quiz scores to overall average (FR-013)
- Document in `data-model.md` that QuizAttempt intentionally excludes per-question details

---

## 4. Chapter Completion: User-Driven Explicit Action

### Decision
Chapter completion is **user-driven via explicit "Mark Complete" button** (not automatic based on content consumption).

### Rationale
- **User control**: Gives users flexibility; they decide when they've truly "mastered" a chapter
- **Implementation simplicity**: No need to track reading progress (scroll position, time-on-page heuristics, etc.)
- **Accuracy**: Avoids false completions from accidental visits or quick chapter skims
- **Clarity**: Clear signal of intent vs. ambiguous consumption metrics
- **User clarification approved**: Explicitly chosen during `/speckit-clarify`

### Alternatives Considered
- **Automatic (content consumption)**: Auto-mark complete when user views all sections; risk of false positives, doesn't reflect actual learning
- **Hybrid (consumption + passage)**: Auto-mark after viewing + time threshold; adds complexity, still imperfect
- **Quiz-based**: Require passing related quiz to mark complete; couples chapters to quizzes, adds dependency

### Implementation Notes
- Provide clear "Mark Complete" button on each chapter page (FR-011)
- Require confirmation to prevent accidental clicks
- Store explicit completion action with timestamp in ChapterProgress
- Display completion status in progress indicators (FR-005)

---

## 5. Data Retention Policy: Indefinite Retention with Manual Clear

### Decision
**Retain all historical data indefinitely** in localStorage. Users can manually clear all data via settings page.

### Rationale
- **User value**: Historical data enables trend analysis and long-term progress tracking (valuable for exam prep over weeks/months)
- **Simple implementation**: No automatic expiration logic needed
- **User control**: Explicit clear action respects privacy and gives users control
- **Alignment with learning use case**: Unlike transactional data, learning history has lasting value
- **User clarification approved**: Explicitly chosen during `/speckit-clarify`

### Alternatives Considered
- **Auto-expire**: Delete records older than N days/months; removes user value, adds complexity
- **Quota-based cleanup**: Delete oldest records when storage full; risky (could lose important data), confusing to users
- **Archive mechanism**: Move old data out of localStorage; overkill for v1

### Implementation Notes
- Store all records with timestamps; enable filtering by date range if needed later
- Implement clear-all function with confirmation dialog (FR-008)
- Document manual clear process in Help; note that clear is irreversible
- Monitor storage usage per user (estimated <1 MB even with years of data)

---

## 6. Session Tracking: Lightweight Timestamp-Based

### Decision
Track **session boundaries using timestamps** without complex session lifecycle management.

### Rationale
- **Simplicity**: No session object management or expiration logic needed
- **Sufficient for analytics**: Can calculate session duration and activity from timestamps
- **Stateless approach**: Works with stateless localStorage model
- **v1 appropriate**: Detailed session behavior can be refined in v2 if needed

### Implementation Notes
- Store session start time with each LearningSession entry
- Calculate session duration from start time to last activity timestamp
- "Long session" handling (edge case): Account for idle periods by using last-activity timestamp, not just duration
- No forced session timeout for v1

---

## 7. UI/Presentation: Component-Based Modular Approach

### Decision
Implement progress tracking UI as **separate `learning-tracker` module** with pluggable components.

### Rationale
- **Maintainability**: Isolates tracking logic from chapter pages
- **Reusability**: Progress display components usable across multiple pages
- **Testability**: Easy to unit test components independently
- **Extensibility**: Easy to add new statistics/visualizations in future

### Module Structure
- `storage.js`: localStorage abstraction
- `models.js`: Data model classes
- `analytics.js`: Statistics and weak-topic calculations
- `ui.js`: UI components for progress display

### Implementation Notes
- Keep module interface simple and well-documented
- Each chapter page imports and calls tracker API
- Settings page displays storage usage and provides clear-data function

---

## Technical Dependencies Summary

| Dependency | Purpose | Rationale |
|----------|---------|-----------|
| Browser localStorage API | Persistent storage | Native, no external deps |
| Browser JSON API | Data serialization | Native, supports all data types needed |
| Native DOM APIs | UI updates | Already used in existing app |
| Modern JavaScript (ES6+) | Language | Already used in existing code |
| Jest (recommended) | Unit testing | Industry standard, minimal setup |
| Playwright/Cypress (optional) | E2E testing | Optional for integration testing |

---

## Risk Assessment & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| localStorage quota exceeded | Data loss on new attempts | Low (est. <1 MB usage) | Monitor storage usage; alert user at 80% quota |
| Multi-tab concurrent writes lose data | Silent data corruption | Medium (edge case) | Document last-write-wins behavior; consider v2 sync |
| Browser clears localStorage | User loses all progress | Low (user can prevent) | Provide clear warning before data clear action |
| Performance degradation with large dataset | Slow data retrieval | Very low (estimated <1000 records) | No special optimization needed for v1 |

---

## Open Questions (Deferred to Implementation)

1. **Exact UI layout**: How should progress indicators be styled? (Detailed mockup in tasks phase)
2. **Weak topic threshold**: Should "below average" calculation use mean, median, or percentile? (Decision in tasks phase)
3. **Session duration edge cases**: How to detect and handle idle periods? (Implement in tasks phase)

---

## Conclusion

All technical decisions are grounded in simplicity, user value, and v1 scope. No external dependencies required. localStorage is sufficient for estimated data volumes. The approach is pragmatic and can evolve to higher complexity if future versions require it.
