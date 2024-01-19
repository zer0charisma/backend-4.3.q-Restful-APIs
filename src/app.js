const express = require("express");
const app = express();

const notes = require("./data/notes-data");

app.use(express.json());

app.get("/notes/:noteId", (req, res) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  // if noteId does NOT match and existing note
  if (foundNote === undefined) {
    res.status(400).send(`Note id not found: ${req.params.noteId}`);
  } else {
    // if noteId matches the route respond  the note
    res.json({ data: foundNote });
  }
});

app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

// DONE: Add ability to create a new note
// TODO: Add ability to create a new note
let lastNoteId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0);

app.post('/notes', (req, res, next) => {
  const { data: { text } = "" } = req.body;
  if (text) {
    const newNote = {
      id: ++lastNoteId,
      text,
    };
     notes.push(newNote);
    // respond with a 201 status code and the new note
     res.status(201).json({ data: newNote });
  }  else{
    // respond with a 400 status if req.body has no  data property
    res.sendStatus(400);
  }
});


// DONE: Add not-found handler
app.use((req, res, next) => {
   res.status(400).send(`Not found: ${req.originalUrl}`);
   next();
});

// TODO: Add error handler, return 400 
app.use((err, req, res, next) => {
   res.sendStatus(400);
});


module.exports = app;
