#  Scalable Code Execution Engine

###  Overview
A full-stack online code execution and judging platform built with **React**, **Node.js**, **Express**, **MongoDB**, and **Docker-based sandboxing**.  
It allows users to write code, run it in a secure container, and attempt coding problems with automated evaluation.


##  Features

###  Code Execution
- Supports **multiple languages** (C, C++, Python, JavaScript).
- Executes code in **isolated Docker containers** for safety.
- Captures **stdout, stderr, and execution time**.

###  Coding Problems
- Browse problems with title, difficulty, and description.
- Submit code for evaluation.
- Judge runs code using **predefined test cases**.

###  Clean UI
- Monaco-based code editor
- Output panel (stdout, stderr, time)
- Problem page with test cases & submit button

---

##  Project Folder Structure

root/
│
├── client/                     # React frontend
│   ├── src/
│   │   ├── pages/              # Application pages
│   │   ├── components/         # Reusable UI components
│   │   ├── api/                # API integration layer
│   │   └── context/            # Global state/context providers
│   └── package.json            # Frontend dependencies & scripts
│
├── server/                     # Backend (Express.js)
│   ├── index.js                # Express app entry point
│   ├── routes/
│   │   ├── run.js              # Code execution API
│   │   ├── judge.js            # Judge + submission API
│   │   └── problems.js         # Problem APIs
│   ├── problems/               # Problem JSON files
│   ├── temp/                   # Temporary code files
│   ├── docker/                 # Docker sandboxes
│   ├── utils/                  # Utility functions
│   └── package.json            # Backend dependencies & scripts
│
└── README.md                   # Project documentation


---

## Running Locally 

### Clone 
git clone <repo-url>
cd project

### Install Client 
cd client
npm install
npm run dev

### Install Server 
cd server
npm install
node server.js

---



---


 ## Documentation

Detailed docs are available in:

docs/design.md

docs/architecture.md



###  System Architecture Diagram
(Insert your architecture diagram image here — docs/architecture-diagram.png)



##  Docker-Based Execution

Each code run spins up a **new lightweight container** like this:

```bash
   docker run --rm -m 256m --cpus="1" \
   -v /server/temp:/app \
   sandbox-image python3 code.py

