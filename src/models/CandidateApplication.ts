import mongoose, { Schema } from 'mongoose';
import { ICandidateApplication } from '../types';

const candidateSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  resumeUrl: String,
  coverLetter: String,
  positionApplied: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CandidateApplication = mongoose.connection.useDb('Careers').model<ICandidateApplication>('CandidateApplication', candidateSchema);
export default CandidateApplication;
