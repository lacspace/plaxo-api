import { Request, Response } from 'express';
import Promotion from '../models/Promotion';

export const createPromotion = async (req: Request, res: Response) => {
  try {
    const newPromo = await Promotion.create(req.body);
    res.status(201).json({ message: 'Promotion created', data: newPromo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create promotion', error });
  }
};

export const getActivePromotions = async (_req: Request, res: Response) => {
  try {
    const promotions = await Promotion.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ data: promotions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch promotions', error });
  }
};

export const updatePromotion = async (req: Request, res: Response) => {
  try {
    const updated = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Promotion not found' });
    res.status(200).json({ message: 'Promotion updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update promotion', error });
  }
};

export const deletePromotion = async (req: Request, res: Response) => {
  try {
    const deleted = await Promotion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Promotion not found' });
    res.status(200).json({ message: 'Promotion deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete promotion', error });
  }
};
