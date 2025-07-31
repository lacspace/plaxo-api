import mongoose, { Schema } from 'mongoose';
import { ITestimonial } from '../types';

const testimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    image: { type: String, required: true },
    quote: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const Testimonial = mongoose
  .connection
  .useDb('Testimonials')
  .model<ITestimonial>('Testimonial', testimonialSchema, 'testimonials');

export default Testimonial;
