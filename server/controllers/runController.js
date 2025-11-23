// server/controllers/runController.js
const fs = require("fs");
const path = require("path");
const { runInDocker } = require("../services/dockerRunner");

exports.runCode = async (req, res) => {
  try {
    const { code, language = "javascript", input = "" } = req.body;
    if (!code) return res.status(400).json({ success: false, error: "No code provided" });

    const tempDir = path.join(__dirname, "..", "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const ext = language === "python" ? "py" : "js";
    const id = Date.now() + "-" + Math.floor(Math.random() * 10000);
    const filePath = path.join(tempDir, `run_${id}.${ext}`);
    fs.writeFileSync(filePath, code, "utf8");

    const result = await runInDocker(filePath, language, input);

    // cleanup
    try { fs.unlinkSync(filePath); } catch (e) {}

    if (!result.ok) return res.json({ success: false, error: result.error });
    return res.json({ success: true, output: result.output.trim() });
  } catch (err) {
    console.error("runCode error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

