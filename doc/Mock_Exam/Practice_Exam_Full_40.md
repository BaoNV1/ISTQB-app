# ISTQB CTFL v4.0 – Full Practice Exam (Original)
## 40 Questions · Timed practice (60 minutes) · Pass ≥ 26/40

**Note:** This is an **original practice exam** written for study purposes.  
It is **not** an official ISTQB sample exam. For official samples A–D download from istqb.org.

---

### Questions

### Question 1
Which of the following is a typical objective of testing?

A. To prove that the software has no defects  
B. To reduce risk and build confidence in quality  
C. To fix every defect found during execution  
D. To replace the need for reviews and static analysis  

**Answer:** B  
**Explanation:** Testing helps reduce product risk and increases confidence in the quality level. It cannot prove absence of defects.

---

### Question 2
What is the correct sequence in the cause-effect chain?

A. Failure → Defect → Error  
B. Defect → Error → Failure  
C. Error → Defect → Failure  
D. Failure → Error → Defect  

**Answer:** C  
**Explanation:** A human error can introduce a defect (fault) in a work product; when the defect is executed it may cause a failure.

---

### Question 3
Which testing principle states that testing shows the presence of defects but cannot prove their absence?

A. Early testing  
B. Pesticide paradox  
C. Testing shows presence of defects  
D. Defect clustering  

**Answer:** C  
**Explanation:** Finding defects increases confidence, but exhaustive proof of correctness is impossible through testing alone.

---

### Question 4
How does testing differ from debugging?

A. Testing and debugging are performed by the same role with the same goal  
B. Testing finds defects/failures; debugging finds the cause and fixes the defect  
C. Debugging is only done during static testing  
D. Testing always includes fixing the code  

**Answer:** B  
**Explanation:** Testers focus on finding problems; developers (or responsible roles) perform debugging to locate and correct the root cause.

---

### Question 5
What does the “whole-team approach” emphasize?

A. Only dedicated testers are responsible for quality  
B. Quality is the shared responsibility of the entire team  
C. Developers should never participate in testing  
D. Testers work in a completely separate team  

**Answer:** B  
**Explanation:** In modern approaches (especially Agile), everyone shares responsibility for product quality.

---

### Question 6
Which activity belongs to the fundamental test process?

A. Writing production source code  
B. Test analysis and design  
C. Marketing the product  
D. Customer support after release only  

**Answer:** B  
**Explanation:** Test analysis, design, implementation, execution, and completion are core test activities.

---

### Question 7
What is meant by “shift-left” testing?

A. Performing testing only after coding is finished  
B. Moving testing activities earlier in the lifecycle  
C. Testing exclusively in production  
D. Skipping component testing  

**Answer:** B  
**Explanation:** Shift-left means involving testing earlier (requirements, design, coding) to find defects sooner and cheaper.

---

### Question 8
Which test level is most commonly performed by developers?

A. Acceptance testing  
B. System testing  
C. Component (unit) testing  
D. Operational acceptance testing  

**Answer:** C  
**Explanation:** Component testing is typically done by the developers who wrote the code.

---

### Question 9
Confirmation testing (retesting) is performed to:

A. Check that a fixed defect has been correctly resolved  
B. Check unrelated areas for new defects  
C. Measure performance under load  
D. Validate user documentation only  

**Answer:** A  
**Explanation:** Confirmation testing verifies that a specific defect fix works. Regression testing checks for side effects.

---

### Question 10
Maintenance testing is usually triggered by:

A. Only brand-new green-field development  
B. Modifications, migrations, or retirement of a system  
C. Only changes to the test environment  
D. Only performance complaints  

**Answer:** B  
**Explanation:** Maintenance testing covers changes after delivery: adaptive, perfective, corrective, or preventive maintenance, plus migration and retirement.

---

### Question 11
In a DevOps pipeline, which practice gives the fastest feedback on code changes?

A. Big-bang integration at the end of the release  
B. Continuous Integration (CI)  
C. Manual testing only after deployment  
D. Annual performance testing  

**Answer:** B  
**Explanation:** CI builds and tests every change quickly, providing rapid feedback.

---

### Question 12
Static testing is best described as:

A. Executing the code with various inputs  
B. Examining work products without executing the software  
C. Only load and stress testing  
D. Testing only in the production environment  

**Answer:** B  
**Explanation:** Reviews, static analysis, and inspection of requirements, code, etc., are forms of static testing.

---

### Question 13
Which of the following is a benefit of static testing?

