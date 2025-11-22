// server/controllers/runController.js
const fs = require("fs");
const path = require("path");
const { runInDocker } = require("../services/dockerRunner");

exports.runCode = async (req, res) => {
  try {
    const { code, language = "javascript", input = "" } = req.body;
    if (!code || !language) return res.status(400).json({ error: "Missing code or language" });

    // prepare temp file
    const id = Date.now() + "-" + Math.floor(Math.random() * 10000);
    const ext = language === "python" ? "py" : "js";
    const tempDir = path.join(__dirname, "..", "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const hostFilePath = path.join(tempDir, `code_${id}.${ext}`);
    fs.writeFileSync(hostFilePath, code, { encoding: "utf8" });

    // run in docker
    const result = await runInDocker(hostFilePath, language, input);

    // cleanup file
    try { fs.unlinkSync(hostFilePath); } catch (e) {}

    // send response
    if (!result.ok) {
      return res.status(200).json({ success: false, error: result.error });
    }
    return res.status(200).json({ success: true, output: result.output });
  } catch (err) {
    console.error("runCode error:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
};
