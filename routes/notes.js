const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtil');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}); 

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title,text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note saved successfully`);
  } else {
    res.error('Error in saving note');
  }
});

// DELETE Route for a deleted note
notes.delete('/:id', (req, res) => {
  const delNote = JSON.parse(req.params.id)

  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.text !== delNote.text);

      writeToFile('./db/db.json', result);

      res.json(`Note has been deleted 🗑️`);
})});

module.exports = notes;
