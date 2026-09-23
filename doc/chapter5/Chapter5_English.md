# ISTQB CTFL v4.0.1 – Chapter 5: Managing the Test Activities

**Exam focus (335 minutes in syllabus):**  
Heavy on test planning content, entry/exit criteria, estimation (K3), prioritization (K3), risk (project vs product, risk level), metrics/reports, configuration management, and **writing a defect report (K3)**.

**Learning objectives:**
- FL-5.1.1 (K2) Purpose and content of a test plan  
- FL-5.1.2 (K1) Tester value in iteration and release planning  
- FL-5.1.3 (K2) Entry criteria vs exit criteria  
- FL-5.1.4 (K3) Estimation techniques for test effort  
- FL-5.1.5 (K3) Apply test case prioritization  
- FL-5.1.6 (K1) Test pyramid concepts  
- FL-5.1.7 (K2) Testing quadrants vs levels and types  
- FL-5.2.1 (K1) Risk level = likelihood × impact  
- FL-5.2.2 (K2) Project risks vs product risks  
- FL-5.2.3 (K2) How product risk analysis shapes thoroughness and scope  
- FL-5.2.4 (K2) Measures in response to product risks  
- FL-5.3.1 (K1) Metrics used in testing  
- FL-5.3.2 (K2) Purpose, content, audiences of test reports  
- FL-5.3.3 (K2) Communicating test status  
- FL-5.4.1 (K2) How configuration management supports testing  
- FL-5.5.1 (K3) Prepare a defect report  

**Keywords:** defect management, defect report, entry criteria, exit criteria, product risk, project risk, risk, risk analysis, risk assessment, risk control, risk identification, risk level, risk management, risk mitigation, risk monitoring, risk-based testing, test approach, test completion report, test control, test monitoring, test plan, test planning, test progress report, test pyramid, test strategy, testing quadrants  

---

## 5.1 Test Planning

### 5.1.1 Purpose and Content of a Test Plan (FL-5.1.1)

A **test plan** describes test objectives, resources, and processes for a test project.

**Purpose of a test plan:**
- Documents **means and schedule** for achieving test objectives  
- Helps ensure test activities meet established criteria  
- Communicates with team members and stakeholders  
- Shows adherence to **test policy** and **test strategy** (or explains deviations)  
- Forces thinking about risks, schedule, people, tools, cost, and effort  

**Typical content of a test plan:**
- Context of testing (scope, objectives, test basis)  
- Assumptions and constraints  
- Stakeholders (roles, responsibilities, training needs)  
- Communication (forms, frequency, templates)  
- Risk register (product risks, project risks)  
- **Test approach** (levels, types, techniques, deliverables, entry/exit criteria, independence, metrics, test data, environments, deviations from policy/strategy)  
- Budget and schedule  

More detail: ISO/IEC/IEEE 29119-3.

**Exam tip:** Distinguish **test policy** (organizational), **test strategy** (high-level approach), and **test plan** (project-specific plan implementing the strategy).

---

### 5.1.2 Tester’s Contribution to Iteration and Release Planning (FL-5.1.2)

In iterative SDLCs there are typically two planning horizons:

| Planning type | Focus | Tester contribution |
|---------------|--------|---------------------|
| **Release planning** | Whole release / product backlog | Testable user stories & acceptance criteria; project/quality risk analysis; estimate test effort across iterations; shape overall test approach |
| **Iteration planning** | Next iteration / sprint | Break down work; refine estimates; identify test tasks; clarify readiness (Definition of Ready) |

Testers add value by identifying testing effort and risks, feedback on **testability**, clarifying acceptance criteria, and participating in estimation.

---

### 5.1.3 Entry Criteria and Exit Criteria (FL-5.1.3)

| | **Entry criteria** | **Exit criteria** |
|--|--------------------|-------------------|
| Meaning | Conditions before testing **can start** (or a phase can start) | Conditions before testing is **considered complete** |
| Examples | Resources ready (people, tools, environments, data); testware available; initial quality (e.g. smoke tests passed) | Coverage targets met; unresolved defects within limits; planned tests executed; defects reported; regression automated |
| Agile names | Often **Definition of Ready** | Often **Definition of Done** |

**Important exam points:**
- Running out of **time or budget** can be a valid exit criterion if stakeholders accept the residual risk.  
- Entry/exit can apply to a **test level**, iteration, or whole project.  

---

### 5.1.4 Estimation Techniques (FL-5.1.4) — K3

Test effort estimation predicts work needed to meet test objectives. Estimates are based on assumptions and always have error. **Small tasks** are usually estimated more accurately than large ones → decompose large work.

**Four techniques in the syllabus:**

