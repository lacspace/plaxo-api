import { Request, Response } from 'express';
import Story from '../models/Story';
import { IStory } from '../types';

export const createStory = async (req: Request, res: Response) => {
  try {
    const story: IStory = req.body;
    const created = await Story.create(story);
    res.status(201).json({ message: 'Story created', data: created });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create story', error });
  }
};

export const getAllStories = async (_req: Request, res: Response) => {
  try {
    const stories = await Story.find().sort({ publishedAt: -1 });
    res.status(200).json({ data: stories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stories', error });
  }
};

export const getStoryBySlug = async (req: Request, res: Response) => {
  try {
    const story = await Story.findOne({ slug: req.params.slug });
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.status(200).json({ data: story });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving story', error });
  }
};

export const updateStory = async (req: Request, res: Response) => {
  try {
    const updated = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Story not found' });
    res.status(200).json({ message: 'Story updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update story', error });
  }
};

export const deleteStory = async (req: Request, res: Response) => {
  try {
    const deleted = await Story.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Story not found' });
    res.status(200).json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete story', error });
  }
};
