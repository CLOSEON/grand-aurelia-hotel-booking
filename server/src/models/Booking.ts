import mongoose, { Schema, Document } from 'mongoose';
import { IRoom } from './Room';

export interface IBooking extends Document {
  bookingRef: string;
  room: mongoose.Types.ObjectId | IRoom;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: number;
  };
  totalNights: number;
  nightlyRate: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  totalAmount: number;
  status: 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  specialRequests?: string;
  paymentMethod: 'credit_card' | 'concierge_cash' | 'crypto_vault';
  cardLastFour?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingRef: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    guestName: {
      type: String,
      required: true,
      trim: true,
    },
    guestEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    guestPhone: {
      type: String,
      required: true,
      trim: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: {
      adults: { type: Number, required: true, min: 1, default: 1 },
      children: { type: Number, default: 0, min: 0 },
    },
    totalNights: {
      type: Number,
      required: true,
      min: 1,
    },
    nightlyRate: {
      type: Number,
      required: true,
    },
    cleaningFee: {
      type: Number,
      default: 150,
    },
    serviceFee: {
      type: Number,
      default: 95,
    },
    taxes: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'checked-in', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    specialRequests: {
      type: String,
      default: '',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'concierge_cash', 'crypto_vault'],
      default: 'credit_card',
    },
    cardLastFour: {
      type: String,
      default: '8842',
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

