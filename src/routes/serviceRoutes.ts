import express from 'express';
import {
  createService,
  getAllServices,
  updateService,
  deleteService,
} from '../controllers/serviceController';

const router = express.Router();

router.post('/', createService);
router.get('/', getAllServices);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
