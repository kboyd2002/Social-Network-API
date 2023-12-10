const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../controllers/thoughtController');

router.get('/thoughts', getAllThoughts);

router.get('/thoughts/:id', getSingleThought);

router.post('/thoughts', createThought);

router.put('/thoughts/:id', updateThought);

router.delete('/thoughts/:id', deleteThought);

router.post('/thoughts/:thoughtId/reactions', createReaction);

router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
