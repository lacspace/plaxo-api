import { Request, Response } from 'express';
import OpenPosition from '../models/OpenPosition';
import CandidateApplication from '../models/CandidateApplication';

export const createOpenPosition = async (req: Request, res: Response) => {
  try {
    const position = await OpenPosition.create(req.body);
    res.status(201).json({ message: 'Position created', data: position });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create position', error });
  }
};

export const getOpenPositions = async (_req: Request, res: Response) => {
  try {
    const positions = await OpenPosition.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ data: positions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch positions', error });
  }
};

export const deleteOpenPosition = async (req: Request, res: Response) => {
  try {
    const deleted = await OpenPosition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Position not found' });
    res.status(200).json({ message: 'Position deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete position', error });
  }
};

export const applyForPosition = async (req: Request, res: Response) => {
  try {
    const application = await CandidateApplication.create(req.body);
    res.status(201).json({ message: 'Application submitted', data: application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application', error });
  }
};
