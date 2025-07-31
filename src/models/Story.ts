import mongoose, { Schema } from 'mongoose';
import { IStory } from '../types';

const storySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    project: { type: String, required: true },
    industry: { type: String, required: true },
    thumbnail: { type: String, required: true },
    summary: { type: String, required: true },
    impact: { type: [String], default: [] },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, required: true },
    author: { type: String },
  },
  { timestamps: true }
);

const Story = mongoose
  .connection
  .useDb('Stories')
  .model<IStory>('Story', storySchema, 'stories');

export default Story;
