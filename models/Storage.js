const util = require('util');
const fs = require('fs');
path = require('path');
const Note = require('./Note')
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


class Storage {

   read() {
      return readFileAsync(path.join(__dirname, '../db/db.json'), "utf8");
   }

   write(note) {
      return writeFileAsync(path.join(__dirname, '../db/db.json'), JSON.stringify(note));
   }

   async getAll() {

      return this.read().then((notes) => {
         let parsedData;
         try {
            parsedData = [].concat(JSON.parse(notes));
         } catch (e) {
            parsedData = []
         }
         return parsedData
      })
   }

   add(note) {
      const newNote = new Note(note.title, note.text)

      return this.getAll()
         .then(notes => [...notes, newNote]).then(updated => this.write(updated))
         .then(() => newNote)
   }
   remove(id) {
      return this.getAll().then((data) => {
         return data.filter(data => data.id !== id)
      }).then(filtered => {
         this.write(filtered)
      })
   }
}

module.exports = new Storage();