const express = require("express");
const cors = require("cors");
const runRoute = require("./routes/codeRoutes");

const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Create temp folder if not exists
const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

app.use("/run", runRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
