// server/services/dockerRunner.js
const { exec } = require("child_process");
const path = require("path");

exports.runInDocker = (hostFilePath, language, input = "", timeoutMs = 4000) => {
  const ext = language === "python" ? "py" : "js";

  // Inside container path
  const containerPath = `/home/runner/code.${ext}`;

  // Build docker command (read-only mount)
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
      // err may be non-null on non-zero exit; handle common cases
      if (err) {
        if (err.killed) return resolve({ ok: false, error: "Time Limit Exceeded" });
        // if stderr present, prefer stderr
        const errMsg = (stderr && stderr.trim()) ? stderr.trim() : err.message;
        return resolve({ ok: false, error: errMsg });
      }
      return resolve({ ok: true, output: stdout === undefined ? "" : String(stdout) });
    });
  });
};

