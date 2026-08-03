# ISTQB CTFL v4.0.1 – Chapter 2: Testing Throughout the Software Development Lifecycle

## 2.1 Testing in the Context of a Software Development Lifecycle (SDLC)

### 2.1.1 Impact of the Software Development Lifecycle on Testing
The chosen SDLC model affects:
- The scope and timing of test activities (test levels and test types)
- The level of detail of test documentation
- The selection of test techniques and approaches
- The degree of test automation
- The roles and responsibilities of testers

### 2.1.2 Software Development Lifecycle and Good Testing Practices
Good testing practices that apply to all SDLC models include:
- For every development activity, there is a corresponding testing activity
- Different test levels have specific and distinct objectives (to ensure adequate coverage without unnecessary overlap)
- Test analysis and design for a test level start during the corresponding development phase (supporting the early testing principle)
- Testers are involved in reviewing work products as early as possible

### 2.1.3 Testing as a Driver for Software Development (Test-First Approaches)
Examples of test-first approaches:
- **TDD (Test-Driven Development)**: Write a failing automated test → write the minimum code to pass the test → refactor
- **ATDD (Acceptance Test-Driven Development)**: Define acceptance tests before development
- **BDD (Behavior-Driven Development)**: Describe behavior using a structured language (e.g., Given-When-Then)

### 2.1.4 DevOps and Testing
DevOps emphasizes continuous integration and continuous delivery (CI/CD).

**Benefits for testing include:**
- Fast feedback on code quality and whether changes break existing functionality
- Promotion of the shift-left approach
- Encouragement of high-quality code supported by component tests and static analysis
- Greater focus on non-functional quality characteristics
- Reduction of repetitive manual testing through automation

### 2.1.5 Shift-Left Approach
Shift-left means performing testing activities earlier in the SDLC (e.g., reviewing requirements, designing tests, or writing automated tests before or during coding).  
It does **not** mean that later testing activities can be ignored.

### 2.1.6 Retrospectives and Process Improvement
Retrospectives allow the team to:
- Reflect on what went well and what did not
- Identify improvements to both development and testing processes

---

## 2.2 Test Levels and Test Types

### 2.2.1 Test Levels
The syllabus describes the following main test levels:

| Test Level                    | Main Focus                                      | Typically Performed By     | Typical Test Basis                  |
|------------------------------|--------------------------------------------------|----------------------------|-------------------------------------|
| Component (Unit) Testing     | Testing individual components in isolation       | Developers                 | Code, detailed design               |
| Component Integration Testing| Testing interfaces between components            | Developers / Testers       | Architecture, design specifications |
| System Testing               | Testing the complete system                      | Independent testers        | Requirements, system design         |
| System Integration Testing   | Testing the system with external systems         | Testers                    | System architecture, interfaces     |
| Acceptance Testing           | Validating that the system meets user needs      | Users / Customers / BA     | Business requirements, user stories |

**Note:** In iterative and incremental models, test levels may overlap in time.

### 2.2.2 Test Types
Test types group testing activities related to specific quality characteristics. They can generally be performed at any test level.

- **Functional Testing**: Checks whether the system does what it is supposed to do
- **Non-functional Testing**: Checks how well the system performs (performance, security, usability, reliability, etc.)
- **White-box Testing**: Based on the internal structure (code, architecture)
- **Black-box Testing**: Based on external specifications / behavior

### 2.2.3 Confirmation Testing and Regression Testing
- **Confirmation Testing (Retest)**: Re-running tests related to a defect that has been fixed to confirm the fix was successful
- **Regression Testing**: Testing to ensure that recent changes (fixes or new features) have not negatively affected previously working functionality

---

## 2.3 Maintenance Testing

Maintenance testing is performed on an operational system when one of the following occurs:
- **Modifications** (bug fixes, enhancements, or new features)
- **Migration** (moving to a new environment or platform)
- **Retirement** (decommissioning the system)

**Key point:** Impact analysis is essential to determine the scope of testing required.