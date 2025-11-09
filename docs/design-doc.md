# 🧩 Design Document — Scalable Code Execution Engine

## 1. Problem Understanding
Executing user code at scale requires balancing *speed, **security, and **cost*.  
Naive approaches (like running everything in one container) are insecure and unscalable.

---

## 2. Design Goals
| Goal | Description |
|------|--------------|
| Security | Isolate untrusted code completely |
| Scalability | Handle thousands of concurrent executions |
| Latency | Fast response for small code snippets |
| Reliability | No single point of failure |
| Developer Experience | Clean architecture and observability |

---

## 3. Architecture Overview
*Approach:* Hybrid client–server model  
- Client handles simple code runs via WASM/Web Worker  
- Server executes heavy jobs in isolated sandboxes  
- Queue separates execution layer for scalability

(Insert diagram here: docs/architecture-diagram.png)

---

## 4. Tradeoffs & Design Choices

| Area | Choice | Alternative | Reason |
|------|---------|-------------|--------|
| Queue | Redis + BullMQ | RabbitMQ, Kafka | Simpler setup, async retries |
| Execution | Node.js isolated processes | Docker containers | Faster cold start during hackathon |
| Client Execution | Web Worker | Service Worker | Dedicated thread, no network |
| Database | MongoDB | Postgres | Simpler JSON-based storage for submissions |
| Language Support | JS + Python | C++, Java | Easy sandboxing for demo |

---

## 5. Scaling Strategy
- *Horizontal scaling:* multiple worker instances
- *Queue-based backpressure:* job rate control
- *Caching:* frequently used problem data in Redis
- *Autoscaling policy:* monitor queue length → add/remove workers

---

## 6. Security Strategy
- Run untrusted code inside restricted child processes
- Enforce resource limits via child_process.spawn + timeout
- Disable network + filesystem access
- Memory & CPU usage monitored per job
- Sanitize all user input

---

## 7. Future Improvements
- Add multi-language runtime (Dockerized per-language)
- Use gVisor/Firecracker for deeper isolation
- Distributed job tracking with Kafka + ElasticSearch

---

## 8. References
- [BullMQ Docs](https://docs.bullmq.io)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [gVisor Sandbox](https://gvisor.dev/)