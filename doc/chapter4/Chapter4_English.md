# Chapter 4: Test Analysis and Design

## 4.1 Test techniques

Test techniques help testers derive test conditions and test cases from requirements, models, code, and experience. A good technique makes the reasoning behind test selection visible and helps reveal gaps in coverage.

## 4.2 Black-box techniques

Black-box techniques design tests from the expected behavior of the system without relying on its internal implementation.

- **Equivalence partitioning** divides inputs or outputs into groups that the system should handle in the same way. Test one or more representative values from each partition, including invalid partitions.
- **Boundary value analysis** focuses on the edges of partitions. Values at, just below, and just above a boundary are especially valuable because defects often occur there.
- **Decision table testing** represents combinations of conditions and their resulting actions. It is useful when behavior depends on several business rules.
- **State transition testing** models states, events, guards, and transitions. Test valid transitions as well as invalid events that should be rejected.

## 4.3 White-box techniques

White-box techniques use the internal structure of the software. Statement testing aims to execute executable statements, while branch testing aims to execute decision outcomes. Coverage measures are useful indicators, but high coverage does not prove that the tests are correct or complete.

## 4.4 Experience-based techniques

Error guessing uses tester knowledge to predict likely defects. Exploratory testing combines learning, test design, and execution. Checklist-based testing uses a maintained list of important checks to guide a consistent session.

## 4.5 Collaboration-based approaches

User stories describe a feature from a user perspective. Acceptance criteria define conditions that must be satisfied. In Acceptance Test-Driven Development (ATDD), the team discusses and writes acceptance tests before implementation, creating a shared example of the expected behavior.

## Study focus

- Choose equivalence partitions before selecting representative values.
- Check both sides of every important boundary.
- Use decision tables for combinations of business conditions.
- Use state models for event-driven behavior.
- Treat coverage as information for risk-based decisions, not as a quality guarantee.
