import { Request, Response } from 'express';
import Service from '../models/Service';
import { IService } from '../types';

export const createService = async (req: Request, res: Response) => {
  try {
    const data: IService = req.body;
    const newService = await Service.create(data);
    res.status(201).json({ message: 'Service added', data: newService });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error });
  }
};

export const getAllServices = async (_req: Request, res: Response) => {
  try {
    const services: IService[] = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ data: services });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service', error });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error });
  }
};
