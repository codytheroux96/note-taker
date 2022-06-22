const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const notes = require("./db/db.json");
const { uuid } = require("./utils/utils");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    notes.push(newNote);
    let noteArray = JSON.stringify((notes), null, 2);
    fs.writeFile(`./db/db.json`, noteArray, () => {
      const response = {
        body: newNote,
      }
      res.json(response);
    })
  };;
});



app.listen(PORT, () =>
  console.info(`This app is listening at http://localhost:${PORT} 🚀`)
);
