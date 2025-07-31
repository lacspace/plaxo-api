import express from 'express';
import {
  createVisitor,
  getAllVisitors,
  deleteVisitor,
} from '../controllers/visitorController';

const router = express.Router();

router.post('/', createVisitor);
router.get('/', getAllVisitors);
router.delete('/:id', deleteVisitor);

export default router;
