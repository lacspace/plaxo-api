import express from 'express';
import {
  createDemoRequest,
  getAllDemoRequests,
  deleteDemoRequest,
} from '../controllers/demoRequestController';

const router = express.Router();

router.post('/', createDemoRequest);
router.get('/', getAllDemoRequests);
router.delete('/:id', deleteDemoRequest);

export default router;
