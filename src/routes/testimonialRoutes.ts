import express from 'express';
import {
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController';

const router = express.Router();

router.post('/', createTestimonial);
router.get('/', getAllTestimonials);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
