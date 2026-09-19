# ISTQB CTFL v4.0.1 – Chapter 3: Static Testing

**Exam focus (80 minutes in syllabus):**  
Expect questions on work products for static testing, value of static testing, static vs dynamic, review process steps, roles, review types (informal / walkthrough / technical review / inspection), and success factors.

**Learning objectives to cover:**
- FL-3.1.1 (K1) Recognize work products examinable by static testing  
- FL-3.1.2 (K2) Explain the value of static testing  
- FL-3.1.3 (K2) Compare static testing and dynamic testing  
- FL-3.2.1 (K1) Benefits of early and frequent stakeholder feedback  
- FL-3.2.2 (K2) Summarize review process activities  
- FL-3.2.3 (K1) Roles and responsibilities in reviews  
- FL-3.2.4 (K2) Compare review types  
- FL-3.2.5 (K1) Success factors for reviews  

**Keywords:** anomaly, dynamic testing, formal review, informal review, inspection, review, static analysis, static testing, technical review, walkthrough  

---

## 3.1 Static Testing Basics

### What is static testing?

In **static testing**, the software under test does **not** need to be executed.

Work products are evaluated by:
- **Manual examination** (e.g. reviews)
- **Tools** (e.g. static analysis)

**Typical objectives:** improve quality, detect defects, assess characteristics such as readability, completeness, correctness, testability, and consistency.

Static testing supports both **verification** and **validation**.

In agile contexts, testers, business representatives (e.g. Product Owner, business analyst), and developers collaborate in example mapping, collaborative user story writing, and backlog refinement so that user stories meet criteria such as **Definition of Ready**. Review techniques help ensure stories are complete, understandable, and include **testable acceptance criteria**.

**Static analysis** can find problems before dynamic testing, often with less effort (no test cases required; tools are typical). It is often built into **CI** pipelines. Besides code defects, static analysis can assess **maintainability** and **security**. Spelling and readability tools are also forms of static analysis.

---

### 3.1.1 Work Products Examinable by Static Testing (FL-3.1.1)

Almost any work product can be examined statically. Examples:

- Requirements specification documents  
- Source code  
- Test plans and test cases  
- Product backlog items / user stories  
- Test charters  
- Project documentation  
- Contracts  
- Models  

**Reviews:** any work product that people can read and understand.  
**Static analysis:** needs structure that tools can check (e.g. code, models, formal syntax).

**Not suitable examples:** items hard for humans to interpret or that must not be analyzed by tools (e.g. some third-party executable code for legal reasons).

**Exam tip:** If the question lists “requirements, design, code, test cases” → static testing applies. If it requires **running** the system → dynamic testing.

---

### 3.1.2 Value of Static Testing (FL-3.1.2)

| Value | Explanation |
|-------|-------------|
| Early defect detection | Supports the principle of **early testing**; defects found when cheaper to fix |
| Defects dynamic testing may miss | e.g. unreachable code, wrong design patterns, defects in **non-executable** work products |
| Quality & confidence | Evaluates quality of work products and builds confidence |
| Shared understanding | Stakeholders verify that documented requirements match real needs |
| Better communication | Involving a wide mix of stakeholders improves communication |
| Lower overall cost | Reviews cost effort up front but usually reduce later rework and total project cost |
| Efficient code checks | Some code defects are found more efficiently by static analysis than by dynamic testing |

**Exam tip:** “Finds defects that dynamic testing cannot find” and “cheaper when found early” are high-frequency ideas.

---

### 3.1.3 Static Testing vs Dynamic Testing (FL-3.1.3)

Both practices **complement** each other and share goals such as finding defects, but they differ:

| Aspect | Static testing | Dynamic testing |
|--------|----------------|-----------------|
| Execution | Software is **not** executed | Software **is** executed |
| How defects appear | Finds **defects directly** | Causes **failures**; defects found by analysis afterward |
| Work products | Executable **and** non-executable (requirements, docs, models…) | Focus on executable software |
| Typical findings | Missing requirements, design flaws, standards violations, unreachable code | Functional failures, crashes, performance issues |
| Techniques | Reviews, static analysis | Running test cases |
| When | Can start **very early** (even before code exists) | Needs code (or a runnable build) |

**Important exam contrasts:**
- Static → defect **directly**; dynamic → **failure** first, then defect analysis  
- Some defects only static can find; some only dynamic can find  
- Static is strong on rarely executed / hard-to-reach paths and on documents  

---

## 3.2 Feedback and Review Process

### 3.2.1 Benefits of Early and Frequent Stakeholder Feedback (FL-3.2.1)

- Detects misunderstandings **early**  
- Improves product quality  
- Increases stakeholder involvement and ownership  
- Reduces costly rework later  
- Builds shared understanding of needs and of the work product  

**Exam tip:** Link this to early testing and to collaboration on user stories / acceptance criteria.

---

### 3.2.2 Review Process Activities (FL-3.2.2)

Typical **generic review process** (syllabus):

