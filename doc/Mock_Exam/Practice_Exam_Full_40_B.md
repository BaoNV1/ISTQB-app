# ISTQB CTFL v4.0 – Full Practice Exam B (Original)
## 40 Questions · Timed practice (60 minutes) · Pass ≥ 26/40 (65%)

**Note:** This is an **original practice exam** for study only.  
It is **not** an official ISTQB sample exam. Official samples A–D: download from istqb.org.

---

### Question 1
Which statement best describes the purpose of testing?

A. To guarantee that the product is defect-free  
B. To provide information about quality and reduce risk  
C. To replace static testing and reviews  
D. To ensure every requirement is implemented exactly once  

**Answer:** B  
**Explanation:** Testing provides stakeholders with information about quality and helps reduce product risk; it cannot prove the absence of defects.

---

### Question 2
A developer misunderstands a requirement and writes incorrect code. The incorrect code is later executed and the system behaves wrongly. Which sequence is correct?

A. Failure → Defect → Error  
B. Defect → Error → Failure  
C. Error → Defect → Failure  
D. Failure → Error → Defect  

**Answer:** C  
**Explanation:** A human error leads to a defect (fault) in a work product; execution of that defect may cause a failure.

---

### Question 3
Which testing principle emphasizes that testing everything (all combinations of inputs and preconditions) is impossible except for trivial cases?

A. Defect clustering  
B. Exhaustive testing is impossible  
C. Absence-of-errors fallacy  
D. Testing is context dependent  

**Answer:** B  
**Explanation:** Exhaustive testing is not feasible; risk and priorities guide what to test.

---

### Question 4
According to the principle of early testing, when should testing activities start?

A. Only after coding is finished  
B. As early as possible in the software development lifecycle  
C. Only during user acceptance  
D. After the product is released to production  

**Answer:** B  
**Explanation:** Starting testing early helps find defects when they are cheaper to fix and prevents defects from propagating.

---

### Question 5
Verification answers which question?

A. Are we building the product right?  
B. Are we building the right product?  
C. How many users will use the product?  
D. What is the market price of the product?  

**Answer:** A  
**Explanation:** Verification checks whether the product meets specified requirements (building it right). Validation checks whether it meets user needs (building the right product).

---

### Question 6
Which activity is typically part of test analysis?

A. Designing detailed test cases from test conditions  
B. Identifying test conditions by analyzing the test basis  
C. Logging defects found during execution  
D. Selecting which test cases to re-run after a fix  

**Answer:** B  
**Explanation:** Test analysis examines the test basis and identifies test conditions (what can be tested).

---

### Question 7
What is the main difference between static and dynamic testing?

A. Static testing always requires running the code; dynamic does not  
B. Dynamic testing executes the software; static testing does not  
C. Static testing can only be done by developers  
D. Dynamic testing cannot find defects  

**Answer:** B  
**Explanation:** Dynamic testing involves execution of the component or system; static testing (reviews, static analysis) does not execute the code.

---

### Question 8
Which of the following is a typical work product reviewed in static testing?

A. Only the compiled binary  
B. Requirements, design documents, code, and test plans  
C. Only production logs  
D. Only customer invoices  

**Answer:** B  
**Explanation:** Static testing can be applied to almost any work product, including requirements, design, code, and test documentation.

---

### Question 9
In a formal review, who is primarily responsible for leading the review meeting and ensuring the process is followed?

A. Author  
B. Moderator (or facilitator)  
C. Scribe only  
D. Manager who is not part of the review  

**Answer:** B  
**Explanation:** The moderator (facilitator) leads the review, keeps the meeting effective, and ensures the review process is followed.

---

### Question 10
Which black-box technique divides data into groups expected to be processed the same way?

A. Statement testing  
B. Equivalence partitioning  
C. Branch testing  
D. Error guessing  

**Answer:** B  
**Explanation:** Equivalence partitioning groups inputs (or outputs) into partitions where the system should behave equivalently.

---

### Question 11
A field accepts integers from 1 to 50 inclusive. Using 2-value boundary value analysis on the valid partition, which values should be tested?

A. 1 and 50 only  
B. 0, 1, 50, and 51  
C. 1, 2, 49, and 50  
D. Only 25  

**Answer:** A  
**Explanation:** For 2-value BVA on the valid ordered partition [1, 50], the boundaries 1 and 50 are the minimum set; many practitioners also include adjacent invalids, but the question asks for 2-value BVA on the valid partition.

---

### Question 12
When is decision table testing especially useful?

A. When testing a single input range with no conditions  
B. When system behavior depends on combinations of conditions  
C. When only statement coverage is required  
D. When no requirements exist  

**Answer:** B  
**Explanation:** Decision tables systematically cover combinations of conditions and resulting actions, which is ideal for complex business rules.

---

### Question 13
In state transition testing, what does covering all valid transitions typically achieve compared with covering only states?

A. Weaker coverage  
B. Stronger coverage of the state model  
C. The same coverage  
D. Coverage of all code statements automatically  

**Answer:** B  
**Explanation:** Exercising all valid transitions is a stronger criterion than visiting each state at least once.

---

