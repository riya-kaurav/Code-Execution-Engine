const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

exports.runUserCode = (code, language) => {
  return new Promise((resolve, reject) => {
    const id = Date.now();

    const tempJs = path.join(__dirname, "..", "temp", `code_${id}.js`);
    const tempPy = path.join(__dirname, "..", "temp", `code_${id}.py`);

    let tempFile = "";
    let runCommand = "";

    // JavaScript
    if (language === "javascript") {
      tempFile = tempJs;
      fs.writeFileSync(tempFile, code);
      runCommand = `node --max-old-space-size=50 ${tempFile}`;
    }

    // Python
    else if (language === "python") {
      tempFile = tempPy;
      fs.writeFileSync(tempFile, code);
      runCommand = `python ${tempFile}`;
    }

    else {
      return reject("Unsupported language");
    }

    exec(
      runCommand,
      { timeout: 3000 },
      (error, stdout, stderr) => {
        fs.unlink(tempFile, () => {}); // cleanup

        if (error) {
          if (error.killed) return reject("❌ Timeout: Code took too long");
          return reject(stderr || error.message);
        }

        resolve(stdout);
      }
    );
  });
};