| Technique | Type | Idea |
|-----------|------|------|
| **Estimation based on ratios** | Metrics-based | Use historical ratios (e.g. development:test = 3:2). If dev effort = 600 person-days → test ≈ 400 |
| **Extrapolation** | Metrics-based | From effort already spent and progress so far, project remaining effort |
| **Wideband Delphi** | Expert-based | Experts estimate iteratively, discuss, re-estimate until consensus. **Planning Poker** is a variant |
| **Three-point estimation** | Expert-based | Optimistic (a), Most likely (m), Pessimistic (b). Often E = (a + 4m + b) / 6 |

**Exam tip:** Be ready to calculate a simple ratio-based or three-point estimate.

---

### 5.1.5 Test Case Prioritization (FL-5.1.5) — K3

Prioritize so important tests run earlier (limited time, risk focus, faster feedback).

**Common prioritization strategies:**
- **Risk-based** — higher product risk first  
- **Requirement / business importance**  
- **Coverage-based** (requirements, code, risks)  
- **Dependencies** (setup tests first)  
- **Frequency of use / critical paths**  
- **Complexity / defect history**  

**Exam tip:** Given a short scenario, pick which tests to run first and why (usually risk or business impact).

---

### 5.1.6 Test Pyramid (FL-5.1.6)

Concept: shape of the automated test suite.

| Layer | Typical tests | Relative quantity |
|-------|----------------|-------------------|
| **Top** | E2E / UI / system | Few (slow, brittle) |
| **Middle** | Integration / API | Medium |
| **Bottom** | Unit / component | Many (fast, stable) |

**Idea:** Prefer many fast low-level tests; fewer expensive high-level tests. Supports CI and fast feedback.

---

### 5.1.7 Testing Quadrants (FL-5.1.7)

Two axes:
- **Business-facing** vs **Technology-facing**  
- **Support the team** (guide development) vs **Critique the product** (evaluate the product)

| Quadrant | Facing | Purpose | Example tests |
|----------|--------|---------|----------------|
| **Q1** | Technology | Support the team | Component tests, component integration; often automated in CI |
| **Q2** | Business | Support the team | Functional tests, examples, user story tests, prototypes, API checks against acceptance criteria |
| **Q3** | Business | Critique the product | Exploratory, usability, UAT; often manual, user-oriented |
| **Q4** | Technology | Critique the product | Smoke, performance, security, other non-functional (except usability); often automated |

**Exam tip:** Map a given test type to the correct quadrant (e.g. performance → Q4; exploratory → Q3; unit → Q1).

---

## 5.2 Risk Management

**Risk-based testing:** select, prioritize, and manage test activities based on risk analysis and risk control.

Main activities:
1. **Risk analysis** = risk identification + risk assessment  
2. **Risk control** = risk mitigation + risk monitoring  

---

### 5.2.1 Risk Level (FL-5.2.1)

**Risk** = potential event/situation whose occurrence causes an adverse effect.

| Factor | Meaning |
|--------|---------|
| **Risk likelihood** | Probability of occurrence (between 0 and 1) |
| **Risk impact** | Consequences / harm if it occurs |
| **Risk level** | Measure combining likelihood and impact (often likelihood × impact) |

Higher risk level → more important to treat.

---

### 5.2.2 Project Risks vs Product Risks (FL-5.2.2)

| | **Project risk** | **Product risk** |
|--|------------------|------------------|
| About | Success of the **project** | Quality of the **product** |
| Examples | Schedule slip, skill shortage, tool delays, budget, environment not ready | Functional failure, performance, security, reliability, missing features |
| Testing link | May block or delay testing | Often addressed **by** testing (what/how much to test) |

**Exam tip:** “Testers leave the project” → project risk. “Payment fails under load” → product risk.

---

### 5.2.3 How Product Risk Analysis Influences Testing (FL-5.2.3)

Product risk analysis affects:
- **What** to test (scope)  
- **How thoroughly** to test (depth, techniques, coverage)  
- **Order** of testing (prioritization)  
- Allocation of **effort and skills**  

High-risk areas get more, earlier, and stronger testing.

---

### 5.2.4 Measures in Response to Product Risks (FL-5.2.4)

Response options include: mitigate by testing, accept, transfer, or contingency plan.

**Mitigation by testing (examples):**
- Assign testers with the right skills for the risk type  
- Increase **independence** of testing  
- Reviews and static analysis  
- Stronger techniques and higher coverage  
- Test types targeting affected quality characteristics  
- Dynamic testing including **regression**  

Risk **monitoring** checks that mitigation works and watches for new risks.

---

## 5.3 Test Monitoring, Test Control and Test Completion

| Activity | Role |
|----------|------|
| **Test monitoring** | Collect information; assess progress; check exit criteria (coverage of risks, requirements, acceptance criteria…) |
| **Test control** | Use monitoring data to issue **control directives** (corrective actions) |
| **Test completion** | At milestones: consolidate data, experience, testware; produce completion report |

