// routes/analyticsRoutes.ts
import express from 'express';
import { getAllAnalyticsSummary } from '../controllers/analyticsController';
const router = express.Router();

router.get('/summary', getAllAnalyticsSummary);

export default router;
