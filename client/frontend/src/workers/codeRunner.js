/* eslint-disable no-restricted-globals */

self.onmessage = function (e) {
  const code = e.data;
  try {
    const consoleLogs = [];
    const customConsole = {
      log: (...args) => consoleLogs.push(args.join(" ")),
    };

    // Redirect console.log inside worker
    const result = new Function("console", code)(customConsole);

    self.postMessage({
      type: "success",
      output: consoleLogs.length ? consoleLogs.join("\n") : String(result),
    });
  } catch (err) {
    self.postMessage({ type: "error", output: err.message });
  }
};
