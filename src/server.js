const express = require("express");
const { hello } = require("./index");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: hello("AIOSS Week 9"),
    status: "ok"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(port, () => {
  console.log(`AIOSS app listening on port ${port}`);
});