import { Request, Response } from 'express';
import DemoRequest from '../models/DemoRequest';
import { IDemoRequest } from '../types';

export const createDemoRequest = async (req: Request, res: Response) => {
  try {
    const data: IDemoRequest = req.body;
    const newRequest = await DemoRequest.create(data);
    res.status(201).json({ message: 'Demo request submitted', data: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting demo request', error });
  }
};

export const getAllDemoRequests = async (_req: Request, res: Response) => {
  try {
    const requests: IDemoRequest[] = await DemoRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ data: requests });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching demo requests', error });
  }
};

export const deleteDemoRequest = async (req: Request, res: Response) => {
  try {
    const deleted = await DemoRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Demo request not found' });
    res.status(200).json({ message: 'Demo request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting demo request', error });
  }
};