### Question 14
Which white-box measure requires that every decision outcome (true and false) is executed?

A. Statement coverage  
B. Branch coverage  
C. Equivalence partition coverage  
D. Use case coverage  

**Answer:** B  
**Explanation:** Branch coverage aims to execute each branch (outcome of each decision) at least once.

---

### Question 15
100% branch coverage guarantees which of the following?

A. 100% statement coverage  
B. 100% requirement coverage  
C. All defects are found  
D. 100% path coverage  

**Answer:** A  
**Explanation:** Branch coverage is stronger than statement coverage; achieving 100% branch coverage implies 100% statement coverage, but not path or requirement coverage.

---

### Question 16
Which experience-based technique relies heavily on the tester’s knowledge of typical defects and past failures?

A. Equivalence partitioning  
B. Error guessing  
C. Decision table testing  
D. State transition testing  

**Answer:** B  
**Explanation:** Error guessing uses the tester’s experience to anticipate where defects are likely.

---

### Question 17
What is a characteristic of exploratory testing?

A. All tests are fully scripted before any execution  
B. Test design, execution, and learning occur together  
C. It never uses charters or time-boxes  
D. It replaces all other test techniques  

**Answer:** B  
**Explanation:** In exploratory testing, the tester simultaneously designs and executes tests while learning about the system.

---

### Question 18
In Acceptance Test-Driven Development (ATDD), when are acceptance tests typically created?

A. After the code is written and unit tested  
B. Collaboratively before implementation  
C. Only by developers after release  
D. Only during maintenance  

**Answer:** B  
**Explanation:** ATDD involves creating acceptance tests collaboratively (business, developers, testers) before implementation.

---

### Question 19
Which statement about test levels is correct?

A. Component testing is always performed by end users  
B. Integration testing focuses on interactions between components or systems  
C. System testing only checks single modules in isolation  
D. Acceptance testing is only done by developers  

**Answer:** B  
**Explanation:** Integration testing verifies interfaces and interactions between integrated components or systems.

---

### Question 20
Which test type focuses on whether the system meets stated functional requirements?

A. Performance testing  
B. Functional testing  
C. Reliability testing  
D. Portability testing  

**Answer:** B  
**Explanation:** Functional testing evaluates functions that the system should perform based on requirements or specifications.

---

### Question 21
Regression testing is primarily performed to:

A. Test only brand-new features for the first time  
B. Find new defects in unchanged areas after changes  
C. Replace all other testing  
D. Measure network bandwidth  

**Answer:** B  
**Explanation:** Regression testing checks that recent changes have not adversely affected existing functionality.

---

### Question 22
What is the main goal of a test plan?

A. To list every defect found in production  
B. To describe the scope, approach, resources, and schedule of testing  
C. To replace the need for test cases  
D. To store source code  

**Answer:** B  
**Explanation:** A test plan documents the scope, objectives, resources, schedule, approach, and other planning details.

---

### Question 23
Product risk is best described as:

A. The risk that the project will run out of budget  
B. The risk that the product may fail to satisfy stakeholder needs  
C. The risk that testers are unavailable  
D. The risk related only to tool licenses  

**Answer:** B  
**Explanation:** Product risk concerns the possibility that the product may be defective or fail to meet needs; project risk concerns the ability to deliver the project.

---

### Question 24
Which metric is most directly useful for monitoring test progress during execution?

A. Number of marketing campaigns  
B. Percentage of planned test cases executed and pass/fail counts  
C. Office temperature  
D. Number of developers hired  

**Answer:** B  
**Explanation:** Execution progress is commonly tracked by test cases run, passed, failed, and blocked, often against plan.

---

### Question 25
Traceability between requirements and tests helps mainly to:

A. Eliminate the need for any reviews  
B. Assess coverage of requirements and impact of changes  
C. Automatically fix all defects  
D. Remove the need for a test basis  

**Answer:** B  
**Explanation:** Traceability supports coverage analysis, change impact analysis, and auditability.

---

### Question 26
Configuration management for testing typically ensures that:

A. Only developers can access test cases  
B. Versions of testware and the items under test are controlled and identifiable  
C. No defects are ever reported  
D. Testing is never repeated  

**Answer:** B  
**Explanation:** CM keeps versions of product items and testware identified, controlled, and available so tests are run against known baselines.

---

### Question 27
A defect report should typically include which information?

A. Only the tester’s personal opinion with no steps  
B. Steps to reproduce, expected vs actual result, severity, and environment  
C. Only the developer’s name  
D. Only the date of the project kickoff  

**Answer:** B  
**Explanation:** Useful defect reports include clear reproduction steps, expected and actual results, severity/priority, and environment details.

---

### Question 28
Which of the following is a potential benefit of test automation?

A. Guaranteed discovery of all defects  
B. Faster regression execution and repeatability  
C. Elimination of all manual testing forever  
D. No need for test design  

**Answer:** B  
**Explanation:** Automation can speed up regression runs and improve consistency; it does not guarantee finding all defects or remove the need for skilled design.

---

### Question 29
Which is a typical risk of introducing test automation?

