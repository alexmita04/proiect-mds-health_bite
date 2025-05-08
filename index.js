if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
  console.log(process.env.PORT);
}

const express = require("express");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/health-bite");
  console.log("Connected to MongoDB");
}

const app = express();

app.get("/", (req, res) => {
  res.send("homepage");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
