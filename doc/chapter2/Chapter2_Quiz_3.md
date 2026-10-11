# ISTQB CTFL v4.0.1 – Chapter 2 Practice Quiz 3
## Focus: Regression, DevOps, Maintenance & Types

---

### Question 1
A user story has tests TC1–TC3. After fixes, a new build arrives. TC1 and TC3 failed last time; TC2 passed. You run TC1 and TC3 to see if fixes worked, and also re-run TC2. Which is TRUE?

A. TC1 and TC3 are confirmation; TC2 is regression  
B. All three are only confirmation  
C. All three are only static tests  
D. TC2 is confirmation; TC1 and TC3 are regression  

**Answer:** A  
**Explanation:** Re-running previously failed tests after a fix is confirmation; re-running a previously passed test is regression.

---

### Question 2
CI pipelines that automatically run unit and integration tests on each commit mainly provide:

A. Slower feedback  
B. Rapid feedback on whether changes break existing behavior  
C. Replacement for all human testing forever  
D. Proof that exhaustive testing was achieved  

**Answer:** B  
**Explanation:** DevOps/CI supports fast feedback (FL-2.1.4).

---

### Question 3
Non-functional testing includes:

A. Only checking that a login button exists  
B. Evaluating characteristics such as performance, security, or usability  
C. Only counting lines of code  
D. Only writing user stories  

**Answer:** B  
**Explanation:** Non-functional types address quality characteristics (FL-2.2.2).

---

### Question 4
When a live system is enhanced with a new feature, maintenance testing often includes:

A. No regression at all  
B. Impact analysis and regression testing of affected areas  
C. Only deleting all old tests  
D. Only production monitoring with no pre-release testing  

**Answer:** B  
**Explanation:** Modifications trigger maintenance testing with impact analysis and regression (FL-2.3.1).

---

### Question 5
Acceptance testing is most concerned with:

A. Internal loop boundaries inside one function  
B. Whether the system meets user/business needs  
C. Only compiler optimization flags  
D. Only network cable colors  

**Answer:** B  
**Explanation:** Acceptance level validates fitness for user/business purpose (FL-2.2.1).

---

### Question 6
Which statement about test types and levels is TRUE?

A. Functional testing can only be done at acceptance level  
B. Test types (functional, non-functional, white-box, black-box) can apply at various levels  
C. White-box testing is forbidden at component level  
D. Regression exists only at unit level  

**Answer:** B  
**Explanation:** Types are applicable across levels (FL-2.2.2).

---

### Question 7
Retrospectives differ from product demo feedback mainly because they focus on:

A. Only external marketing claims  
B. The team’s process and how to improve it  
C. Only listing every production defect forever  
D. Replacing the test policy  

**Answer:** B  
**Explanation:** Retrospectives target process improvement (FL-2.1.6).

---

### Question 8
Writing acceptance tests before implementing a story, based on agreed criteria, is closest to:

A. Pure exploratory testing with no criteria  
B. ATDD  
C. Only operational profiling  
D. Only hardware burn-in  

**Answer:** B  
**Explanation:** ATDD drives development from acceptance tests/criteria (FL-2.1.3).

---

### Question 9
A system is being decommissioned; data must be archived and a replacement cut over. Testing for this is:

A. Irrelevant  
B. Maintenance testing related to retirement  
C. Only component testing of new greenfield code  
D. Only shift-left of the original project  

**Answer:** B  
**Explanation:** Retirement is a maintenance-testing trigger (FL-2.3.1).

---

### Question 10
Black-box testing is based on:

A. Internal code structure only  
B. External behavior / specification without requiring code knowledge  
C. Only CPU cache layout  
D. Only the tester’s salary band  

**Answer:** B  
**Explanation:** Black-box uses the specification/external view (FL-2.2.2).

---

### Question 11
Which is a benefit associated with DevOps-style delivery for testing?

A. Encouraging automated checks and reducing repetitive manual regression  
B. Forbidding static analysis  
C. Delaying all feedback until yearly release  
D. Removing non-functional requirements  

**Answer:** A  
**Explanation:** Automation and faster feedback are key DevOps testing impacts (FL-2.1.4).

---

### Question 12
“Each test level has specific objectives” helps teams to:

A. Repeat identical tests at every level without purpose  
B. Cover different risks/failures efficiently without wasteful overlap  
C. Skip integration testing always  
D. Avoid writing any acceptance criteria  

**Answer:** B  
**Explanation:** Distinct objectives improve coverage efficiency (FL-2.1.2).
