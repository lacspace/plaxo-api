// controllers/analyticsController.ts
import { Request, Response } from 'express';
import Contact from '../models/Contact';
import Visitor from '../models/Visitor';
import Service from '../models/Service';
import Testimonial from '../models/Testimonial';
import Promotion from '../models/Promotion';
import OpenPosition from '../models/OpenPosition';
import CandidateApplication from '../models/CandidateApplication';

const getDateRange = (unit: 'week' | 'month' | 'year') => {
  const now = new Date();
  let start: Date;
  if (unit === 'week') {
    start = new Date(now);
    start.setDate(start.getDate() - 7);
  } else if (unit === 'month') {
    start = new Date(now);
    start.setMonth(start.getMonth() - 1);
  } else {
    start = new Date(now);
    start.setFullYear(start.getFullYear() - 1);
  }
  return { start, end: now };
};

const buildStats = async (Model: any, label: string) => {
  const total = await Model.countDocuments();
  const { start: weekStart, end: weekEnd } = getDateRange('week');
  const { start: monthStart, end: monthEnd } = getDateRange('month');
  const { start: yearStart, end: yearEnd } = getDateRange('year');

  const weekly = await Model.countDocuments({ createdAt: { $gte: weekStart, $lte: weekEnd } });
  const monthly = await Model.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } });
  const yearly = await Model.countDocuments({ createdAt: { $gte: yearStart, $lte: yearEnd } });

  return {
    label,
    total,
    weekly,
    monthly,
    yearly,
  };
};

export const getAllAnalyticsSummary = async (_req: Request, res: Response) => {
  try {
    const collections = [
      { model: Contact, label: 'contacts' },
      { model: Visitor, label: 'visitors' },
      { model: Service, label: 'services' },
      { model: Testimonial, label: 'testimonials' },
      { model: Promotion, label: 'promotions' },
      { model: CandidateApplication, label: 'candidateApplications' },
      { model: OpenPosition, label: 'openPositions' },
    ];

    const summary = await Promise.all(
      collections.map(({ model, label }) => buildStats(model, label))
    );

    res.status(200).json({ summary });
  } catch (error) {
    console.error('❌ Error fetching analytics summary:', error);
    res.status(500).json({ message: 'Failed to fetch analytics summary', error });
  }
};