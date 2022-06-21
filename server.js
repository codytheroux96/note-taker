const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;
const { notes } = require("./db/db.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });


  //need to create a unique id
  //need to make a function to create a new note
  //need to make an app.post to post the new note





app.listen(PORT, () =>
  console.info("This app is listening at http://localhost:${PORT} 🚀")
);
