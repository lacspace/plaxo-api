import express from 'express';
import { subscribeNewsletter } from '../controllers/newsletterController';

const router = express.Router();

// POST /api/newsletter/subscribe
router.post('/subscribe', subscribeNewsletter);

export default router;
