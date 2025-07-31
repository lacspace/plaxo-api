import mongoose, { Schema } from 'mongoose';
import { IService } from '../types';

const serviceSchema: Schema = new Schema(
  {
    icon: { type: String, required: true }, // e.g., "bot", "bar-chart"
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Service = mongoose
  .connection
  .useDb('Services')
  .model<IService>('Service', serviceSchema, 'services');

export default Service;
