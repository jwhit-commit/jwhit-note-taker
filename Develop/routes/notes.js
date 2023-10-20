const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtil');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title,text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully`);
  } else {
    res.error('Error in adding tip');
  }
});

module.exports = notes;
