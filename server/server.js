const express = require("express");
const cors = require("cors");
const path = require("path");

const problemRoutes = require("./routes/problems");
const submitRoutes = require("./routes/submit");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", problemRoutes);
app.use("/api", submitRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
