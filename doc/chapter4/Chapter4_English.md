# ISTQB CTFL v4.0.1 – Chapter 4: Test Analysis and Design

**Exam focus:** This chapter is heavily tested. Expect questions on:
- Calculating EP / BVA test values
- Reading decision tables and counting rules
- State transition coverage (states vs transitions)
- Statement vs branch coverage relationship
- Experience-based and collaboration-based approaches (ATDD)

---

## 4.1 Test Techniques Overview

**Purpose of test techniques:**  
Help systematically derive **test conditions** and **test cases** from the **test basis** (requirements, specifications, models, code, experience).

### Three main categories (memorize)

| Category | Also called | Based on | Typical techniques |
|----------|-------------|----------|--------------------|
| **Black-box** | Specification-based | External behavior / specification | EP, BVA, Decision tables, State transition |
| **White-box** | Structure-based | Internal structure (code) | Statement testing, Branch testing |
| **Experience-based** | — | Tester knowledge & experience | Error guessing, Exploratory, Checklist-based |

**Key exam points:**
- Techniques can be combined.
- Choice of technique depends on **context** (risk, documentation quality, time, skill).
- Black-box does **not** require knowledge of internal code structure.
- White-box **does** require access to the code / structure.

---

## 4.2 Black-Box Test Techniques

### 4.2.1 Equivalence Partitioning (EP)

**Idea:** Divide inputs (or outputs, or internal values) into **partitions** (groups) where the system is expected to behave the **same** for all values in that partition.

- Includes **valid** and **invalid** partitions.
- One representative value from each partition is usually enough for coverage.

**Coverage formula:**

EP Coverage (%) = (Number of partitions exercised ÷ Total partitions) × 100

**Example (exam-style):** Age field accepts 18–60 inclusive.

| Partition | Range | Type |
|-----------|-------|------|
| 1 | age < 18 | Invalid |
| 2 | 18 ≤ age ≤ 60 | Valid |
| 3 | age > 60 | Invalid |

→ **3 partitions** → at least **3 test values** for 100% EP coverage (e.g. 10, 30, 70).

**Exam tips:**
- Always consider **invalid** partitions unless the question says otherwise.
- Output partitions and internal partitions can also be used.
- EP alone does **not** specifically target boundary defects.

---

### 4.2.2 Boundary Value Analysis (BVA)

**Idea:** Defects often occur at the **edges** of ordered partitions. Test the boundary values.

BVA is almost always used **together with EP**.

#### 2-value BVA (syllabus)
For each identified boundary:
- the **boundary value** itself
- the **closest neighbor** that belongs to the **adjacent** partition

#### 3-value BVA (syllabus)
For each boundary value:
- the boundary value
- **one neighbor on the inside** of the partition
- **one neighbor on the outside** of the partition

**Example:** Valid range 18–60 (integers).

**2-value BVA** typically tests:  
`17, 18, 60, 61`  
(and often still pick a mid valid value if combining with EP).

**3-value BVA** typically tests:  
`17, 18, 19` and `59, 60, 61`.

**Coverage:**  
Number of boundary values exercised / total identified boundary values × 100%.

**Exam tips:**
- Know the difference between **2-value** and **3-value** BVA.
- Boundaries exist for **both valid and invalid** ordered partitions.
- For a simple min–max range, 2-value BVA focuses on min, min−1, max, max+1.
- BVA applies only to **ordered** partitions (numbers, dates, ordered lists…).

---

### 4.2.3 Decision Table Testing

**When to use:** Behavior depends on **combinations of conditions** (business rules, complex logic).

**Structure:**
- Rows for **conditions** (usually True/False)
- Rows for **actions** (what the system should do)
- Each **column** = one rule (one combination) → typically one test case

**Coverage:** All **feasible** columns (rules) should be covered.

**Collapsed / minimized tables:**  
Columns can be combined when a condition does not affect the outcome (shown as “–” or “N/A”). This reduces the number of test cases while keeping the same decision logic coverage.

**Exam tips:**
- Count the columns carefully — each column is usually one test.
- Watch for impossible combinations (those may be excluded).
- Decision tables are stronger than testing conditions independently when interactions matter.

---

### 4.2.4 State Transition Testing

**Model elements:**
- **States**
- **Events** (triggers)
- **Transitions**
- **Guards** / conditions (optional)
- **Actions** (optional)

Useful for: login flows, workflows, ATM, order status, device modes, etc.

**Typical coverage criteria (exam-relevant):**
1. Cover all **states**
2. Cover all **valid transitions**
3. Cover **invalid transitions** (negative tests — system should reject them)

**Strength:**  
Covering **all valid transitions** is **stronger** than covering only states.

**Exam tips:**
- Be able to read a simple state diagram and list required tests.
- “All transitions” > “all states”.
- Invalid transitions are important for robustness / negative testing.

---

## 4.3 White-Box Test Techniques

### 4.3.1 Statement Testing & Statement Coverage

