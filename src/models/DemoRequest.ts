import mongoose, { Schema } from 'mongoose';
import { IDemoRequest } from '../types';

const demoRequestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String },
    company: { type: String },
    service: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

// Bind to "DemoRequests" database and "requests" collection
const DemoRequest = mongoose
  .connection
  .useDb('DemoRequests')
  .model<IDemoRequest>('Request', demoRequestSchema, 'requests');

export default DemoRequest;
