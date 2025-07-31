import { Request, Response } from 'express';
import Project from '../models/Project';
import { IProject } from '../types';

export const createProject = async (req: Request, res: Response) => {
  try {
    const data: IProject = req.body;
    const newProject = await Project.create(data);
    res.status(201).json({ message: 'Project created successfully', data: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error });
  }
};

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects: IProject[] = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error });
  }
};
