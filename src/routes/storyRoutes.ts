import express from 'express';
import {
  createStory,
  getAllStories,
  getStoryBySlug,
  updateStory,
  deleteStory
} from '../controllers/storyController';

const router = express.Router();

router.post('/', createStory);
router.get('/', getAllStories);
router.get('/:slug', getStoryBySlug);
router.put('/:id', updateStory);
router.delete('/:id', deleteStory);

export default router;
