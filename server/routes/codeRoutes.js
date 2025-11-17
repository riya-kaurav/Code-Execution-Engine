const express = require("express");
const { runCodeController } = require("../controllers/codeController");

const router = express.Router();

router.post("/run", runCodeController);

module.exports = router;
