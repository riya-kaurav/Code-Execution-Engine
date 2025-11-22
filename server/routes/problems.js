const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/problems/:id", (req, res) => {
  const { id } = req.params;

  const filePath = path.join(__dirname, "..", "problems", `${id}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Problem not found" });
  }

  const data = fs.readFileSync(filePath);
  const problem = JSON.parse(data);

  res.json(problem);
});

module.exports = router;
