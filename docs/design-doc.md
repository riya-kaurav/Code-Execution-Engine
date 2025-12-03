
---

# Design.md **

```markdown
# System Design Document – Online Code Judge

## 1. Overview

This document explains the **design principles**, **data flow**, and **components** of the Online Code Judge system.  
The goal is to create a scalable, secure, and developer-friendly judge platform.

---

## 2. System Goals

### Functional Requirements
- Execute code in multiple languages.
- Evaluate code using predefined test cases.
- Store problems and submissions.
- Provide a responsive UI for coding.

### Non-Functional Requirements
- Security: no code can affect host machine.
- Performance: run code fast (<1s typical).
- Scalability: add more languages easily.
- Reliability: no container reuse.

---

## 3. High-Level Design

### Components
| Component | Responsibility |
|----------|----------------|
| Frontend | UI for editor and problem solving |
| Backend | APIs, judging, execution |
| Docker Sandbox | Isolated runtime environment |
| Database | Problems, submissions |

---

## 4. Code Execution Flow

1. User clicks **Run**.
2. Request goes to `POST /run`.
3. Server creates a **temp file**.
4. Backend selects matching Docker image.
5. Starts container → mounts temp folder.
6. Executes code inside container.
7. Captures:
   - stdout  
   - stderr  
   - execution time  
8. Sends back JSON response.

---

