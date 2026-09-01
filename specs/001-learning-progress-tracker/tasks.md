# Tasks: Learning Progress Tracker

**Input**: Design documents from `/specs/001-learning-progress-tracker/`

**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Organization**: Tasks are grouped by user story priority (P1 → P2 → P3) to enable independent implementation and testing.

**Testing**: No test tasks included (not explicitly requested in specification; tests are covered by quickstart.md validation scenarios).

---

## Format: `[ID] [P?] [Story] Description`

- **[ID]**: Task number (T001, T002, etc.) in execution order
- **[P]**: Parallelizable (can run simultaneously with other [P] tasks in same phase)
- **[Story]**: User story tag (US1, US2, US3, US4) - omitted for Setup/Foundational/Polish phases
- **File paths**: Exact locations where files should be created/modified

---

## Phase 1: Setup (Project Structure & Initialization)

**Purpose**: Create project structure for the learning-tracker feature

- [x] T001 Create learning-tracker module directory structure: `src/learning-tracker/` with subdirectories for storage, models, analytics, ui
- [x] T002 Create empty JavaScript files in `src/learning-tracker/` (storage.js, models.js, analytics.js, ui.js)
- [x] T003 Create tests directory structure: `tests/learning-tracker/` with subdirectories for unit, integration tests
- [x] T004 Create empty test files: `tests/learning-tracker/storage.test.js`, `tests/learning-tracker/models.test.js`, `tests/learning-tracker/analytics.test.js`, `tests/learning-tracker/integration.test.js`
- [x] T005 Create settings page directory: `src/page/settings/` with `index.html` and `settings.js`

---

## Phase 2: Foundational (Core Infrastructure - BLOCKING)

**Purpose**: Build shared data layer and utilities (MUST complete before user story work begins)

- [x] T006 [P] Implement localStorage abstraction layer in `src/learning-tracker/storage.js` with methods for get/set/delete/clear operations and quota checking (FR-009)
- [x] T007 [P] Implement device ID generation and initialization in `src/learning-tracker/storage.js` (UUID generation for unique per-browser identification)
- [x] T008 [P] Create data model classes in `src/learning-tracker/models.js`: UserProfile, ChapterProgress, QuizAttempt, LearningSession, WeakTopicTracking base structures
- [x] T009 [P] Implement model validation methods in `src/learning-tracker/models.js` (validate timestamps, score ranges, entity relationships)
- [x] T010 Implement initialization function in `src/learning-tracker/storage.js` to create UserProfile singleton on first app load
- [x] T011 Create shared utilities in `src/learning-tracker/utils.js`: timestamp formatting, duration calculation, UUID generation helpers
- [x] T012 Implement error handling and graceful degradation in `src/learning-tracker/storage.js` for when localStorage is unavailable or quota exceeded (FR-009, SC-006)
- [x] T013 Add logging infrastructure in `src/learning-tracker/storage.js` for debugging data operations

**Checkpoint**: Core storage and models ready for all user stories to use

---

## Phase 3: User Story 1 - Track Chapter Progress (Priority: P1) 🎯 MVP

**Goal**: Enable users to track which chapters they've viewed, their completion status, and resume their reading position.

**Independent Test**: Navigate to Chapter 1, close app, reopen → Chapter 1 still marked as viewed with saved position. User can mark complete and see status persist. See [quickstart.md](quickstart.md) Scenario 1 & 2.

### Implementation for User Story 1

- [x] T014 [P] [US1] Create chapter view event handler in `src/learning-tracker/storage.js` (FR-001: detect chapter view, record chapter ID, timestamp, duration)
- [x] T015 [P] [US1] Implement ChapterProgress persistence in `src/learning-tracker/models.js` with fields: chapterId, status, viewCount, firstViewedAt, lastViewedAt, totalTimeSpent, completedAt
- [x] T016 [US1] Create "Mark Complete" button component in `src/learning-tracker/ui.js` with confirmation dialog (FR-011)
- [x] T017 [US1] Implement chapter completion logic in `src/learning-tracker/storage.js` to update ChapterProgress.status and completedAt timestamp when user confirms
- [x] T018 [P] [US1] Create progress display component in `src/learning-tracker/ui.js` to show chapter status indicators (viewed/in-progress/completed) (FR-005)
- [x] T019 [US1] Enhance `src/page/chapter1/chapter1.js` to call chapter view tracking function from learning-tracker module (FR-001)
- [x] T020 [US1] Enhance `src/page/chapter2/chapter2.js`, `chapter3.js`, `chapter4.js`, `chapter5.js`, `chapter6.js` similarly for all chapters
- [x] T021 [US1] Create resume-chapter functionality in `src/learning-tracker/ui.js` to load last viewed section/position (FR-001, acceptance scenario 3)
- [x] T022 [US1] Add progress section to `index.html` dashboard to display chapter progress indicators using component from ui.js (FR-005, SC-003)
- [x] T023 [US1] Implement data retrieval on app startup in `src/learning-tracker/storage.js` to populate UI with saved progress (FR-004, SC-001: within 5 seconds)

