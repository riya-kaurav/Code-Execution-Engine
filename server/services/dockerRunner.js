const { exec } = require("child_process");

exports.runInDocker = (hostFilePath, language, input = "", timeoutMs = 4000) => {
  const ext = language === "python" ? "py" : "js";
  const containerPath = `/home/runner/code.${ext}`;

  const dockerCmd = [
    "docker run --rm",
    "--network none",
    `--memory=256m`,
    `--cpus="0.5"`,
    `--pids-limit=64`,
    `--read-only`,
    `-v ${hostFilePath}:${containerPath}:ro`,
    `code-runner:latest`,
    `/bin/bash -lc "timeout 2s ${language === 'python' ? `python3 ${containerPath}` : `node ${containerPath}`} <<< '${String(input).replace(/'/g, "'\\''")}'"`
  ].join(" ");

  return new Promise((resolve) => {
    exec(dockerCmd, { timeout: timeoutMs }, (err, stdout, stderr) => {
      if (err) {
        if (err.killed) return resolve({ ok: false, error: "Time Limit Exceeded" });
        const errMsg = (stderr && stderr.trim()) ? stderr.trim() : err.message;
        return resolve({ ok: false, error: errMsg });
      }
      return resolve({ ok: true, output: stdout || "" });
    });
  });
};
