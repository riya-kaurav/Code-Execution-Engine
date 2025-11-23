const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const problemsDir = path.join(__dirname, "..", "problems");

// GET all problems
router.get("/", (req, res) => {
    try {
        const files = fs.readdirSync(problemsDir);
        const problems = files.map((file) => {
            const data = JSON.parse(
                fs.readFileSync(path.join(problemsDir, file), "utf8")
            );
            return {
                id: data.id,
                title: data.title,
                description: data.description,
            };
        });
        res.json(problems);
    } catch (error) {
        console.error("Error reading problems:", error);
        res.status(500).json({ error: "Could not load problems" });
    }
});

// GET single problem
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const filePath = path.join(problemsDir, `${id}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Problem not found" });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(data);
});

module.exports = router;
