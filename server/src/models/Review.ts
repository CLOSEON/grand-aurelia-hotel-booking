import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  room: mongoose.Types.ObjectId;
  guestName: string;
  guestLocation: string;
  avatar: string;
  rating: number;
  comment: string;
  stayDate: string;
  verifiedStay: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    guestName: {
      type: String,
      required: true,
    },
    guestLocation: {
      type: String,
      default: 'Monaco',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    stayDate: {
      type: String,
      default: 'October 2026',
    },
    verifiedStay: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<IReview>('Review', ReviewSchema);