**Examples of control directives:**
- Reprioritize tests when a risk becomes an issue  
- Re-check entry/exit after rework  
- Adjust schedule if environment is late  
- Add resources where needed  

---

### 5.3.1 Metrics Used in Testing (FL-5.3.1)

Common metrics:
- Test case progress (planned / executed / passed / failed / blocked)  
- Defect metrics (found, fixed, open, severity, density, detection rate)  
- Coverage (requirements, risks, code, acceptance criteria)  
- Schedule and cost vs plan  
- Pass/fail rates  

Metrics support monitoring, control, and reporting — they do not replace judgment.

---

### 5.3.2 Test Reports — Purpose, Content, Audience (FL-5.3.2)

| Report type | When | Purpose |
|-------------|------|---------|
| **Test progress report** | During testing | Status vs plan; support control decisions |
| **Test completion report** | End of level / project / milestone | Summarize outcomes, residual risks, recommendations |

Tailor **content and detail** to the **audience** (team vs management vs customer).

Typical content: progress, metrics, defects, risks, deviations, blockers, recommendations.

---

### 5.3.3 Communicating Test Status (FL-5.3.3)

- Dashboards and charts  
- Progress / completion reports  
- Stand-ups and review meetings  
- Defect and risk summaries  

Communication should be **timely, accurate, and audience-appropriate**.

---

## 5.4 Configuration Management (FL-5.4.1)

**Configuration management (CM)** identifies, controls, and tracks versions of work products.

**How CM supports testing:**
- Correct **versions** of code, testware, and documentation are used  
- Changes are controlled and known  
- **Traceability** between requirements, tests, builds, and results  
- Reproducible test environments and baselines  
- Ability to re-run tests against a known configuration  

Without CM, test results may be unreliable (“which build did we test?”).

---

## 5.5 Defect Management (FL-5.5.1) — K3

Defect management: log anomalies from discovery to closure, with classification rules. Apply a similar approach to static testing findings where appropriate.

**Objectives of a defect report:**
- Give fixers enough information to resolve the issue  
- Track work-product quality  
- Provide ideas to improve development and test processes  

### Typical content of a defect report (dynamic testing)

| Field | Why it matters |
|-------|----------------|
| Unique identifier | Tracking |
| Title / short summary | Quick understanding |
| Date, author, organization, role | Accountability |
| Test object and **environment** | Reproducibility |
| Context (test case, activity, phase, technique, data) | Analysis |
| Steps to reproduce + logs/screenshots | Fix and confirm |
| **Expected** vs **actual** results | Clarity |
| **Severity** (impact on stakeholders) | Quality impact |
| **Priority** to fix | Scheduling |
| Status (open, deferred, duplicate, fixed, retest, closed, rejected…) | Workflow |
| References (e.g. test case id) | Traceability |

**Exam tip (K3):** Given a scenario, choose which information must be in the defect report (especially steps, expected/actual, environment, severity/priority).

---

## Quick exam checklist – Chapter 5

| Topic | Remember |
|-------|----------|
| Test plan | Objectives, approach, entry/exit, risks, schedule, resources |
| Entry vs exit | Start conditions vs finish conditions; DoR / DoD in Agile |
| Estimation | Ratios, extrapolation, Wideband Delphi / Planning Poker, three-point |
| Prioritization | Risk and business impact first |
| Pyramid | Many unit, fewer E2E |
| Quadrants | Q1 unit/CI; Q2 story/acceptance; Q3 exploratory/UAT; Q4 performance/security |
| Risk level | Likelihood × impact |
| Project vs product risk | Project delivery vs product quality |
| Monitoring vs control | Collect data vs take corrective action |
| CM | Correct versions, traceability, reproducible baselines |
| Defect report | Steps, expected/actual, environment, severity, priority |

---

## Typical exam question patterns

1. What belongs in a test plan?  
2. Entry vs exit criterion — which is which?  
3. Calculate test effort from a dev:test ratio or three-point formula.  
4. Which tests to run first under time pressure?  
5. Place a test type in the correct testing quadrant.  
6. Project risk or product risk?  
7. How does high product risk change testing?  
8. Example of a control directive after monitoring.  
9. How does CM help testing?  
10. Which fields must a good defect report include?

---

## Study tips for Chapter 5

1. Practice **K3** items: estimation numbers, prioritization scenarios, defect report content.  
2. Memorize **entry vs exit** and Agile **DoR / DoD**.  
3. Drill **project vs product risk** with examples.  
4. Map tests to **pyramid** and **quadrants**.  
5. Know **progress report vs completion report**.  

**Related practice in this app**
- Chapter 5 quizzes (Quiz 1, 2, 3)  
- Mock exams (planning, risk, defect report questions)  
- Glossary tab for Chapter 5 keywords  
