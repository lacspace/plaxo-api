import mongoose, { Schema } from 'mongoose';
import { IPromotion } from '../types';

const promotionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: { type: String, required: true },
  link: String,
  isActive: { type: Boolean, default: true },
  targetPage: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

const Promotion = mongoose.connection.useDb('Promotions').model<IPromotion>('Promotion', promotionSchema);
export default Promotion;