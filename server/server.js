// server/index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// ensure temp exists
const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// mount routes
app.use("/run", require("./routes/run"));         // POST /run  { code, language, input }
app.use("/judge", require("./routes/judge"));     // POST /judge/submit { code, language, problemId }
app.use("/problems", require("./routes/problems"));// GET /problems, GET /problems/:id

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Judge server running on ${PORT}`));
