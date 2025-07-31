import mongoose, { Schema } from 'mongoose';
import { INewsletter } from '../types';

const newsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true },
    message: { type: String, default: 'Welcome to the Lacspace Family!' },
    uuid: { type: String, required: true, unique: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Newsletter = mongoose
  .connection
  .useDb('Newsletter')
  .model<INewsletter>('Subscriber', newsletterSchema, 'subscriber');

export default Newsletter;
