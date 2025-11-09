# 🧠 Scalable Code Execution Engine

### 🚀 Overview
A hybrid code execution platform inspired by HackerRank & LeetCode — designed for scalability, isolation, and real-time feedback.

### 🎯 Problem Statement
Executing untrusted user code securely and efficiently at scale is challenging.  
Traditional APIs (like Judge0) solve it, but here we design our own *isolated execution system* with scalability and sandboxing in mind.

### ⚙️ Key Features
- Monaco Editor (frontend)
- Hybrid execution: Web Worker (client) + Server sandbox
- Queue-driven architecture for scalable job handling
- Resource limits & isolation for security
- Real-time feedback & monitoring

### 🧩 System Architecture
(Insert your architecture diagram image here — docs/architecture-diagram.png)

*Core Components:*
- Frontend: React + Monaco + Web Worker
- Backend: Node.js + Express
- Queue: Redis + BullMQ
- Database: MongoDB
- Sandbox: Ephemeral isolated processes

### 🌐 Execution Flow
1. User writes & tests code in browser (Web Worker).
2. On submit → request sent to backend.
3. Backend pushes job → Queue.
4. Worker executes inside sandbox → returns result.
5. Results stored in MongoDB → shown in UI.

### 🧠 Design Highlights
- Hybrid model reduces server load and latency.
- Queue decouples frontend and execution layer.
- Sandbox ensures untrusted code safety.
- Horizontal scalability: more workers = higher throughput.

### 🔒 Security
- CPU/memory/time limits for all jobs.
- Network & file system access disabled.
- Isolated process per execution.

### 🪄 Tech Stack
*Frontend:* React (Vite), Monaco Editor, Web Workers  
*Backend:* Node.js, Express, MongoDB, Redis (BullMQ)  
*Deployment:* Docker + optional scaling with PM2/Kubernetes