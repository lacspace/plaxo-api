import mongoose, { Schema } from 'mongoose';
import { IVisitor } from '../types';

const visitorSchema: Schema = new Schema(
  {
    ip: { type: String, required: true },
    location: { type: String },
    deviceInfo: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Visitor = mongoose
  .connection
  .useDb('Visitors')
  .model<IVisitor>('Visitor', visitorSchema, 'visitors');

export default Visitor;
