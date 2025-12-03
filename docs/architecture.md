
---

#  **3. architecture.md **

```markdown
# Architecture Document – Online Code Judge

## 1. Architectural Style
The system uses:

- **Client–Server architecture**
- **Micro-sandboxing** via Docker containers
- **REST APIs**
- **Modular MVC structure** on backend

---

## 2. System Architecture Diagram

Client (React)
|
| Axios HTTP Requests
|
Backend (Express)
|
| Spawns
v
Docker Sandbox ←→ Temp Files
|
MongoDB (Problems/Submissions)




---

## 3. Backend Architecture

### 3.1 Layers

#### **1. Routing Layer**
Handles API endpoints:
- `/run`
- `/judge`
- `/problems`

#### **2. Controller Layer**
Implements logic like:
- file creation
- selecting images
- running containers

#### **3. Utility Layer**
Reusable functions:
- `generateTempFile()`
- `executeDocker()`
- `loadProblem()`

---

## 4. Docker Architecture

### Language Images

docker/
python/
cpp/
c/
node/


Each folder contains:
Dockerfile
run.sh





 ## 6. Performance

Containers run in <500ms for simple programs.

Temp files deleted automatically.

No container reuse → avoids contamination.


## 8. Security Layers

Docker isolation

CPU + memory limits

No shared network

Sanitized inputs

No admin privileges inside container