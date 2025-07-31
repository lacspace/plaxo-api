import express from 'express';
import {
  createPromotion,
  getActivePromotions,
  updatePromotion,
  deletePromotion,
} from '../controllers/promotionController';
const router = express.Router();

router.post('/', createPromotion);
router.get('/', getActivePromotions);
router.put('/:id', updatePromotion);
router.delete('/:id', deletePromotion);

export default router;
