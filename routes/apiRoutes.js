const  notes  = require("../db/db.json");
const router = require('express').Router();
const { uuid } = require("../utils/utils");
const fs = require("fs");
const { response } = require("express");



router.get('/notes', (req,res)=>{
    res.json(notes)
})

router.post('/notes', (req, res) => {
    const { title, text, } = req.body;
    if (title && text) {
      const newNote = {
        title,
        text,
        review_id: uuid(),
      };
      console.log(notes)
      //notes.push(newNote)
      let noteString = JSON.stringify((newNote), null, 2);
      fs.writeFile(`../db/db.json`, noteString, () => {
       const response = {
          body: noteString,
        }
      })
   
    };
    console.log(notes)
   // notes.push(response);
     res.json(notes)
  });
  


module.exports = router