// server/controllers/judgeController.js
const fs = require("fs");
const path = require("path");
const { runInDocker } = require("../services/dockerRunner");
const { compareOutputs } = require("../utils/compare");

/**
 * Expects: req.body = { language, code, problemId }
 * problem file at server/problems/<problemId>.json and structure:
 * {
 *   "id":"p1",
 *   "title":"..",
 *   "tests": [
 *     { "input": [3,7] } or { "input": "3 7" }, "output": "10"
 *   ]
 * }
 */
exports.judgeCode = async (req, res) => {
  try {
    const { language = "javascript", code, problemId } = req.body;
    if (!code || !problemId) return res.status(400).json({ error: "Missing fields" });

    const problemPath = path.join(__dirname, "..", "problems", `${problemId}.json`);
    if (!fs.existsSync(problemPath)) return res.status(404).json({ error: "Problem not found" });

    const problem = JSON.parse(fs.readFileSync(problemPath, "utf8"));
    const tests = Array.isArray(problem.tests) ? problem.tests : problem.samples || [];

    // save code file
    const tempDir = path.join(__dirname, "..", "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    const ext = language === "python" ? "py" : "js";
    const id = Date.now() + "-" + Math.floor(Math.random() * 10000);
    const filePath = path.join(tempDir, `judge_${id}.${ext}`);
    fs.writeFileSync(filePath, code, "utf8");

    let allPassed = true;
    const results = [];

    for (let i = 0; i < tests.length; i++) {
      const t = tests[i];
      // convert input to string if array/object
      let inputString;
      if (Array.isArray(t.input)) inputString = t.input.join(" ");
      else if (typeof t.input === "object") inputString = JSON.stringify(t.input);
      else inputString = String(t.input ?? "");

      const runRes = await runInDocker(filePath, language, inputString);

      if (!runRes.ok) {
        allPassed = false;
        results.push({
          test: i + 1,
          input: t.input,
          expected: t.output,
          output: runRes.error,
          pass: false,
        });
        continue;
      }

      const actual = runRes.output || "";
      const pass = compareOutputs(t.output, actual);

      if (!pass) allPassed = false;
      results.push({
        test: i + 1,
        input: t.input,
        expected: t.output,
        output: actual.trim(),
        pass,
      });
    }

    // cleanup
    try { fs.unlinkSync(filePath); } catch (e) {}

    return res.json({
      verdict: allPassed ? "Accepted" : "Wrong Answer",
      results,
    });
  } catch (err) {
    console.error("judgeCode error:", err);
    return res.status(500).json({ error: err.message });
  }
};
