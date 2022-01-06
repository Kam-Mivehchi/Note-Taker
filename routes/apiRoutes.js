const router = require('express').Router();
//const store = require('../db/store');
const util = require('util');
const fs = require('fs');

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require('../uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//class object that handles reading and writing to a json db;also handles getting the db, adding to db and deleteing db objects
class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      // error handling will return an empty array if nothing is found
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  add(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  remove(id) {
    // calls the get note function then filters the object to only contain the non-selected notes, returns a new object without the deleted note
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}
// GET "/api/notes" returns all the previously added notes
router.get('/notes', (req, res) => {
  new Store()
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});
//allows the user input to be stored in the db.json file
router.post('/notes', (req, res) => {
  
  new Store()
    .add(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
    
});

// DELETE "/api/notes" deletes the note with an id equal to users selection
router.delete('/notes/:id', (req, res) => {
  new Store()
    .remove(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
