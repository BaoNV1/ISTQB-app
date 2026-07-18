# ISTQB Chapter 2 Glossary

This glossary explains the key ideas in Chapter 2 in a more practical and easy-to-understand way.

## 1. Software Development Lifecycle (SDLC)
- SDLC (Software Development Lifecycle): The full process used to build, test, release, and maintain software.
- Why it matters: The way software is developed affects how testing is planned and performed.
- Example: In a waterfall project, testing often happens after development. In Agile, testing happens more continuously.

## 2. Test Levels
- Test level: A stage in the testing process that focuses on a different scope of the system.
- Component testing: Testing individual components or modules in isolation.
  - Example: Testing a calculator function or a single class in code.
- Integration testing: Testing how different components work together.
  - Example: Checking whether the login module correctly works with the database.
- System testing: Testing the complete system as a whole.
  - Example: Testing the full e-commerce website from the user’s perspective.
- Acceptance testing: Testing to confirm the system satisfies business needs and acceptance criteria.
  - Example: Checking whether an online booking system can handle customer requests as expected.

## 3. Test Types
- Test type: A category of testing based on what aspect is being checked.
- Functional testing: Testing whether the system behaves according to the specified requirements.
  - Example: Verifying that a “Save” button actually saves the data.
- Non-functional testing: Testing aspects such as performance, security, usability, compatibility, and reliability.
  - Example: Checking whether the application responds quickly under heavy traffic.
- Black-box testing: Testing based on inputs and outputs without needing to know the internal code.
- White-box testing: Testing based on the internal structure, logic, or code of the component.
- Change-related testing: Testing that is performed after changes are made to the software.

## 4. Confirmation Testing and Regression Testing
- Confirmation testing: Testing performed after a defect is fixed to verify that the issue is truly resolved.
  - Example: If a login bug was fixed, confirmation testing checks whether login now works.
- Regression testing: Testing performed to ensure that existing functionality still works after changes.
  - Example: After fixing the login bug, regression testing checks whether other features such as checkout and payment still work.
- Key difference: Confirmation testing checks the specific fix; regression testing checks the wider impact of the change.

## 5. Maintenance Testing
- Maintenance testing: Testing done after software is released when changes are made, such as bug fixes, enhancements, or environment updates.
- Common triggers:
  - corrective maintenance: fixing defects
  - adaptive maintenance: updating for new environments or rules
  - perfective maintenance: improving performance or functionality
  - preventive maintenance: preventing future problems

## 6. Testing in Different Development Approaches
- Waterfall: Testing is often done in separate phases after development.
- Agile: Testing is more continuous and may happen in every iteration.
- DevOps: Testing is closely linked with fast delivery, automation, and continuous integration.

## 7. Shift Left
- Shift left: Moving testing earlier in the software lifecycle.
- Benefit: Defects are found earlier, which reduces cost and effort.
- Example: Reviewing requirements or writing tests during design instead of waiting until the end.

## 8. Test-First Approaches
- Test-first approach: Writing tests before implementing the feature.
- Common examples:
  - TDD (Test-Driven Development): Write a test, then implement code to make it pass.
  - ATDD (Acceptance Test-Driven Development): Define acceptance tests before building the feature.

## 9. DevOps and Testing
- DevOps: A collaborative approach that connects development, testing, and operations.
- Impact on testing:
  - faster feedback
  - more automation
  - continuous testing
  - better collaboration between teams

## 10. Retrospectives and Process Improvement
- Retrospective: A meeting to reflect on what happened in a project or iteration.
- Purpose: Find what worked well and what should improve.
- Link to testing: Teams can improve testing practices based on lessons learned.

## Quick memory tip
- Remember this order: test levels → test types → confirmation/regression → maintenance.
- If you remember only one idea from Chapter 2, remember this: testing must fit the development approach and should happen as early as possible.