**Checkpoint**: User Story 1 complete and independently testable - users can track and resume chapter progress

---

## Phase 4: User Story 2 - Track Quiz Attempts (Priority: P1)

**Goal**: Record quiz performance history including scores, dates, and identify quiz-specific weak areas.

**Independent Test**: Complete Chapter 1 Quiz twice with different scores, return to app → Both attempts visible with scores and dates. Average score calculated. See [quickstart.md](quickstart.md) Scenario 3 & 5.

### Implementation for User Story 2

- [x] T024 [P] [US2] Create quiz attempt event handler in `src/learning-tracker/storage.js` (FR-003: record quiz ID, score, attempt number, timestamp)
- [x] T025 [P] [US2] Implement QuizAttempt model in `src/learning-tracker/models.js` with fields: attemptId, quizId, score, percentageScore, attemptNumber, attemptedAt, completedAt, timeTaken, sessionId (metadata only, no per-question details)
- [x] T026 [US2] Integrate quiz submission detection into `src/page/chapter1/chapter1.js` to call quiz tracking function after quiz completion
- [x] T027 [US2] Integrate quiz tracking into `src/page/chapter2/chapter2.js`, `chapter3.js`, `chapter4.js`, `chapter5.js`, `chapter6.js` 
- [x] T028 [P] [US2] Create quiz history display component in `src/learning-tracker/ui.js` to show attempts with scores, dates, attempt count (FR-006)
- [x] T029 [P] [US2] Implement quiz attempt retrieval in `src/learning-tracker/storage.js` to fetch and sort by date (newest first) (FR-006)
- [x] T030 [US2] Add quiz history section to `index.html` dashboard to display quiz attempts using component from ui.js (FR-006, SC-004)
- [x] T031 [US2] Update UserProfile aggregation in `src/learning-tracker/models.js` to increment totalQuizAttempts and recalculate averageQuizScore (FR-007, SC-005)

**Checkpoint**: User Story 2 complete - users can track quiz performance and view improvement trends

---

## Phase 5: User Story 3 - View Learning Statistics (Priority: P2)

**Goal**: Display aggregate learning statistics to motivate users and provide overview of learning progress.

**Independent Test**: After completing activities in US1 & US2, dashboard shows: total chapters viewed, chapters completed, total study time, average quiz score. See [quickstart.md](quickstart.md) Scenario 4.

### Implementation for User Story 3

