import mongoose, { Schema } from 'mongoose';
import { IAnalytics } from '../types';

const analyticsSchema: Schema = new Schema({
  ip: { type: String, required: true },
  device: String,
  os: String,
  browser: String,
  page: { type: String, required: true },
  referrer: String,
  timestamp: { type: Date, default: Date.now },
  location: String,
  userAgent: String,
});

const Analytics = mongoose.connection.useDb('Analytics').model<IAnalytics>('Analytics', analyticsSchema);
export default Analytics;
