// folosim pachetul dotnev numai daca nu suntem in productie
// pentru a incarca variabilele de mediu din fisierul .env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
  console.log(process.env.PORT);
}

const express = require("express");
const mongoose = require("mongoose");

// conectam la baza de date MongoDB folosind Mongoose
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/health-bite");
  console.log("Connected to MongoDB");
}

// crearea unei aplicatii Express
const app = express();

app.get("/", (req, res) => {
  res.send("homepage");
});

const PORT = process.env.PORT || 3000; // definirea portului dinamic, avand un default de 3000
app.listen(PORT, () => {});
