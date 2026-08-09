# ISTQB CTFL v4.0.1 – Chapter 3: Static Testing

## 3.1 Static Testing Basics

### What is Static Testing?
Static testing is the examination of work products **without executing** the software.  
It can be applied to almost any work product (requirements, design, code, test cases, user stories, etc.).

### 3.1.1 Work Products Examinable by Static Testing
Almost any work product can be examined, including:
- Requirements specifications / User stories
- Design documents / Architecture
- Source code
- Test cases and test plans
- User manuals / Documentation
- Models, contracts, etc.

### 3.1.2 Value of Static Testing
- Finds defects early (cheaper to fix)
- Prevents defects from propagating to later stages
- Improves product quality and documentation quality
- Facilitates communication and shared understanding
- Can find defects that are difficult or expensive to find with dynamic testing (e.g., missing requirements, design flaws)

### 3.1.3 Differences between Static Testing and Dynamic Testing

| Aspect              | Static Testing                          | Dynamic Testing                        |
|---------------------|-----------------------------------------|----------------------------------------|
| Execution           | No code execution                       | Requires running the software          |
| When performed      | Early (even before code exists)         | After code is available                |
| Types of defects    | Missing requirements, design flaws, coding standards violations, etc. | Functional failures, performance issues, crashes |
| Techniques          | Reviews, static analysis                | Test case execution                    |

Both approaches are complementary and should be used together.

---

## 3.2 Feedback and Review Process

### 3.2.1 Benefits of Early and Frequent Stakeholder Feedback
- Detects misunderstandings early
- Improves product quality
- Increases stakeholder involvement and ownership
- Reduces rework later in the project

### 3.2.2 Review Process Activities (Typical steps)
1. Planning
2. Initiate review (kick-off)
3. Individual review (preparation)
4. Issue communication and analysis (review meeting)
5. Fixing and reporting
6. Follow-up (optional but recommended)

### 3.2.3 Roles and Responsibilities in Reviews
- **Author**: Creates the work product and is responsible for fixing defects
- **Manager**: Decides on the performance of reviews and allocates resources
- **Facilitator / Moderator**: Plans, leads the review meeting, ensures process is followed
- **Reviewer**: Identifies potential defects
- **Scribe / Recorder**: Documents issues, decisions, and action items

### 3.2.4 Review Types
| Review Type       | Formality     | Main Characteristics                                      | Typical Use Case                  |
|-------------------|---------------|-----------------------------------------------------------|-----------------------------------|
| Informal Review   | Low           | No formal process, quick feedback                         | Pair programming, buddy check     |
| Walkthrough       | Medium        | Author leads the meeting and explains the work product    | Knowledge sharing, training       |
| Technical Review  | Medium-High   | Focused on technical correctness and quality              | Design or architecture review     |
| Inspection        | High          | Formal process, defined roles, metrics, documented results| Critical documents or code        |

### 3.2.5 Success Factors for Reviews
- Clear objectives and defined scope
- Suitable participants with right skills
- Adequate preparation time
- Good moderation
- Psychological safety (no blame culture)
- Follow-up on identified issues
- Management support