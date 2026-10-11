# ISTQB CTFL v4.0.1 – Chapter 2: Testing Throughout the SDLC

**Exam focus:** Impact of SDLC on testing, good practices for all models, TDD/ATDD/BDD, DevOps impact, shift-left, retrospectives, test levels, test types, confirmation vs regression, maintenance testing.

**Learning objectives:**
- FL-2.1.1 (K2) Explain impact of the chosen SDLC on testing  
- FL-2.1.2 (K1) Recall good testing practices for all SDLCs  
- FL-2.1.3 (K1) Recall examples of test-first approaches  
- FL-2.1.4 (K2) Summarize how DevOps may impact testing  
- FL-2.1.5 (K2) Explain shift-left  
- FL-2.1.6 (K2) Explain retrospectives for process improvement  
- FL-2.2.1 (K2) Distinguish different test levels  
- FL-2.2.2 (K2) Distinguish different test types  
- FL-2.2.3 (K2) Distinguish confirmation testing from regression testing  
- FL-2.3.1 (K2) Summarize maintenance testing and its triggers  

---

## 2.1 Testing in the Context of an SDLC

### 2.1.1 Impact of the SDLC on testing (FL-2.1.1)

The chosen model affects:
- Scope and **timing** of test activities (levels and types)  
- Level of detail of test documentation  
- Selection of techniques and approaches  
- Degree of **test automation**  
- Roles and responsibilities of testers  

### 2.1.2 Good testing practices for all SDLCs (FL-2.1.2)

| Practice | Meaning |
|----------|---------|
| Corresponding test activity | For every development activity there is a related testing activity |
| Distinct level objectives | Each test level has specific objectives (avoid useless overlap) |
| Early test analysis/design | Analysis and design start during the corresponding development phase |
| Early involvement | Testers review work products as early as possible |

**Exam tip:** The rule “for every SDLC activity there is a corresponding test activity” holds for **sequential, incremental, and iterative** models.

### 2.1.3 Test-first approaches (FL-2.1.3)

| Approach | Idea |
|----------|------|
| **TDD** | Write a failing automated **component** test → minimal code to pass → refactor |
| **ATDD** | Create tests from **acceptance criteria** to drive development of the related software |
| **BDD** | Describe desired **behavior** (often Given–When–Then) so the team shares understanding |

**Exam tip:** ATDD = tests from acceptance criteria drive development. Given/When/Then is more typical of **BDD**.

### 2.1.4 DevOps and testing (FL-2.1.4)

DevOps emphasizes CI/CD and collaboration.

**Impacts / benefits for testing:**
- Fast feedback on quality and regressions  
- Supports **shift-left**  
- Encourages high-quality code via component tests and static analysis  
- More attention to non-functional quality  
- Less repetitive manual testing through automation  

### 2.1.5 Shift-left (FL-2.1.5)

**Shift-left** = perform testing activities **earlier** in the SDLC.

Examples:
- Review requirements before formal acceptance  
- Write component tests before code (TDD)  
- Perform some non-functional tests early (e.g. performance of a component)  

**Not** shift-left: writing test scripts before configuration management exists (scripts should be under CM).

Shift-left does **not** mean later testing can be skipped.

### 2.1.6 Retrospectives (FL-2.1.6)

Retrospectives identify **process** strengths and weaknesses and feed continuous improvement.

**Exam tip:** Best argument for retrospectives: process issues found become a to-do list for improvement — not mainly about pleasing clients or collecting end-user product feedback in that meeting.

---

## 2.2 Test Levels and Test Types

### 2.2.1 Test levels (FL-2.2.1)

| Level | Typical focus / failures found |
|-------|--------------------------------|
| **Component (unit)** | Logic in the code; individual components in isolation |
| **Component integration** | Interfaces and communication between components |
| **System** | End-to-end system behavior; business rules implemented in the system |
| **Acceptance** | Whether the system meets user/business needs |

**Exam tip – match failure type to level:**
- Failures in code logic → component  
- Failures in communication between components → component integration  
- Incorrectly implemented business rules → system  
- System does not meet user business needs → acceptance  

### 2.2.2 Test types (FL-2.2.2)

| Type | Purpose |
|------|---------|
| **Functional** | What the system does (functions, features) |
| **Non-functional** | How the system behaves (performance, security, usability…) |
| **White-box** | Based on internal structure (code, architecture) |
| **Black-box** | Based on external behavior / specification |
| **Related to changes** | Confirmation and regression (see below) |

Test types can be applied at **any** test level.

### 2.2.3 Confirmation vs regression (FL-2.2.3)

| | **Confirmation (re-testing)** | **Regression** |
|--|------------------------------|----------------|
| Purpose | Verify that a **specific defect fix** worked | Check that changes did **not break** existing functionality |
| Scope | Focused on the fixed defect / related tests | Broader suite of previously passing tests |
| When | After a fix is delivered | After any change (fix, new feature, environment…) |

**Exam tip:** After defects are fixed and a new build arrives, re-running previously failed tests that should now pass is confirmation; re-running previously passed tests to ensure nothing broke is regression.

---

## 2.3 Maintenance Testing (FL-2.3.1)

**Maintenance testing** is testing changes to an operational system (or during retirement).

**Typical triggers:**
- Modifications (enhancements, corrective fixes, hotfixes)  
- Migration (platform, environment, data)  
- Retirement (archive, data migration, replace system)  

Often includes impact analysis and a strong **regression** suite.

---

## Quick exam checklist – Chapter 2

| Topic | Remember |
|-------|----------|
| All SDLCs | Corresponding test activity for every development activity |
| ATDD | Tests from acceptance criteria drive development |
| TDD | Failing component test first, then code |
| BDD | Behavior / Given-When-Then shared understanding |
| Shift-left | Test earlier (reviews, TDD, early non-functional) — not skip later tests |
| Retrospectives | Process improvement, not mainly client marketing |
| Levels | Component → integration → system → acceptance |
| Confirmation | Fix works |
| Regression | Nothing else broke |
| Maintenance triggers | Modification, migration, retirement |

**Related practice:** Chapter 2 Quiz 1–3, mock exams.
