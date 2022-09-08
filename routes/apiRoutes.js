
const router = require('express').Router();
const storage = require('../models/Storage')
// router.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname, '../public/notes.html'));
// })

router.get('/notes', function (req, res) {
   storage
      .getAll().then((notes) => {
         return res.json(notes)
      }).catch(e => res.status(500).json(e))
})
router.post('/notes', function (req, res) {

   storage
      .add(req.body).then((newNote) => {
         return res.json(newNote)
      }).catch(e => res.status(500).json(e))
})

router.delete('/notes/:id', (req, res) => {
   storage
      .remove(req.params.id)
      .then(() => res.json(200))
      .catch((e) => res.json(500).json(e))
})

module.exports = router