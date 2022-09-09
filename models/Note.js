const { v4: uuidv4 } = require('uuid');
class Note {
   constructor(title, text) {
      this.title = title,
         this.text = text,
         this.id = uuidv4();
   }

}

module.exports = Note;