**Goal:** Execute every **executable statement** at least once.

Statement Coverage (%) = (Executed statements ÷ Total executable statements) × 100

### 4.3.2 Branch Testing & Branch Coverage

**Goal:** Execute every **branch** (True and False outcome of every decision) at least once.

Branch Coverage (%) = (Executed branches ÷ Total branches) × 100

**Critical exam relationship:**
- **100% branch coverage → 100% statement coverage** (always true)
- **100% statement coverage → 100% branch coverage** (NOT always true)

Branch coverage is **stronger** than statement coverage.

**Value of white-box techniques:**
- Find defects related to control flow (missing paths, wrong conditions…).
- Complement black-box testing.
- High coverage does **not** mean tests are correct, complete, or that requirements are met.

**Exam tips:**
- “100% branch coverage guarantees 100% statement coverage” → **True**.
- “100% statement coverage guarantees all defects found” → **False**.
- White-box needs access to the code structure.

---

## 4.4 Experience-based Test Techniques

### 4.4.1 Error Guessing

- Uses the tester’s knowledge of **typical defects**, past failures, and weak areas.
- Often supported by defect taxonomies or checklists of common bugs.
- Complements systematic techniques; does not replace them.

### 4.4.2 Exploratory Testing

- **Simultaneous** learning, test design, and test execution.
- Usually done in **time-boxed** sessions guided by a **charter** (mission + scope).
- Highly adaptive; good when specifications are incomplete or time is limited.
- Can be documented with session notes / debriefs.

### 4.4.3 Checklist-based Testing

- Tester uses a **list of items / conditions** that should be verified.
- Improves consistency and helps cover known risk areas or quality characteristics.
- Checklists can be built from experience, standards, or past defects.

**Exam comparison:**

| Technique | Main basis | Structure level |
|-----------|------------|-----------------|
| Error guessing | Experience of defect locations | Low (ad-hoc list) |
| Exploratory | Learning + charter + time-box | Medium (session-based) |
| Checklist-based | Predefined checklist | Medium–High (repeatable list) |

---

## 4.5 Collaboration-based Test Approaches

### 4.5.1 Collaborative User Story Writing

User stories are written **together** by:
- Business representatives
- Developers
- Testers

Testers contribute by asking questions, clarifying ambiguity, and thinking about testability and acceptance.

### 4.5.2 Acceptance Criteria

- Conditions that a user story must satisfy to be accepted.
- Make the story **testable**.
- Formats: bullet lists, Given–When–Then (Gherkin), rules, examples.

### 4.5.3 Acceptance Test-Driven Development (ATDD)

**Core idea:**  
The team **collaboratively creates acceptance tests before implementation**.

- Tests act as **executable examples** of expected behavior.
- Support a shared understanding of “done”.
- Closely related to BDD-style examples and specification by example.

**Exam keywords for ATDD:**
- Collaborative
- **Before** coding
- Acceptance tests / examples
- Shared understanding / definition of done

**Related terms you may see:**
- BDD (Behavior-Driven Development)
- Specification by Example

---

## Quick Comparison Tables (Exam Cheat Sheet)

### Black-box vs White-box vs Experience-based

| Aspect | Black-box | White-box | Experience-based |
|--------|-----------|-----------|------------------|
| Basis | Specification / requirements | Code structure | Knowledge & experience |
| Needs code? | No | Yes | No |
| Typical goal | Behavior coverage | Structure coverage | Find likely defects / explore |

### Coverage strength

| Technique | Stronger than |
|-----------|----------------|
| Branch coverage | Statement coverage |
| All transitions (state) | All states only |
| Decision table (all rules) | Testing conditions in isolation |

---

## Typical Exam Question Patterns for Chapter 4

1. **EP count:** “How many partitions…?” → count valid + invalid.
2. **BVA values:** “Which set of values for 2-value / 3-value BVA?”
3. **Decision table:** “How many test cases from this table?”
4. **State model:** “Minimum tests to cover all transitions?”
5. **Coverage relationship:** “100% branch coverage implies…?”
6. **ATDD timing:** “When are acceptance tests written in ATDD?”
7. **Technique selection:** “Best technique for complex business rules?” → Decision table.
8. **Exploratory:** “Design and execution happen together” → Exploratory.

---

## Study Tips for the Exam

1. Practice **EP + BVA** number and value questions until automatic.
2. Draw simple **state diagrams** and list transitions.
3. Read small **decision tables** and count columns/rules.
4. Memorize: **Branch > Statement**; transitions > states.
5. Remember ATDD = acceptance tests **before** implementation, created **collaboratively**.
6. Do not confuse “high coverage” with “no defects left” or “requirements satisfied”.
7. Combine techniques in real scenarios; the exam often asks which technique is **most suitable**.

---

**Related practice in this app**
- Chapter 4 quizzes (Quiz 1, 2, 3)
- Mock Exam page → Focus Set 2 (Test Techniques)
- Full Practice Exam A & B (many Chapter 4-style questions)
