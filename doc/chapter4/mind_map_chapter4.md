# ISTQB Chapter 4 Mind Map

## Chapter 4: Test Analysis and Design

```mermaid
mindmap
  root((Chapter 4: Test Analysis and Design))
    4.1 Test Techniques Overview
      Black-box (Specification-based)
      White-box (Structure-based)
      Experience-based
      Collaboration-based
    4.2 Black-box Techniques
      Equivalence Partitioning (EP)
        Valid & Invalid partitions
        One value per partition
        Coverage formula
      Boundary Value Analysis (BVA)
        2-value BVA
        3-value BVA
        Combine with EP
      Decision Table Testing
        Conditions + Actions
        Each column = 1 rule
        Minimize table
      State Transition Testing
        States, Events, Transitions, Guards
        Cover all states
        Cover all valid transitions
        Invalid transitions
    4.3 White-box Techniques
      Statement Testing
        Statement Coverage formula
      Branch Testing
        Branch Coverage
        Stronger than Statement Coverage
      Value of White-box
        Finds control flow defects
        Complements Black-box
        High coverage ≠ good tests
    4.4 Experience-based Techniques
      Error Guessing
      Exploratory Testing
        Simultaneous learning + design + execution
      Checklist-based Testing
    4.5 Collaboration-based Approaches
      Collaborative User Story Writing
      Acceptance Criteria
      ATDD
        Write acceptance tests before coding
```

## Study focus
- Learn the main test design techniques.
- Understand the difference between black-box and white-box testing.
- Practice how acceptance criteria and ATDD support testing.
