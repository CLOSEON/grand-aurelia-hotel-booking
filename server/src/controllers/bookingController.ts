import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Room } from '../models/Room';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      specialRequests,
      paymentMethod = 'credit_card',
      cardLastFour = '8842',
    } = req.body;

    if (!roomId || !guestName || !guestEmail || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Please provide roomId, guestName, guestEmail, checkIn, and checkOut dates.',
      });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid check-in or check-out date' });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date',
      });
    }

    // Check for overlapping active bookings
    const overlapping = await Booking.findOne({
      room: room._id,
      status: { $in: ['confirmed', 'checked-in'] },
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate },
        },
      ],
    });

    if (overlapping) {
      return res.status(409).json({
        success: false,
        message: 'This suite is already reserved for the selected date window. Please choose another date or suite.',
      });
    }

    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const totalNights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));

    const nightlyRate = room.pricePerNight;
    const basePrice = nightlyRate * totalNights;
    const cleaningFee = 150;
    const serviceFee = 95;
    const taxes = Math.round((basePrice + cleaningFee + serviceFee) * 0.12);
    const totalAmount = basePrice + cleaningFee + serviceFee + taxes;

    // Generate unique regal booking reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `GA-2026-${randomSuffix}`;

    const booking = await Booking.create({
      bookingRef,
      room: room._id,
      guestName,
      guestEmail,
      guestPhone: guestPhone || '+1 (555) 234-5678',
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: {
        adults: guests?.adults || 1,
        children: guests?.children || 0,
      },
      totalNights,
      nightlyRate,
      cleaningFee,
      serviceFee,
      taxes,
      totalAmount,
      status: 'confirmed',
      specialRequests: specialRequests || '',
      paymentMethod,
      cardLastFour: cardLastFour || '8842',
    });

    const populatedBooking = await Booking.findById(booking._id).populate('room');

    res.status(201).json({
      success: true,
      message: 'Suite reserved successfully! Concierge team notified.',
      data: populatedBooking,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const { email, status } = req.query;
    const filter: any = {};

    if (email) {
      filter.guestEmail = String(email).toLowerCase();
    }
    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .populate('room')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingByRef = async (req: Request, res: Response) => {
  try {
    const { ref } = req.params;
    const booking = await Booking.findOne({ bookingRef: ref.toUpperCase() }).populate('room');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('room');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Reservation is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Reservation cancelled successfully. Cancellation confirmation dispatched.',
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('room');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

