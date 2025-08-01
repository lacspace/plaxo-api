import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

import contactRoutes from './routes/contactRoutes';
import serviceRoutes from './routes/serviceRoutes';
import visitorRoutes from './routes/visitorRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import promotionRoutes from './routes/promotionRoutes'
import analyticsRoutes from './routes/analyticsRoutes'
import careerRoutes from './routes/careerRoutes';

import { validateApiKey } from './middleware/validateApiKey';
import { validateTimestamp } from './middleware/validateTimestamp';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Global middleware (API key & timestamp validation)
app.use(validateApiKey);
app.use(validateTimestamp);

// Routes for all APIs
app.use('/api/contacts', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/careers', careerRoutes);

app.get('/', (_req, res) => {
  res.send('🚀 Plaxo Backend Live');
});

export default app;
