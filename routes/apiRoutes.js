
const router = require('express').Router();
const storage = require('../models/Storage')


router.get('/notes', async function (req, res) {
   try {
      let notes = await storage.getAll();
      return res.json(notes)
   } catch (e) {
      res.status(500).json(e)
   }
})
router.post('/notes', async function (req, res) {
   try {
      const newNote = await storage.add(req.body);
      return res.json(newNote)
   } catch (e) {
      res.status(500).json(e)
   }
})

router.delete('/notes/:id', async (req, res) => {
   try {
      await storage.remove(req.params.id);
      return res.json({ ok: true })
   } catch (e) {
      return res.status(500).json(e)
   }

})

module.exports = router