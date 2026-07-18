# ISTQB Chapter 4 Glossary

This glossary explains the key ideas in Chapter 4 in a more practical and easy-to-understand way.

## 1. Test Techniques Overview
- Test technique: A method used to derive test cases and define what to test.
- Why techniques matter: They help testers create better tests in a structured way.
- Main groups:
  - black-box techniques
  - white-box techniques
  - experience-based techniques
  - collaboration-based approaches

## 2. Black-Box Test Techniques
- Black-box testing: Testing based on the system’s expected behavior without needing to know the internal code.
- Equivalence partitioning: Dividing input data into groups that should be treated the same.
  - Example: For age input, values 0–17, 18–64, and 65+ may form different partitions.
- Boundary value analysis: Testing values at the edges of valid or invalid ranges.
  - Example: If the valid range is 1 to 100, test 1, 2, 99, 100, and invalid values like 0 or 101.
- Decision table testing: Testing combinations of conditions and corresponding actions.
  - Example: Testing different combinations of user role and permission status.
- State transition testing: Testing how the system behaves when moving from one state to another.
  - Example: A checkout process moving from “cart” → “payment” → “complete”.

## 3. White-Box Test Techniques
- White-box testing: Testing based on the internal structure, logic, or code of the software.
- Statement coverage: The percentage of executable statements that are exercised by tests.
- Branch coverage: The percentage of decision branches that are executed.
- Value of white-box testing: It helps ensure that internal logic is tested, not just external behavior.

## 4. Experience-Based Test Techniques
- Experience-based testing: Testing techniques based on tester knowledge, intuition, and past experience.
- Error guessing: Predicting likely defects based on experience.
  - Example: A tester may suspect problems around input validation or boundary cases.
- Exploratory testing: Learning and testing at the same time, often without a fully scripted plan.
  - Example: A tester explores the application freely to discover issues.
- Checklist-based testing: Using a checklist of important points to guide testing.
  - Example: A checklist for login, logout, password reset, and session timeout.

## 5. Collaboration-Based Test Approaches
- Collaboration-based approach: A way of testing that involves business representatives, developers, and testers together.
- User story: A short description of a feature from the user’s perspective.
- Acceptance criteria: Conditions a feature must satisfy to be accepted by stakeholders.
- ATDD (Acceptance Test-Driven Development): Writing acceptance tests before implementing the feature.
- Why it matters: It improves shared understanding and reduces misunderstandings.

## Quick memory tip
- Black-box = test what the system does.
- White-box = test how the system is built internally.
- Experience-based = test using tester knowledge and intuition.
- Collaboration-based = test together with business and developers.
