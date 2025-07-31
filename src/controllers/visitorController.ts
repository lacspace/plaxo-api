import { Request, Response } from 'express';
import Visitor from '../models/Visitor';
import { IVisitor } from '../types';

export const createVisitor = async (req: Request, res: Response) => {
  try {
    const data: IVisitor = {
      ip: req.body.ip || req.ip,
      location: req.body.location || 'Unknown',
      deviceInfo: req.body.deviceInfo,
      userAgent: req.headers['user-agent'] || '',
    };
    const newVisitor = await Visitor.create(data);
    res.status(201).json({ message: 'Visitor logged', data: newVisitor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to log visitor', error });
  }
};

export const getAllVisitors = async (_req: Request, res: Response) => {
  try {
    const visitors: IVisitor[] = await Visitor.find().sort({ createdAt: -1 });
    res.status(200).json({ data: visitors });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch visitors', error });
  }
};

export const deleteVisitor = async (req: Request, res: Response) => {
  try {
    const deleted = await Visitor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Visitor not found' });
    res.status(200).json({ message: 'Visitor deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete visitor', error });
  }
};
