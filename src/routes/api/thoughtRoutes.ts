import { Router } from 'express';

const router = Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thoughtController');
  
  // Thought routes
  router.route('/')
    .get(getAllThoughts)
    .post(createThought);
  
  router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
  
  // Reaction routes
  router.route('/:thoughtId/reactions')
    .post(addReaction);
  
  router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

    export default router;