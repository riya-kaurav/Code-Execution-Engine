const { runUserCode } = require("../services/runCode");

exports.runCodeController = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: "Code or language missing" });
    }

    const output = await runUserCode(code, language);
    res.json({ output });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
