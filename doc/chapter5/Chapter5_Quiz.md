# ISTQB CTFL v4.0.1 – Chapter 5 Practice Quiz 1
## Managing the Test Activities

**Aligned with syllabus LOs FL-5.1.1 – FL-5.5.1**

---

### Question 1
What is a main purpose of a test plan?

A. To list every defect found after release  
B. To document objectives, approach, resources, and schedule for testing  
C. To replace the need for a test strategy  
D. To store only source code versions  

**Answer:** B  
**Explanation:** A test plan documents means and schedule for achieving test objectives, communicates with stakeholders, and shows how testing follows (or deviates from) policy and strategy.

---

### Question 2
Which item is typically included in a test plan?

A. Marketing campaign slogans  
B. Risk register and test approach (levels, types, techniques, entry/exit criteria)  
C. Only the final production password  
D. Employee salary details  

**Answer:** B  
**Explanation:** Typical content includes context, stakeholders, communication, risk register, test approach, budget, and schedule.

---

### Question 3
How does a tester mainly add value during release planning?

A. By writing production deployment scripts only  
B. By participating in testable user stories, acceptance criteria, risk analysis, and test effort estimates  
C. By avoiding all estimation work  
D. By deleting the product backlog  

**Answer:** B  
**Explanation:** Testers help with testable stories and acceptance criteria, project/quality risk analysis, and estimating test effort across iterations (FL-5.1.2).

---

### Question 4
What is the correct distinction between entry and exit criteria?

A. Entry criteria define when testing can finish; exit criteria define when testing can start  
B. Entry criteria define when testing can start; exit criteria define when testing can be considered complete  
C. They are identical terms  
D. Exit criteria are only used in unit testing  

**Answer:** B  
**Explanation:** Entry criteria are preconditions to start; exit criteria are conditions for completion (FL-5.1.3).

---

### Question 5
In Agile development, exit criteria for a releasable item are often called:

A. Definition of Ready  
B. Definition of Done  
C. Test policy  
D. Risk register  

**Answer:** B  
**Explanation:** Definition of Done defines objective metrics for a releasable item; Definition of Ready relates to entry conditions for starting work.

---

### Question 6
In a previous project the development-to-test effort ratio was 3:2. Current development effort is estimated at 600 person-days. Using ratio-based estimation, what is the test effort?

A. 200 person-days  
B. 300 person-days  
C. 400 person-days  
D. 900 person-days  

**Answer:** C  
**Explanation:** Ratio 3:2 means test = (2/3) × development = (2/3) × 600 = 400 person-days (FL-5.1.4).

---

### Question 7
Which estimation technique uses optimistic, most likely, and pessimistic estimates?

A. Estimation based on ratios only  
B. Three-point estimation  
C. Exhaustive path counting  
D. Random guessing  

**Answer:** B  
**Explanation:** Three-point estimation uses optimistic (a), most likely (m), and pessimistic (b); often E = (a + 4m + b) / 6.

---

### Question 8
Planning Poker is best described as a variant of:

A. Statement coverage  
B. Wideband Delphi  
C. Equivalence partitioning  
D. Static analysis  

**Answer:** B  
**Explanation:** Planning Poker is an iterative expert-based technique related to Wideband Delphi (FL-5.1.4).

---

### Question 9
Under time pressure, which prioritization approach is most consistent with risk-based testing?

A. Run only the newest tests regardless of importance  
B. Run higher product-risk tests first  
C. Skip all regression tests always  
D. Prioritize only by alphabetical test id  

**Answer:** B  
**Explanation:** Risk-based prioritization runs higher-risk areas earlier (FL-5.1.5).

---

### Question 10
What does the test pyramid recommend?

A. Many slow UI tests and almost no unit tests  
B. Many automated unit/component tests at the bottom and fewer end-to-end tests at the top  
C. Equal numbers of tests at every level always  
D. Only manual testing at all levels  

**Answer:** B  
**Explanation:** The pyramid favors a large base of fast low-level tests and fewer expensive high-level tests (FL-5.1.6).

---

### Question 11
Which testing quadrant is technology-facing and supports the team (e.g. automated component tests in CI)?

A. Q1  
B. Q2  
C. Q3  
D. Q4  

**Answer:** A  
**Explanation:** Q1 = technology-facing, support the team (component / component integration; often in CI) (FL-5.1.7).

---

### Question 12
Exploratory testing and user acceptance testing are most associated with which quadrant?

A. Q1  
B. Q2  
C. Q3  
D. Q4  

**Answer:** C  
**Explanation:** Q3 = business-facing, critique the product (exploratory, usability, UAT; often manual).

---

