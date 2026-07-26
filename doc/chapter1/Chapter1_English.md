# ISTQB CTFL v4.0.1 – Chapter 1: Fundamentals of Testing

## 1.1 What is Testing?

Testing is a set of activities to discover defects and evaluate the quality of software work products (test objects).

### Typical Test Objectives
- Finding defects
- Gaining confidence in the level of quality
- Providing information to stakeholders
- Preventing defects (especially through early static testing)
- Verifying that specified requirements have been fulfilled
- Validating that the system meets user needs

### Testing vs Debugging
- **Testing**: Finds defects and failures.
- **Debugging**: Finds the root cause of defects and fixes them (usually performed by developers).

---

## 1.2 Why is Testing Necessary?

Testing is necessary because software defects can lead to serious consequences (financial loss, reputation damage, safety issues, etc.).

### Key Points
- Testing contributes to project success by finding defects early (cheaper to fix).
- Testing reduces the risk of software failure in operation.
- Testing provides information for decision-making (e.g., release decisions).

### Testing vs Quality Assurance (QA)
- **Testing** is a form of quality control (product-oriented – detects defects).
- **QA** is process-oriented – aims to prevent defects by improving processes.

### Error → Defect → Failure → Root Cause
| Term        | Definition |
|-------------|----------|
| **Error**   | A human action that produces an incorrect result (mistake). |
| **Defect**  | A flaw in a work product caused by an error (also called bug or fault). |
| **Failure** | Deviation of the actual result from the expected result when the system is executed. |
| **Root Cause** | The fundamental reason for the occurrence of a defect. |

---

## 1.3 Testing Principles (7 Principles)

1. **Testing shows the presence of defects, not their absence**  
   Testing can prove that defects exist, but cannot prove that there are no defects.

2. **Exhaustive testing is impossible**  
   Testing everything is not feasible except in trivial cases. Use techniques, prioritization, and risk-based testing instead.

3. **Early testing saves time and money**  
   The earlier a defect is found, the cheaper it is to fix.

4. **Defects cluster together**  
   A small number of modules usually contain most of the defects (Pareto principle).

5. **Tests wear out (Pesticide Paradox)**  
   Repeating the same tests will eventually stop finding new defects. Tests need to be reviewed and updated.

6. **Testing is context dependent**  
   Testing is done differently in different contexts (e.g., safety-critical vs. mobile apps).

7. **Absence-of-errors is a fallacy**  
   Finding and fixing defects does not help if the system built is unusable or does not fulfill users’ needs.

---

## 1.4 Test Activities, Testware and Test Roles

### Main Test Activities (Test Process)
1. Test Planning
2. Test Monitoring and Control
3. Test Analysis
4. Test Design
5. Test Implementation
6. Test Execution
7. Test Completion

### Testware
All artifacts produced during the testing process (test plans, test cases, test data, test scripts, defect reports, test reports, etc.).

### Traceability
The ability to link the **test basis** (requirements, user stories, etc.) to the **testware** (test cases).  
Very valuable for impact analysis, coverage measurement, and change management.

### Roles in Testing
- Test Manager / Test Lead
- Tester
- Other roles can also perform testing activities (developers, business analysts, users) → **Whole Team Approach**

---

## 1.5 Essential Skills and Good Practices in Testing

### Generic Skills Required for Testing
- Analytical thinking
- Communication skills
- Curiosity and attention to detail
- Domain knowledge
- Technical knowledge

### Whole Team Approach
Everyone on the team shares responsibility for quality.  
**Advantages**: Better collaboration, shared ownership, earlier feedback.

### Independence of Testing
**Benefits**: More objective testing, different viewpoint.  
**Drawbacks**: Possible isolation, communication barriers, delayed feedback.

---

**Study Tip**: Focus on understanding and applying the 7 Testing Principles and the difference between Error – Defect – Failure – Root Cause.