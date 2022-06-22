//list my dependencies
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

//listing my routes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//this post will create a new note and display it to the page
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
//found this method for app.delete online
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const delNote = notes.findIndex(note => note.id ==id);
  notes.splice(delNote, 1);
  return res.send();
});

//shows the app is listening and running on the port we want it to
app.listen(PORT, () =>
  console.info(`This app is listening at http://localhost:${PORT} 🚀`)
);
