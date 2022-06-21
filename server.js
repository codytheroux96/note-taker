const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT =  3001;
const { notes } = require("./db/db.json");
const { uuid } = require("./utils/utils.js");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
app.get("/api/notes", (req, res) => {
    res.json(notes);
  });
  
  // function createNewNote(body, notesArray) {
  //   const note = body;
  //   notesArray.push(note);
  //   fs.writeFileSync(
  //     path.join(__dirname, './db/db.json'),
  //     JSON.stringify({ notes: notesArray }, null, 2)
  //   );
  //   return note;
  // };  
  
  // app.post('/api/notes', (req, res) => {
  //   req.body.id = uuid();
  //   const note = createNewNote(req.body, notes);
  //   res.json(note);
  // });
  


// app.post('/api/notes', (req, res) => {
//   const { title, text, } = req.body;
//   if (title && text ) {
//     const newNote = {
//       title,
//       text,
//       review_id: uuid(),
//     };
//     const noteString = JSON.stringify(newNote);
//     fs.writeFile(`./db/db.json`, noteString, (err) =>{}
//     );

//     const response = {
//       status: 'success',
//       body: newReview,
//     }};
//   });
  

  //need to make a function to create a new note
  //need to make an app.post to post the new note



app.listen(PORT, () =>
  console.info(`This app is listening at http://localhost:${PORT} 🚀`)
);