### Question 13
Performance and security tests (non-functional, often automated) typically map to:

A. Q1  
B. Q2  
C. Q3  
D. Q4  

**Answer:** D  
**Explanation:** Q4 = technology-facing, critique the product (smoke, performance, security, other non-functional except usability).

---

### Question 14
How is risk level typically expressed in the syllabus?

A. Impact only  
B. Likelihood only  
C. A combination of likelihood and impact (often likelihood × impact)  
D. Number of test cases written  

**Answer:** C  
**Explanation:** Risk is characterized by likelihood and impact; risk level combines them (FL-5.2.1).

---

### Question 15
Which of the following is a **product risk**?

A. Key tester leaves the project  
B. Test environment delivery is delayed  
C. The payment function may fail under peak load  
D. Project budget is reduced  

**Answer:** C  
**Explanation:** Product risks concern product quality (e.g. functional, performance, security). The others are project risks (FL-5.2.2).

---

### Question 16
Which of the following is a **project risk**?

A. Security vulnerability in production code  
B. Incorrect interest calculation  
C. Skills shortage delaying test automation setup  
D. Missing mandatory field validation  

**Answer:** C  
**Explanation:** Project risks affect project success (schedule, resources, skills, tools, environment).

---

### Question 17
How can product risk analysis influence testing?

A. It has no effect on test scope  
B. It can change thoroughness, scope, prioritization, and effort allocation  
C. It only affects marketing  
D. It replaces all test design techniques  

**Answer:** B  
**Explanation:** Higher product risk areas typically receive more, earlier, and stronger testing (FL-5.2.3).

---

### Question 18
Which action is a valid response to analyzed product risks by testing?

A. Ignore high-risk areas to save time  
B. Apply stronger techniques, higher coverage, reviews, and skilled testers on high-risk areas  
C. Delete the risk register  
D. Stop all regression testing permanently  

**Answer:** B  
**Explanation:** Mitigation by testing includes right skills, independence, reviews/static analysis, techniques/coverage, relevant test types, and dynamic testing including regression (FL-5.2.4).

---

### Question 19
What is the difference between test monitoring and test control?

A. They are the same activity  
B. Monitoring collects information about progress; control uses that information to take corrective actions  
C. Control only happens before testing starts  
D. Monitoring only counts lines of code  

**Answer:** B  
**Explanation:** Monitoring gathers data; control issues directives such as reprioritizing tests or adjusting schedule (section 5.3).

---

### Question 20
Which is an example of a control directive?

A. Writing the first requirement  
B. Reprioritizing tests when an identified risk becomes an issue  
C. Deleting all metrics  
D. Avoiding communication with stakeholders  

**Answer:** B  
**Explanation:** Control directives include reprioritizing tests, re-evaluating entry/exit criteria, adjusting schedule, and adding resources.

---

### Question 21
Which metric is commonly used in testing?

A. Office temperature only  
B. Percentage of planned tests executed and pass/fail counts  
C. Number of coffee breaks  
D. Logo color codes  

**Answer:** B  
**Explanation:** Common metrics include execution progress, defects, coverage, and pass/fail rates (FL-5.3.1).

---

### Question 22
What is a main difference between a test progress report and a test completion report?

A. There is no difference  
B. Progress reports are used during testing; completion reports summarize outcomes at a milestone or end of testing  
C. Completion reports are only written before testing starts  
D. Progress reports must never show defects  

**Answer:** B  
**Explanation:** Progress reports support ongoing monitoring/control; completion reports consolidate results, residual risks, and recommendations (FL-5.3.2).

---

### Question 23
How does configuration management support testing?

A. By preventing any test execution  
B. By ensuring correct versions of code and testware, controlled changes, and traceability  
C. By removing the need for test cases  
D. By replacing defect management  

**Answer:** B  
**Explanation:** CM provides known baselines, controlled versions, and traceability so results are reproducible and trustworthy (FL-5.4.1).

---

### Question 24
Which information is most important in a defect report for reproducibility?

A. Only the author’s favorite color  
B. Steps to reproduce, expected vs actual results, and environment  
C. Only the project code name  
D. Only the meeting room number  

**Answer:** B  
**Explanation:** Reproducibility needs clear steps, expected/actual results, and environment (and usually logs/screenshots) (FL-5.5.1).

---

### Question 25
A good defect report typically includes:

A. Unique id, title, severity, priority, status, and references to the test case  
B. Only a single word “bug”  
C. Only the developer’s personal email password  
D. No status field ever  

**Answer:** A  
**Explanation:** Syllabus lists identifier, title, date/author, object/environment, context, description/steps, expected/actual, severity, priority, status, and references.
