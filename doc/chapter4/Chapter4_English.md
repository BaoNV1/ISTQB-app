# ISTQB CTFL v4.0.1 – Chapter 4: Test Analysis and Design

## 4.1 Test Techniques Overview

Test techniques help derive test conditions and test cases systematically from the test basis (requirements, models, code, experience…).

There are three main categories:
- **Black-box** (specification-based)
- **White-box** (structure-based)
- **Experience-based**

---

## 4.2 Black-Box Test Techniques

### 4.2.1 Equivalence Partitioning (EP)
- Divides inputs/outputs into groups (partitions) where the system is expected to behave the same way for all values in a partition.
- Includes both **valid** and **invalid** partitions.
- Coverage: At least one value from each partition → 100% EP coverage.
- Formula: Coverage = (Number of partitions exercised / Total partitions) × 100%

### 4.2.2 Boundary Value Analysis (BVA)
- Focuses on the boundaries of ordered equivalence partitions (defects often occur at edges).
- Two variants in the syllabus:
  - **2-value BVA**: For each boundary → the boundary value + the closest neighbor in the adjacent partition.
  - **3-value BVA**: For each boundary value → the boundary + both neighbors (inside and outside).
- Always combine with Equivalence Partitioning.

### 4.2.3 Decision Table Testing
- Used when behavior depends on combinations of conditions (business rules).
- Structure: Conditions (True/False) + Actions.
- Each column represents one combination of conditions → one test case.
- Coverage: All feasible columns (rules) should be covered.
- Tables can be minimized by combining columns where some conditions do not affect the outcome.

### 4.2.4 State Transition Testing
- Models the system as states, events, transitions, and guards.
- Useful for event-driven or stateful systems (e.g., login, workflow, ATM).
- Coverage criteria (syllabus focuses on):
  - All states
  - All valid transitions
  - Invalid transitions (negative testing)
- Covering all transitions is stronger than covering only states.

---

## 4.3 White-Box Test Techniques

### 4.3.1 Statement Testing & Statement Coverage
- Goal: Execute every executable statement at least once.
- Coverage = (Number of executed statements / Total executable statements) × 100%

### 4.3.2 Branch Testing & Branch Coverage
- Goal: Execute every branch (True and False outcome of every decision) at least once.
- Branch coverage is stronger than statement coverage.
- 100% branch coverage guarantees 100% statement coverage (but not vice versa).

### 4.3.3 Value of White-box Testing
- Finds defects related to the control flow of the code.
- Complements black-box testing.
- High coverage does **not** guarantee that tests are correct or complete.

---

## 4.4 Experience-based Test Techniques

### 4.4.1 Error Guessing
- Uses the tester’s knowledge and experience to anticipate where defects are likely to occur.

### 4.4.2 Exploratory Testing
- Simultaneous learning, test design, and test execution.
- Often performed in time-boxed sessions with a charter.

### 4.4.3 Checklist-based Testing
- Uses a list of items/conditions that should be checked.
- Helps ensure consistency and coverage of important areas.

---

## 4.5 Collaboration-based Test Approaches

### 4.5.1 Collaborative User Story Writing
- User stories are written collaboratively by developers, testers, and business representatives.

### 4.5.2 Acceptance Criteria
- Define the conditions that a user story must satisfy to be accepted.
- Can be written in different formats (Given-When-Then, bullet points, etc.).

### 4.5.3 Acceptance Test-Driven Development (ATDD)
- The team collaboratively creates acceptance tests **before** implementation.
- These tests become executable examples of the expected behavior and serve as the definition of done.

---

**Study Tips for Chapter 4**
- Practice calculating number of test cases for EP + BVA.
- Practice reading decision tables and counting rules.
- Practice drawing simple state transition diagrams.
- Remember: Branch coverage > Statement coverage.