A. It can only be done after code is executable  
B. It can detect defects early, before dynamic testing  
C. It replaces the need for any dynamic testing  
D. It requires a fully deployed environment  

**Answer:** B  
**Explanation:** Static techniques find defects early when they are cheaper to fix.

---

### Question 14
Equivalence partitioning divides inputs into:

A. Groups that are expected to be processed the same way  
B. Only invalid values  
C. Only boundary values  
D. Random samples without structure  

**Answer:** A  
**Explanation:** Values in the same partition are assumed to be treated equivalently by the system.

---

### Question 15
Boundary value analysis focuses on:

A. Values in the middle of partitions only  
B. Values at the edges of equivalence partitions  
C. Only non-numeric inputs  
D. Random exploratory testing  

**Answer:** B  
**Explanation:** Defects often occur at boundaries, so min, max, and just-inside/outside values are tested.

---

### Question 16
Decision table testing is especially useful when:

A. There are complex combinations of conditions and actions  
B. Only a single simple input is involved  
C. Testing only user interface layout  
D. Measuring response time  

**Answer:** A  
**Explanation:** Decision tables systematically cover combinations of conditions and resulting actions.

---

### Question 17
State transition testing is most appropriate for systems that:

A. Have no stored state between events  
B. Depend on previous events / current state  
C. Only process batch files  
D. Never change state  

**Answer:** B  
**Explanation:** It models states, transitions, events, and actions for stateful systems.

---

### Question 18
Which black-box technique uses a model of possible values and their combinations?

A. Statement coverage  
B. Equivalence partitioning and boundary value analysis  
C. Mutation testing  
D. Call-graph analysis  

**Answer:** B  
**Explanation:** EP and BVA are classic black-box techniques based on input domains.

---

### Question 19
Statement coverage measures:

A. The percentage of executable statements that have been exercised  
B. The number of defects found  
C. Only branch outcomes  
D. User satisfaction  

**Answer:** A  
**Explanation:** Statement coverage = (executed statements / total statements) × 100%.

---

### Question 20
Which of the following is a white-box technique?

A. Equivalence partitioning  
B. Boundary value analysis  
C. Decision (branch) coverage  
D. Use-case testing  

**Answer:** C  
**Explanation:** Decision/branch coverage requires knowledge of the control flow structure.

---

### Question 21
Experience-based testing techniques include:

A. Only formal equivalence partitioning  
B. Error guessing and exploratory testing  
C. Only model-based testing  
D. Only automated regression packs  

**Answer:** B  
**Explanation:** Error guessing and exploratory testing rely on the tester’s knowledge and experience.

---

### Question 22
A test charter is typically used in:

A. Strictly scripted sequential testing only  
B. Exploratory testing sessions  
C. Only performance testing  
D. Only acceptance sign-off meetings  

**Answer:** B  
**Explanation:** Charters give goals and scope for time-boxed exploratory sessions.

---

### Question 23
Which factor most strongly influences the test approach?

A. The colour of the company logo  
B. Risk, context, and project constraints  
C. Only the number of developers  
D. The programming language alone  

**Answer:** B  
**Explanation:** Context, product risk, project risk, and constraints drive the test strategy and approach.

---

### Question 24
Product risk is best described as:

A. Risk related to the project schedule only  
B. Risk that the product may fail to satisfy stakeholders in some way  
C. Only financial risk of the company  
D. Risk that testers may be unavailable  

**Answer:** B  
**Explanation:** Product risks concern quality attributes and potential failure modes of the product itself.

---

### Question 25
Which of the following is a typical entry criterion for system testing?

A. All component tests have been executed and critical defects fixed  
B. The product has already been released to all customers  
C. No test cases have been designed yet  
D. The project has been cancelled  

**Answer:** A  
**Explanation:** Entry criteria often require previous levels to have reached a defined quality level.

---

### Question 26
Exit criteria (completion criteria) may include:

A. Only the number of test cases written  
B. Achieved coverage, residual risk, and defect status  
C. Only the amount of budget spent  
D. The number of meetings held  

**Answer:** B  
**Explanation:** Good exit criteria consider coverage, quality, risk, and residual defects.

---

### Question 27
What is the main purpose of a test plan?

A. To replace the need for any test cases  
B. To describe scope, approach, resources, and schedule of testing  
C. To list only the defects found  
D. To serve as the user manual  

**Answer:** B  
**Explanation:** The test plan communicates how testing will be performed and controlled.

---

