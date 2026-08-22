# ISTQB CTFL v4.0.1 – Chapter 5: Managing the Test Activities

## 5.1 Test Planning

### 5.1.1 Purpose and Content of a Test Plan
A test plan describes the objectives, approach, resources, schedule, and activities of testing.

Typical contents of a test plan include:
- Test objectives and scope
- Test approach / strategy
- Entry and exit criteria
- Test deliverables
- Resources and responsibilities
- Schedule and milestones
- Risks and mitigations
- Tools and environments

### 5.1.2 Tester’s Contribution to Iteration and Release Planning
Testers contribute by:
- Identifying testing effort and risks
- Providing feedback on testability
- Helping estimate testing activities
- Clarifying acceptance criteria

### 5.1.3 Entry Criteria and Exit Criteria
- **Entry criteria**: Conditions that must be met before testing can start (e.g., requirements approved, test environment ready).
- **Exit criteria**: Conditions that must be met before testing can be considered complete (e.g., coverage targets reached, critical defects fixed).

### 5.1.4 Estimation Techniques
Common techniques:
- Metrics-based estimation (using historical data)
- Expert-based estimation (consulting experienced people)
- Three-point estimation (optimistic, most likely, pessimistic)

### 5.1.5 Test Case Prioritization
Test cases can be prioritized based on:
- Risk level
- Business importance
- Frequency of use
- Complexity
- Dependencies

### 5.1.6 Test Pyramid
The Test Pyramid suggests:
- Many automated unit/component tests at the bottom
- Fewer integration tests in the middle
- Even fewer end-to-end / UI tests at the top

### 5.1.7 Testing Quadrants
Testing Quadrants help classify tests according to:
- Business-facing vs Technology-facing
- Supporting the team vs Critiquing the product

---

## 5.2 Risk Management

### 5.2.1 Risk Definition and Attributes
**Risk** = A potential event that may cause an adverse effect.  
Risk is characterized by:
- **Likelihood** (probability of occurrence)
- **Impact** (severity of the consequences)

**Risk Level** = Likelihood × Impact

### 5.2.2 Project Risks vs Product Risks
- **Project Risks**: Risks related to the success of the project (schedule, resources, budget, skills…).
- **Product Risks**: Risks related to the quality of the product (functional failures, performance issues, security vulnerabilities…).

### 5.2.3 Product Risk Analysis
Product risk analysis influences:
- What to test more thoroughly
- Test prioritization
- Scope of testing
- Depth of testing

### 5.2.4 Product Risk Control
Actions that can be taken in response to product risks:
- Increase testing effort in high-risk areas
- Use more rigorous test techniques
- Perform early reviews
- Add mitigation activities outside testing

---

## 5.3 Test Monitoring, Test Control and Test Completion

### 5.3.1 Metrics used in Testing
Common metrics:
- Test case execution progress
- Defect detection rate
- Defect density
- Test coverage (requirements, risks, code)
- Pass/fail rate

### 5.3.2 Purpose, Content and Audience for Test Reports
- **Test Progress Report**: Shows current status during testing.
- **Test Summary / Completion Report**: Provides overall results at the end of testing.

Reports should be tailored to the audience (management, team, stakeholders).

### 5.3.3 Communicating the Status of Testing
Status can be communicated through:
- Dashboards
- Progress reports
- Meetings
- Defect reports

---

## 5.4 Configuration Management
Configuration management ensures that:
- The correct versions of work products (code, tests, documentation) are used
- Changes are controlled
- Traceability is maintained

It supports testing by providing a stable and controlled test environment and testware.

---

## 5.5 Defect Management
Defect management includes:
- Logging defects
- Classifying and prioritizing defects
- Tracking the status of defects
- Reporting and analyzing defects

A good defect report should be clear, complete, and reproducible.