# ISTQB CTFL v4.0.1 – Chapter 4 Practice Quiz
## Test Analysis and Design

---

### Question 1 Which technique divides input or output data into groups that are expected to be processed in the same way by the system?

A. State transition testing  
B. Equivalence partitioning  
C. Branch testing  
D. Error guessing  

**Answer:** B  
**Explanation:** Equivalence Partitioning (EP) divides data into partitions (valid and invalid) where the system should behave the same for all values in a partition.

---

### Question 2 What is the main focus of Boundary Value Analysis (BVA)?

A. Only random values in the middle of a range  
B. Values at and around the edges of equivalence partitions  
C. Only values from invalid partitions  
D. Only code branches  

**Answer:** B  
**Explanation:** BVA focuses on the boundaries of ordered partitions because defects often occur at the edges.

---

### Question 3 Which technique is most suitable when the system behavior depends on combinations of multiple conditions (business rules)?

A. Decision table testing  
B. Statement testing  
C. Exploratory testing  
D. Checklist-based testing  

**Answer:** A  
**Explanation:** Decision tables clearly show combinations of conditions and the resulting actions.

---

### Question 4 What does Branch Coverage measure?

A. Whether each user story has a title  
B. Whether every possible outcome (True/False) of decisions is executed  
C. Whether every input partition has equal size  
D. Whether testers work in pairs  

**Answer:** B  
**Explanation:** Branch testing aims to execute every branch (outcome of each decision) at least once. 100% branch coverage is stronger than 100% statement coverage.

---

### Question 5 What is a defining characteristic of Acceptance Test-Driven Development (ATDD)?

A. Acceptance tests are written after release  
B. Acceptance tests are written collaboratively before implementation  
C. Only developers can define acceptance criteria  
D. Tests must avoid business examples  

**Answer:** B  
**Explanation:** In ATDD, the team (including business, developers, and testers) collaboratively creates acceptance tests before coding begins.

---

### Question 6 A field accepts age values from 18 to 60 inclusive.  
Using Equivalence Partitioning, how many partitions are there (including invalid ones)?

A. 2  
B. 3  
C. 4  
D. 5  

**Answer:** B  
**Explanation:**  
- Invalid: age < 18  
- Valid: 18 ≤ age ≤ 60  
- Invalid: age > 60  
→ 3 partitions.

---

### Question 7 Using the same age field (18–60), how many test values are typically needed for **2-value BVA**?

A. 2  
B. 4  
C. 6  
D. 8  

**Answer:** B  
**Explanation:**  
Lower boundary: 17 (invalid) and 18 (valid)  
Upper boundary: 60 (valid) and 61 (invalid)  
→ 4 values for 2-value BVA.

---

### Question 8 Which statement about Statement Coverage and Branch Coverage is correct?

A. 100% Statement Coverage guarantees 100% Branch Coverage  
B. 100% Branch Coverage guarantees 100% Statement Coverage  
C. They always give the same coverage percentage  
D. Statement Coverage is stronger than Branch Coverage  

**Answer:** B  
**Explanation:** Achieving 100% branch coverage automatically achieves 100% statement coverage, but the reverse is not true.

---

### Question 9 In State Transition Testing, which coverage is generally stronger?

A. Covering all states only  
B. Covering all valid transitions  
C. Covering only the initial state  
D. Covering only invalid transitions  

**Answer:** B  
**Explanation:** Covering all valid transitions is stronger than covering only the states.

---

### Question 10 Which technique is primarily based on the tester’s knowledge and intuition about where defects are likely to occur?

A. Equivalence Partitioning  
B. Error Guessing  
C. Decision Table Testing  
D. Statement Testing  

**Answer:** B  
**Explanation:** Error Guessing relies on the experience of the tester to anticipate common defects.

---

### Question 11 What is a key characteristic of Exploratory Testing?

A. All test cases must be fully documented before execution  
B. Learning, test design, and test execution happen simultaneously  
C. It can only be used for white-box testing  
D. It does not allow any documentation  

**Answer:** B  
**Explanation:** Exploratory testing is a simultaneous process of learning the system, designing tests, and executing them (often in time-boxed sessions).

---

### Question 12 In a Decision Table, what does each column typically represent?

A. One test condition  
B. One combination of conditions (a rule) and the corresponding actions  
C. One test level  
D. One defect  

**Answer:** B  
**Explanation:** Each column in a decision table represents one unique combination of conditions and the actions that should occur.

---

### Question 13 Which of the following is an example of a collaboration-based approach?

A. Writing detailed test scripts alone after coding is finished  
B. Writing acceptance criteria and acceptance tests together with the team before implementation  
C. Performing only static analysis  
D. Measuring only statement coverage  

**Answer:** B  
**Explanation:** Collaborative approaches such as ATDD and collaborative user story writing involve the whole team (business, developers, testers) working together early.

---

### Question 14 Why is high code coverage (e.g., 100% statement coverage) not sufficient by itself?

A. Because coverage tools are always inaccurate  
B. Because high coverage does not guarantee that the tests are correct or that all important scenarios are covered  
C. Because white-box testing is not allowed in Agile  
D. Because coverage can only be measured for black-box techniques  

**Answer:** B  
**Explanation:** Coverage is only an indicator. It shows what has been executed, but does not prove that the tests check the correct expected results or cover all risks.

---

**End of Chapter 4 Quiz**