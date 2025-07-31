import mongoose, { Schema } from 'mongoose';
import { IContact } from '../types';

const contactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const Contact = mongoose
  .connection
  .useDb('Contacts')
  .model<IContact>('Contact', contactSchema, 'contacts');

export default Contact;
