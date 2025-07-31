import express from 'express';
import {
  createOpenPosition,
  getOpenPositions,
  deleteOpenPosition,
  applyForPosition,
} from '../controllers/careerController';

const router = express.Router();

router.post('/positions', createOpenPosition);
router.get('/positions', getOpenPositions);
router.delete('/positions/:id', deleteOpenPosition);
router.post('/apply', applyForPosition);

export default router;