### Question 28
Which metric helps track test progress?

A. Number of lines of production code only  
B. Number of test cases planned vs executed and passed/failed  
C. Number of coffee breaks taken  
D. Only the size of the requirements document  

**Answer:** B  
**Explanation:** Planned vs executed, pass/fail rates, and defect trends are common progress metrics.

---

### Question 29
Configuration management supports testing by:

A. Making it impossible to reproduce test environments  
B. Controlling versions of testware and test environments  
C. Removing the need for defect tracking  
D. Preventing any changes to the system  

**Answer:** B  
**Explanation:** CM ensures the right versions of code, tests, data, and environments are used and can be reproduced.

---

### Question 30
Which of the following is a typical defect report content?

A. Only the tester’s name  
B. Steps to reproduce, expected vs actual result, severity/priority  
C. Only the date of the project kick-off  
D. The full source code of the system  

**Answer:** B  
**Explanation:** Clear reproduction steps and expected/actual results make defects actionable.

---

### Question 31
Risk-based testing prioritises:

A. Tests randomly  
B. Tests according to identified product and project risks  
C. Only the easiest tests  
D. Only tests that have never failed  

**Answer:** B  
**Explanation:** Higher-risk items receive earlier and more intensive testing.

---

### Question 32
Which tool type supports static testing?

A. Load generators only  
B. Review support tools and static analysis tools  
C. Only performance monitors  
D. Only network sniffers  

**Answer:** B  
**Explanation:** Static analysis tools and review workflow tools support static testing activities.

---

### Question 33
A potential benefit of test automation is:

A. It completely eliminates the need for human testers  
B. Faster regression execution and repeatability  
C. It guarantees finding all defects  
D. It requires no maintenance  

**Answer:** B  
**Explanation:** Automation excels at fast, repeatable regression but still needs skilled design and maintenance.

---

### Question 34
Which of the following is a risk of test automation?

A. Too much manual exploratory testing  
B. High initial investment and ongoing maintenance cost  
C. Inability to run tests overnight  
D. Tests that are always up to date without effort  

**Answer:** B  
**Explanation:** Automation can be expensive to create and keep aligned with a changing system.

---

### Question 35
In Agile, who is primarily responsible for quality?

A. Only the test manager outside the team  
B. The whole team  
C. Only the product owner  
D. Only external auditors  

**Answer:** B  
**Explanation:** The whole-team approach makes quality a shared responsibility.

---

### Question 36
Which of the following best supports traceability?

A. Having no link between requirements and tests  
B. Linking requirements, test conditions, test cases, and defects  
C. Storing all documents in personal email only  
D. Never updating the test documentation  

**Answer:** B  
**Explanation:** Traceability enables impact analysis, coverage measurement, and change management.

---

### Question 37
Acceptance testing is typically performed to:

A. Replace unit testing completely  
B. Establish confidence that the system meets business needs  
C. Measure only code coverage  
D. Debug compiler errors  

**Answer:** B  
**Explanation:** Acceptance testing focuses on whether the system is acceptable to stakeholders/users.

---

### Question 38
Which technique is most suitable for testing complex business rules with many conditions?

A. Simple random testing only  
B. Decision table testing  
C. Only statement coverage  
D. Only usability testing  

**Answer:** B  
**Explanation:** Decision tables systematically handle combinations of conditions and actions.

---

### Question 39
The pesticide paradox implies that:

A. The same tests will always find new defects  
B. Tests need to be regularly reviewed and revised  
C. One test case is enough for the whole system  
D. Testers should never change existing tests  

**Answer:** B  
**Explanation:** Repeating the same tests eventually stops finding new defects; tests must evolve.

---

### Question 40
Which of the following is an example of a project risk?

A. The system may calculate tax incorrectly  
B. Key people may leave the project  
C. The login screen may have a usability issue  
D. A calculation may overflow  

**Answer:** B  
**Explanation:** Project risks affect the ability to deliver (people, schedule, tools, etc.). Product risks affect the quality of the product itself.

---

## Answer Key (quick)

1B  2C  3C  4B  5B  6B  7B  8C  9A  10B  
11B 12B 13B 14A 15B 16A 17B 18B 19A 20C  
21B 22B 23B 24B 25A 26B 27B 28B 29B 30B  
31B 32B 33B 34B 35B 36B 37B 38B 39B 40B

**Scoring:** 26/40 (65%) or higher is a typical pass target for CTFL-style exams.  
Review every incorrect answer using the explanations above and the official syllabus.