import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  floor: number;
  roomNumber: string;
  images: string[];
  amenities: string[];
  highlights: string[];
  bedType: string;
  view: string;
  featured: boolean;
  isAvailable: boolean;
  badge?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Penthouse', 'Presidential Suite', 'Royal Heritage', 'Executive Brass', 'Garden Villa'],
    },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4.9, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    maxGuests: { type: Number, required: true, min: 1 },
    bedrooms: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 1 },
    sqft: { type: Number, required: true },
    floor: { type: Number, required: true },
    roomNumber: { type: String, required: true, unique: true },
    images: { type: [String], required: true },
    amenities: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    bedType: { type: String, default: 'California King' },
    view: { type: String, default: 'Panoramic Skyline' },
    featured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    badge: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model<IRoom>('Room', RoomSchema);

