import mongoose, { Schema } from 'mongoose';
import { IOpenPosition } from '../types';

const openPositionSchema: Schema = new Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  description: String,
  location: String,
  isRemote: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const OpenPosition = mongoose.connection.useDb('Careers').model<IOpenPosition>('OpenPosition', openPositionSchema);
export default OpenPosition;
