const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;
const notes = require("./db/db.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });






app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);
