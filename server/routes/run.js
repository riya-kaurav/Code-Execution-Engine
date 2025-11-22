// server/routes/run.js
const express = require("express");
const router = express.Router();
const { runCode } = require("../controllers/runController");

router.post("/", runCode);

module.exports = router;
