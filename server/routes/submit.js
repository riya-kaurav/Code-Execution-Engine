const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const router = express.Router();

router.post("/submit/:id", (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "No code provided" });

  const tempDir = path.join(__dirname, "..", "temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const filename = `temp_${Date.now()}.js`;
  const tempPath = path.join(tempDir, filename);

  fs.writeFileSync(tempPath, code);

  exec(`node ${tempPath}`, (err, stdout, stderr) => {
    fs.unlinkSync(tempPath);
    if (err) return res.json({ output: stderr });
    res.json({ output: stdout });
  });
});

module.exports = router;
