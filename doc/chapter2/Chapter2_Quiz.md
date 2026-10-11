# ISTQB CTFL v4.0.1 – Chapter 2 Practice Quiz 1
## Testing Throughout the SDLC

**Inspired by official sample-exam patterns — original practice questions only**

---

### Question 1
The rule “for every SDLC activity there is a corresponding test activity” applies to:

A. Only waterfall projects  
B. Only agile sprints  
C. Sequential, incremental, and iterative development models  
D. Only projects without automation  

**Answer:** C  
**Explanation:** Good practice for all SDLC models (FL-2.1.2).

---

### Question 2
Which statement BEST describes ATDD?

A. Tests are mainly code-oriented component tests written after coding  
B. Tests are created from acceptance criteria to drive development of the related software  
C. Tests must always use only performance tools  
D. ATDD forbids any collaboration with business representatives  

**Answer:** B  
**Explanation:** ATDD uses acceptance criteria to drive development (FL-2.1.3). Given/When/Then is more typical of BDD.

---

### Question 3
Which is NOT an example of the shift-left approach?

A. Reviewing user requirements before formal stakeholder acceptance  
B. Writing a component test before the corresponding code  
C. Running a performance test on a component during component testing  
D. Writing automated scripts before any configuration management process exists  

**Answer:** D  
**Explanation:** Test scripts should be under configuration management; creating them before CM is set up is not sensible shift-left (FL-2.1.5).

---

### Question 4
Which argument best supports holding retrospectives after each release cycle?

A. Retrospectives are fashionable and clients always demand them  
B. Process weaknesses found can feed a continuous improvement action list  
C. Retrospectives replace all testing  
D. Retrospectives are only for collecting end-user product compliments  

**Answer:** B  
**Explanation:** Retrospectives support process improvement when follow-up actions are taken (FL-2.1.6).

---

### Question 5
Match failure types to test levels:

1. System behavior deviates from user’s business needs  
2. Failures in communication between components  
3. Failures in logic inside a single unit of code  
4. Business rules incorrectly implemented in the integrated system  

A. Component  B. Component integration  C. System  D. Acceptance  

Which mapping is BEST?

A. 1-D, 2-B, 3-A, 4-C  
B. 1-A, 2-C, 3-D, 4-B  
C. 1-B, 2-A, 3-D, 4-C  
D. 1-C, 2-D, 3-B, 4-A  

**Answer:** A  
**Explanation:** Acceptance ↔ user needs; integration ↔ communication; component ↔ code logic; system ↔ business rules in the system (FL-2.2.1).

---

### Question 6
After a defect fix, you re-run the test that previously failed to see if the fix works. This is:

A. Regression testing only  
B. Confirmation testing (re-testing)  
C. Load testing  
D. Maintenance retirement testing only  

**Answer:** B  
**Explanation:** Confirmation checks that the specific fix worked (FL-2.2.3).

---

### Question 7
You re-run a set of previously passing tests after a new feature is merged to ensure nothing else broke. This is:

A. Confirmation testing only  
B. Regression testing  
C. Only static analysis  
D. Only acceptance criteria writing  

**Answer:** B  
**Explanation:** Regression checks for unintended side effects (FL-2.2.3).

---

### Question 8
Which is a typical impact of DevOps on testing?

A. Slower feedback on quality  
B. Fast feedback via CI/CD, more automation, and support for shift-left  
C. Banning all component tests  
D. Removing non-functional testing forever  

**Answer:** B  
**Explanation:** DevOps promotes rapid feedback, automation, and earlier quality activities (FL-2.1.4).

---

### Question 9
TDD is best characterized as:

A. Write production code first, then maybe a test  
B. Write a failing automated test, write minimal code to pass, then refactor  
C. Only manual exploratory testing  
D. Only user acceptance sign-off  

**Answer:** B  
**Explanation:** Classic red–green–refactor TDD cycle (FL-2.1.3).

---

### Question 10
Maintenance testing is typically triggered by:

A. Only brand-new greenfield projects  
B. Modification, migration, or retirement of an operational system  
C. Only writing the first user story  
D. Only choosing a programming language  

**Answer:** B  
**Explanation:** Maintenance testing responds to changes in live systems, migrations, or retirement (FL-2.3.1).

---

### Question 11
Functional testing focuses on:

A. How fast the system responds under load only  
B. What the system does (features and functions)  
C. Only source-code complexity metrics  
D. Only hardware temperature  

**Answer:** B  
**Explanation:** Functional type = behavior of functions; non-functional = quality characteristics like performance (FL-2.2.2).

---

### Question 12
Shift-left means:

A. Skipping system and acceptance testing  
B. Moving testing activities earlier without abandoning later levels  
C. Testing only after production release  
D. Removing developers from code reviews  

**Answer:** B  
**Explanation:** Earlier testing activities; later testing remains necessary (FL-2.1.5).
