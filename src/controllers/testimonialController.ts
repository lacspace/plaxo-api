import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';
import { ITestimonial } from '../types';

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const data: ITestimonial = req.body;
    const newTestimonial = await Testimonial.create(data);
    res.status(201).json({ message: 'Testimonial created successfully', data: newTestimonial });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create testimonial', error });
  }
};

export const getAllTestimonials = async (_req: Request, res: Response) => {
  try {
    const testimonials: ITestimonial[] = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ data: testimonials });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Testimonial not found' });
    res.status(200).json({ message: 'Testimonial updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update testimonial', error });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Testimonial not found' });
    res.status(200).json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete testimonial', error });
  }
};
