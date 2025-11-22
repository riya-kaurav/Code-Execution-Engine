const fs = require("fs");
const path = require("path");
const { runInDocker } = require("../services/dockerRunner");

exports.judgeCode = async (req, res) => {
  const { language, code, problem } = req.body;

  if (!language || !code || !problem)
    return res.status(400).json({ error: "Missing fields" });

  const id = Date.now();
  const ext = language === "python" ? "py" : "js";
  const filePath = path.join(__dirname, "..", "temp", `${id}.${ext}`);

  fs.writeFileSync(filePath, code);

  let allPassed = true;
  let results = [];

  for (let i = 0; i < problem.testcases.length; i++) {
    const tc = problem.testcases[i];

    let out = await runInDocker(filePath, language, tc.input);

    if (out.error) {
      allPassed = false;
      results.push({
        test: i + 1,
        input: tc.input,
        expected: tc.output,
        output: out.error,
        pass: false,
      });
      continue;
    }

    const pass = out.output.trim() === tc.output.trim();
    if (!pass) allPassed = false;

    results.push({
      test: i + 1,
      input: tc.input,
      expected: tc.output,
      output: out.output,
      pass,
    });
  }

  fs.unlinkSync(filePath);

  return res.json({
    verdict: allPassed ? "Accepted" : "Wrong Answer",
    results,
  });
};
