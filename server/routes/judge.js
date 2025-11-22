const express = require("express");
const { judgeCode } = require("../controllers/judgeController");
const router = express.Router();

router.post("/", judgeCode);

module.exports = router;
