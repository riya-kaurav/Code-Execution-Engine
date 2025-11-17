self.onmessage = function (e) {
  const userCode = e.data;

  try {
    // Protect against infinite loops
    const wrappedCode = `
      let __start = Date.now();
      function __check() {
        if (Date.now() - __start > 1000) {
          throw new Error("Time Limit Exceeded (TLE)");
        }
      }

      // Insert loop checks
      const safeCode = \`${userCode.replace(/for|while|do/g, match => match + "; __check();")}\`;

      (function() {
        "use strict";
        const window = undefined;
        const document = undefined;
        const localStorage = undefined;
        const fetch = undefined;

        return eval(safeCode);
      })();
    `;

    const result = eval(wrappedCode);

    self.postMessage({ type: "success", output: String(result) });
  } catch (err) {
    self.postMessage({ type: "error", output: err.message });
  }
};
