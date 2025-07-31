import mongoose, { Schema } from 'mongoose';
import { IProject } from '../types';

const projectSchema: Schema = new Schema(
  {
    id: { type: String },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    impact: { type: String },
    tags: { type: [String], default: [] },
    details: { type: String },
    url: { type: String }
  },
  { timestamps: true }
);

const Project = mongoose
  .connection
  .useDb('Projects')
  .model<IProject>('Project', projectSchema, 'projects');

export default Project;
