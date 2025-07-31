import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { IContact } from '../types';

export const createContact = async (req: Request, res: Response) => {
  try {
    const data: IContact = req.body;
    const newContact = await Contact.create(data);
    res.status(201).json({ message: 'Contact submitted successfully', data: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact', error });
  }
};

export const getAllContacts = async (_req: Request, res: Response) => {
  try {
    const contacts: IContact[] = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ data: contacts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact', error });
  }
};