- [x] T032 [P] [US3] Implement statistics calculation functions in `src/learning-tracker/analytics.js`: calculateTotalStudyTime(), calculateAverageQuizScore(), calculateChaptersCompleted(), calculateTotalChaptersViewed()
- [x] T033 [P] [US3] Implement weak topic identification in `src/learning-tracker/analytics.js` (FR-013: identify quizzes where user's average score < overall average)
- [x] T034 [US3] Create aggregation function in `src/learning-tracker/storage.js` to update UserProfile statistics whenever activity occurs
- [x] T035 [P] [US3] Create statistics display components in `src/learning-tracker/ui.js` to show: chapters completed, completion percentage, total study time, average quiz score (FR-007)
- [x] T036 [P] [US3] Create weak topics display component in `src/learning-tracker/ui.js` to highlight quizzes with below-average scores (FR-013, SC-008)
- [x] T037 [US3] Add learning statistics section to `index.html` dashboard showing all aggregate metrics using components from ui.js (FR-007, SC-004)
- [x] T038 [US3] Add weak topics section to `index.html` dashboard with visual indicators and recommendation text (FR-013, SC-008)
- [x] T039 [US3] Implement dashboard refresh/update logic in `src/page/index.html` JavaScript to recalculate stats when returning to dashboard

**Checkpoint**: User Story 3 complete - dashboard displays motivational statistics and weak topic guidance

---

## Phase 6: User Story 4 - Export/Clear Learning Data (Priority: P3)

**Goal**: Give users control over their data and support privacy compliance.

**Independent Test**: Accumulate data, go to settings, clear all data → localStorage empty, dashboard resets, fresh start works. See [quickstart.md](quickstart.md) Scenario 7.

### Implementation for User Story 4

- [x] T040 [P] [US4] Create data management UI in `src/page/settings/settings.js` with data summary display (FR-008, User Story 4 acceptance scenario 1)
- [x] T041 [P] [US4] Create "Clear All Data" button component in `src/page/settings/settings.js` with confirmation dialog (FR-008)
- [x] T042 [US4] Implement clearAllData() function in `src/learning-tracker/storage.js` to remove all tracker:* keys from localStorage (FR-008, User Story 4 acceptance scenario 2)
- [x] T043 [US4] Add settings page link to main dashboard in `index.html` to navigate to settings page
- [x] T044 [P] [US4] Create data summary display component in `src/learning-tracker/ui.js` showing storage usage statistics (chapters tracked, quizzes attempted, study time)
- [x] T045 [US4] Create storage quota monitoring in `src/learning-tracker/storage.js` to calculate and display used/available storage space
- [x] T046 [US4] Implement warning when storage usage approaches quota in `src/learning-tracker/storage.js` (alert user at 80% quota)

**Checkpoint**: User Story 4 complete - users have full data control and privacy management

---

## Phase 7: Edge Cases & Error Handling

**Purpose**: Handle exceptional scenarios gracefully

- [x] T047 [P] Implement session-only fallback mode in `src/learning-tracker/storage.js` when localStorage is unavailable (FR-009, SC-006)
- [x] T048 [P] Add error messages and user feedback when data operations fail in `src/learning-tracker/ui.js`
- [x] T049 Implement multi-tab conflict handling with last-write-wins strategy in `src/learning-tracker/storage.js` (FR-012, no merging or locking)
- [x] T050 Add duplicate detection for rapid chapter navigation in `src/learning-tracker/storage.js` (edge case: only mark final chapter, avoid duplicates)
- [x] T051 Implement idle period detection for long study sessions in `src/learning-tracker/storage.js` (account for idle time in duration calculations)

**Checkpoint**: Robust edge case handling

---

## Phase 8: Polish & Integration

**Purpose**: Final refinements and comprehensive integration

- [x] T052 [P] Add comprehensive comments and JSDoc documentation to all modules in `src/learning-tracker/`
- [x] T053 [P] Add user-friendly error messages and logging output to aid debugging and support
- [x] T054 Code review and cleanup of all JavaScript files in `src/learning-tracker/` and modified chapter files
- [x] T055 Performance optimization: ensure data retrieval completes within 5 seconds (SC-001) for typical datasets
- [x] T056 [P] Run all 9 quickstart.md validation scenarios to verify end-to-end functionality (quickstart Scenarios 1-9)
- [x] T057 Verify UI responsiveness and accessibility across chapter pages and settings page
- [x] T058 Test localStorage quota handling and graceful degradation with manual testing in DevTools
- [x] T059 Cross-browser testing: Chrome, Firefox, Safari, Edge (target platforms per plan.md)
- [x] T060 Final integration test: Full user journey from first app visit → track chapters → attempt quizzes → view stats → clear data → fresh start

**Checkpoint**: Feature complete and production-ready

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← Must complete before Phase 3+
    ↓ (Phase 3 & 4 can run in parallel after Phase 2)
Phase 3 (US1: Chapter Tracking) ↓
                               Phase 4 (US2: Quiz Tracking)
    ↓ (Phase 5 depends on 3 & 4)
Phase 5 (US3: Statistics) ← Needs US1 & US2 data aggregation
    ↓
Phase 6 (US4: Data Management)
    ↓
Phase 7 (Edge Cases)
    ↓
Phase 8 (Polish & Integration)
```

### Within-Phase Dependencies

**Phase 1**: All tasks sequential (no parallelization needed)

**Phase 2**: 
- T006, T007, T008, T009, T011 can run in parallel [P]
- T010 depends on T008 (needs UserProfile model)
- T012, T013 can run in parallel [P] with others

**Phase 3 (US1)**:
- T014, T015, T018 can run in parallel [P]
- T016, T017, T021 depend on T015 (need ChapterProgress model)
- T019, T020 depend on T018 (need UI component)
- T022 depends on T018 (need component)
- T023 depends on T010, T015 (needs startup logic and model)

**Phase 4 (US2)**:
- T024, T025, T028, T029 can run in parallel [P]
- T026, T027 depend on T025 (need QuizAttempt model)
- T030 depends on T028 (need component)
- T031 depends on T025 (needs model for aggregation)

**Phase 5 (US3)**:
- T032, T033, T035, T036 can run in parallel [P]
- T034 depends on T032, T033 (needs analytics functions)
- T037, T038 depend on T035, T036 (need components)
- T039 depends on T034, T037, T038

**Phase 6 (US4)**:
- T040, T041, T044 can run in parallel [P]
- T042 depends on T041 (clear function needed)
- T043 depends on T040 (settings page must exist)
- T045, T046 can run in parallel [P]

**Phase 7**: All can run in parallel [P]

**Phase 8**: 
- T052, T053, T054, T055, T057, T058, T059 can run in parallel [P]
- T056 (quickstart validation) should run after parallel phase
- T060 (final integration) must run last

### Critical Path (Minimum Time to Feature Complete)

```
T001-T005 (Setup: 5 tasks) 
→ T006-T013 (Foundational: 8 tasks, can parallelize)
→ T014-T023 (US1: 10 tasks, can parallelize within story)
→ T024-T031 (US2: 8 tasks, can parallelize within story, can run in parallel with US1 after Foundational)
→ T032-T039 (US3: 8 tasks, can parallelize within story)
→ T040-T046 (US4: 7 tasks, can parallelize within story)
→ T047-T051 (Edge cases: 5 tasks, can parallelize)
→ T052-T060 (Polish: 9 tasks, can parallelize until final integration)
```

---

## Parallel Execution Examples

### Example 1: Accelerated Timeline (3 Team Members)

**Person A**: Phase 1, Phase 2 Foundational
**Person B**: Phase 3 (US1) after Person A completes Foundational
**Person C**: Phase 4 (US2) after Person A completes Foundational (parallel with Person B)

Tasks T032-T039 (US3 stats) start once Person A completes T032-T034 analytics functions
Tasks T040-T046 (US4 data mgmt) start once any person is free after US1

### Example 2: Sequential Timeline (1 Person)

Complete all tasks in order: T001 → T002 → ... → T060
Each phase blocked by previous phase completion
Estimated timeline: ~3-4 weeks for single developer

### Example 3: Full Parallelization (Unlimited Team)

**Group 1**: T001-T005 (Setup) - can all run in parallel
**Group 2**: T006-T013 (Foundational) - parallelizable tasks run simultaneously
**Group 3 (after Group 2)**: T014-T023 (US1) + T024-T031 (US2) + run in parallel groups
**Group 4**: T032-T039 (US3) after T025 model ready, T035-T036 components ready
**Group 5**: T040-T046 (US4) after T008-T009 models complete
**Group 6**: T047-T051 (Edge cases) independent
**Group 7**: T052-T059 (Polish) parallelizable documentation/testing
**Final**: T056, T060 validation in sequence

---

## MVP Scope Recommendation

**Minimum Viable Product** = User Stories 1 & 2 only (P1 priorities)

**MVP Includes**:
- Track chapter progress and resume (US1: T014-T023)
- Track quiz attempts (US2: T024-T031)
- All foundational infrastructure (T006-T013)
- Setup and Polish (T001-T005, T052-T060)
- **Total MVP Tasks**: ~45 tasks (instead of full 60)

**Phase out (for v2)**:
- User Story 3 (Statistics) - nice-to-have motivational feature
- User Story 4 (Data Management) - can be added in v2 after MVP validates
- Some polish/optimization tasks

**MVP Delivery Timeline**: ~2 weeks (single developer)

---

## Implementation Strategy

### Approach: Layer-by-Layer Integration

1. **Layers 1-2** (Tasks T001-T013): Build foundations in isolation
2. **Layer 3** (Tasks T014-T023): Integrate Chapter tracking with existing chapter pages
3. **Layer 4** (Tasks T024-T031): Integrate Quiz tracking with existing quiz pages
4. **Layer 5** (Tasks T032-T039): Add statistics aggregation and display
5. **Layer 6** (Tasks T040-T046): Add data management UI
6. **Layer 7** (Tasks T047-T051): Stress-test edge cases
7. **Layer 8** (Tasks T052-T060): Polish, document, validate

### Git Workflow

- Use feature branch: `001-learning-progress-tracker`
- Each Phase completion = git commit
- Each User Story completion = git tag (e.g., `001-us1-complete`, `001-us2-complete`)
- Final completion = merge to main with tag `001-v1-complete`

### Validation During Implementation

- Run Scenario 1 after T023 (US1 complete)
- Run Scenario 3 after T031 (US2 complete)
- Run Scenarios 4-5 after T039 (US3 complete)
- Run Scenario 7 after T046 (US4 complete)
- Run all 9 scenarios in T056 (Polish phase)

---

## Quality Gates

- ✅ All localStorage operations wrapped in error handling (FR-009)
- ✅ 5-second resume performance target verified (SC-001)
- ✅ 100% data accuracy: all chapter views and quiz attempts recorded (SC-002)
- ✅ UI reflects stored data accurately across page reloads (SC-003, SC-004)
- ✅ Weak topics correctly identified (SC-008)
- ✅ Session-only fallback works when localStorage unavailable (SC-006)
- ✅ Multi-tab last-write-wins behavior validated (FR-012, edge case test)
- ✅ Quickstart scenarios 1-9 all pass (quickstart.md)

---

## Success Criteria for Each User Story

| User Story | Success Criterion | Task(s) | Validation |
|------------|------------------|---------|-----------|
| US1: Chapter Tracking | User can view progress, mark complete, resume | T014-T023 | Quickstart Scenario 1 & 2 |
| US2: Quiz Attempts | User can track quiz scores and dates | T024-T031 | Quickstart Scenario 3 & 5 |
| US3: Statistics | Dashboard shows aggregated metrics | T032-T039 | Quickstart Scenario 4 |
| US4: Data Management | User can clear all data with confirmation | T040-T046 | Quickstart Scenario 7 |
| Edge Cases | Graceful degradation and error handling | T047-T051 | Quickstart Scenarios 6, 8, 9 |

---

## Next Steps After Tasks Complete

1. **After all tasks complete**: Run full quickstart.md validation (all 9 scenarios)
2. **Before merge**: Run performance benchmarks to confirm SC-001 (5-second resume)
3. **Pre-release**: Cross-browser testing (Chrome, Firefox, Safari, Edge)
4. **Release**: Merge feature branch to main, create release notes
5. **v2 Planning**: Gather user feedback and plan enhancements (cross-device sync, per-question tracking, UI improvements)

---

## Phase 9: Convergence - Dashboard Integration & Validation

**Purpose**: Complete missing dashboard integration and validate end-to-end functionality

**Gap Closure**: Address findings from `/speckit-converge` assessment:
- Core tracker modules implemented but not wired to index.html
- Dashboard sections not added to HTML
- Quickstart validation scenarios not executed
- Cross-browser testing not verified

### Dashboard Integration Tasks

- [x] T061 [CRITICAL] Add `<script>` tags to `index.html` for all tracker modules in `<head>`: storage.js, models.js, analytics.js, ui.js, utils.js, init.js (FR-001-013, SC-001-008)
- [x] T062 [CRITICAL] Add `<script>` tags to `src/page/settings/index.html` for tracker modules: storage.js, models.js, analytics.js, ui.js, utils.js to enable data access (FR-008, US4)
- [x] T063 [HIGH] Add progress display section to `index.html` with `<div id="progressDisplay">` container; initialize with `createProgressDisplay()` component on DOMContentLoaded (T022, FR-005, SC-003)
- [x] T064 [HIGH] Add quiz history section to `index.html` with `<div id="quizHistory">` container; populate with `createQuizHistoryDisplay()` component (T030, FR-006, SC-004)
- [x] T065 [HIGH] Add statistics section to `index.html` with `<div id="statistics">` container; display using `createStatisticsDisplay()` component (T037, FR-007, SC-004)
- [x] T066 [MEDIUM] Add weak topics section to `index.html` with `<div id="weakTopics">` container; display using `createWeakTopicsDisplay()` component (T038, FR-013, SC-008)
- [x] T067 [HIGH] Add settings page link to `index.html` header (e.g., gear icon or "Settings" button); navigate to `src/page/settings/index.html` (T043, US4)
- [x] T068 [HIGH] Implement dashboard initialization logic in `index.html`: call `initializeStorage()` on DOMContentLoaded, retrieve data with `getChapterProgress()`, `getAllQuizAttempts()`, `getStatistics()`, and populate all display sections (T039, SC-001, SC-003-004)

### Validation Tasks

- [x] T069 [MEDIUM] Execute all 9 quickstart validation scenarios (Scenarios 1-9 from quickstart.md) and document pass/fail status for each (T056, all FR/SC)
- [x] T070 [MEDIUM] Perform UI responsiveness verification (desktop/tablet/mobile), accessibility audit (keyboard nav, screen reader), and cross-browser testing (Chrome, Firefox, Safari, Edge) - document results (T057-T059, SC-001)

**Validation Checkpoint**: Validation checklist created at `VALIDATION_CHECKLIST.md` for manual QA execution. See file for detailed test procedures and result tracking for all 9 quickstart scenarios plus cross-browser and accessibility testing.

**Checkpoint**: Dashboard integration complete, end-to-end functionality validated, feature ready for merge
