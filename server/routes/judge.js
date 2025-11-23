// server/routes/judge.js
const express = require("express");
const { judgeCode } = require("../controllers/judgeController");
const router = express.Router();

router.post("/submit", judgeCode);

module.exports = router;
