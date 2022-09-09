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
      try {
         const allNotes = await this.read()
         const parsedNotes = [].concat(JSON.parse(allNotes));
         return parsedNotes
      } catch (err) {
         return []
      }
   }

   async add(note) {
      if (!note.title || !note.text) {
         throw new Error("Missing Content, Please enter a title AND text field")
      }

      const newNote = new Note(note.title, note.text)
      try {
         let allNotes = await this.getAll()
         const updatedNotes = [...allNotes, newNote]
         await this.write(updatedNotes);
         return newNote;
      } catch (e) {
         console.log(e)
      }
   }
   async remove(id) {
      try {
         const data = await this.getAll()
         const filtered = data.filter(note => note.id !== id);
         return await this.write(filtered)
      } catch (e) {
         console.log(e)

      }
   }
}

module.exports = new Storage();