A. Scripts that are hard to maintain when the UI changes  
B. Automatic reduction of product risk to zero  
C. No need for any human testers  
D. Instant 100% path coverage  

**Answer:** A  
**Explanation:** Maintenance cost of automated scripts (especially UI-based) is a common risk when the product changes frequently.

---

### Question 30
Which tool type is primarily used to manage test cases, runs, and defects?

A. Compiler  
B. Test management tool  
C. Word processor only  
D. Graphics editor  

**Answer:** B  
**Explanation:** Test management tools support planning, test case management, execution tracking, and often defect workflow.

---

### Question 31
In the context of testing, independence means:

A. Testers must never talk to developers  
B. Testing is performed by someone other than the author to reduce bias  
C. Testing is only done by the customer  
D. No documentation is allowed  

**Answer:** B  
**Explanation:** Independent testing helps avoid author bias; different levels of independence exist (another developer, separate team, external organization).

---

### Question 32
Which activity belongs to test implementation?

A. Identifying high-level test conditions only  
B. Creating concrete test cases, test data, and test procedures  
C. Writing the project business case  
D. Negotiating the product price  

**Answer:** B  
**Explanation:** Test implementation produces detailed test cases, data, scripts, and procedures ready for execution.

---

### Question 33
Confirmation testing (re-testing) is performed to:

A. Check that a defect fix resolved the reported issue  
B. Test unrelated modules for the first time  
C. Measure CPU temperature  
D. Replace regression testing completely  

**Answer:** A  
**Explanation:** Confirmation testing verifies that a specific defect has been fixed successfully.

---

### Question 34
Which statement about agile testing is true?

A. Testing is only done at the end of the entire project  
B. Testers often collaborate continuously with developers and business representatives  
C. Automation is never used  
D. Documentation is always prohibited  

**Answer:** B  
**Explanation:** In agile contexts, testing is integrated throughout; collaboration and continuous feedback are typical.

---

### Question 35
A tester uses a checklist of typical quality characteristics and risk areas while exploring the system. This is closest to:

A. Pure random testing with no structure  
B. Checklist-based testing  
C. Formal proof of correctness  
D. Exhaustive path testing  

**Answer:** B  
**Explanation:** Checklist-based testing uses lists of items to prompt testing and support systematic coverage of areas of interest.

---

### Question 36
Which coverage item is associated with black-box techniques rather than white-box?

A. Statement coverage  
B. Branch coverage  
C. Equivalence partition coverage  
D. Decision outcome coverage inside code  

**Answer:** C  
**Explanation:** Equivalence partition coverage is derived from the specification (black-box); statement and branch coverage are code-based (white-box).

---

### Question 37
The “absence-of-errors” fallacy states that:

A. Finding and fixing many defects always means the system is ready for users  
B. Finding and fixing defects is not enough if the system does not meet user needs  
C. Testing is unnecessary if no defects are found in the first hour  
D. Users never report defects  

**Answer:** B  
**Explanation:** Even a relatively defect-free system can fail if it does not fulfill user needs and expectations.

---

### Question 38
Which factor most influences how testing is organized and prioritized?

A. The color of the company logo  
B. Context (risks, domain, lifecycle, regulatory needs)  
C. The number of chairs in the office  
D. Alphabetical order of feature names only  

**Answer:** B  
**Explanation:** Testing is context dependent: domain, risks, lifecycle model, and constraints shape the strategy.

---

### Question 39
During test monitoring and control, a high number of failed tests late in a release window may indicate:

A. That no further testing is needed  
B. Product quality or schedule risk requiring management attention  
C. That automation should never be used  
D. That requirements are always perfect  

**Answer:** B  
**Explanation:** Late, high failure rates are a signal of quality or delivery risk and typically trigger control actions (re-plan, risk focus, defect triage).

---

### Question 40
Which of the following best supports maintainability of automated regression suites?

A. Hard-coding every UI locator and ignoring design changes  
B. Modular scripts, stable interfaces, and regular maintenance  
C. Never reviewing failed runs  
D. Automating only one-time smoke tests and deleting them  

**Answer:** B  
**Explanation:** Maintainable automation uses good design (modularity, abstraction, stable identifiers) and is updated as the product evolves.

---

### Answer key (quick reference)

| Q | Ans | Q | Ans | Q | Ans | Q | Ans |
|---|-----|---|-----|---|-----|---|-----|
| 1 | B | 11 | A | 21 | B | 31 | B |
| 2 | C | 12 | B | 22 | B | 32 | B |
| 3 | B | 13 | B | 23 | B | 33 | A |
| 4 | B | 14 | B | 24 | B | 34 | B |
| 5 | A | 15 | A | 25 | B | 35 | B |
| 6 | B | 16 | B | 26 | B | 36 | C |
| 7 | B | 17 | B | 27 | B | 37 | B |
| 8 | B | 18 | B | 28 | B | 38 | B |
| 9 | B | 19 | B | 29 | A | 39 | B |
| 10 | B | 20 | B | 30 | B | 40 | B |

**Scoring:** 1 point per correct answer. Pass mark ≥ 26/40 (65%).  
**Suggested time:** 60 minutes.