1. **Planning**  
   Define scope, purpose, work product, roles, entry/exit criteria, effort, and timeframes.

2. **Review initiation (kick-off)**  
   Ensure everyone is prepared: access to the work product, clear roles, and needed materials.

3. **Individual review (preparation)**  
   Each reviewer assesses quality and logs anomalies, recommendations, and questions (e.g. checklist-based or scenario-based reviewing).

4. **Communication and analysis**  
   Anomalies are **not** automatically defects. Discuss and decide status, ownership, and actions. Often done in a review meeting; may assess quality level and need for follow-up.

5. **Fixing and reporting**  
   Create defect reports for real defects; track corrective actions. When exit criteria are met, accept the work product and report review results.

**Exam tip:** Remember the order: Planning → Initiation → Individual review → Communication/analysis → Fixing and reporting.  
“Anomaly ≠ defect until analyzed” is a common trap.

---

### 3.2.3 Roles and Responsibilities in Reviews (FL-3.2.3)

| Role | Main responsibilities |
|------|------------------------|
| **Manager** | Decides what is reviewed; provides resources (people, time) |
| **Author** | Creates the work product; **fixes** issues |
| **Moderator / Facilitator** | Ensures effective running of the review meeting; process discipline |
| **Reviewer** | Identifies potential defects / anomalies |
| **Scribe / Recorder** | Records issues, decisions, and actions |

**Inspection rule (exam favorite):** In an **inspection**, the **author cannot** act as review leader (moderator) or scribe.

One person may take more than one role in less formal reviews (except the formal constraint above for inspections).

---

### 3.2.4 Review Types (FL-3.2.4)

Compare formality, leadership, and main objectives:

| Review type | Formality | Who leads | Main characteristics / objectives |
|-------------|-----------|-----------|-----------------------------------|
| **Informal review** | Low | Often none / peer | Little or no process; quick feedback (e.g. buddy check, pair programming) |
| **Walkthrough** | Medium | **Author** | Author explains the work product; education, consensus, new ideas, detect anomalies; individual prep optional |
| **Technical review** | Medium–High | **Moderator** | Technically qualified reviewers; consensus and technical decisions; detect anomalies; evaluate quality |
| **Inspection** | Highest | **Moderator** (not author) | Follows full generic process; maximize anomaly detection; metrics collected; author **not** leader or scribe |

**Objectives that may apply across types:** detect anomalies, evaluate quality, build confidence, educate, gain consensus, generate ideas, help authors improve.

**Exam tip:**  
- Author leads → often **walkthrough**  
- Most formal + metrics + author cannot moderate → **inspection**  
- Peer quick look → **informal**  
- Technical consensus with moderator → **technical review**

---

### 3.2.5 Success Factors for Reviews (FL-3.2.5)

- Clear **objectives** and measurable **exit criteria**  
  - Evaluating **people** must **never** be an objective  
- Choose the **right review type** for the objective, work product, participants, and context  
- Review **small chunks** so concentration stays high  
- Give **feedback** to stakeholders and authors (product and process improvement)  
- Provide **adequate preparation time**  
- **Management support** for the review process  
- Make reviews part of the **organization culture** (learning and improvement)  
- Provide **adequate training** so people can fulfil their roles  
- **Facilitate** meetings effectively  

**Exam tip:** “Never use the review to evaluate the author as a person” is a classic success-factor point.

---

## Quick exam checklist – Chapter 3

| Topic | Remember |
|-------|----------|
| Static vs dynamic | No execution vs execution; defect directly vs failure then defect |
| Value | Early, cheap, docs + code, defects dynamic testing may miss |
| Process order | Plan → Initiate → Individual review → Communicate/analyze → Fix & report |
| Roles | Manager, Author, Moderator, Reviewer, Scribe |
| Inspection | Most formal; metrics; author ≠ moderator/scribe |
| Walkthrough | Author leads |
| Success | Clear goals, right type, small chunks, prep time, no blame, management support |

---

## Typical exam question patterns

1. Which work products can be checked by static testing?  
2. What is a benefit of static testing compared with dynamic testing only?  
3. Static testing finds defects **directly** — true or false?  
4. Order of review process activities  
5. Who fixes the work product? → **Author**  
6. Who leads a walkthrough? → **Author**  
7. Most formal review type? → **Inspection**  
8. Can the author be moderator in an inspection? → **No**  
9. Success factor: should participant evaluation be a review objective? → **No**  
10. Benefit of early stakeholder feedback  

---

## Study tips for Chapter 3

1. Memorize the **four review types** and who leads each.  
2. Drill **static vs dynamic** contrast table until automatic.  
3. Learn the **five process steps** in order.  
4. Connect static testing to **early testing** and lower cost of defects.  
5. Practice LO-style questions: K1 = recall; K2 = explain / compare.  

**Related practice in this app**
- Chapter 3 quizzes (Quiz 1, 2, 3)  
- Mock exams (several static testing / review questions)  
- Glossary tab for Chapter 3 keywords  
