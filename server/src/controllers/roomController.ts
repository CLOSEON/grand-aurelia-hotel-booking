import { Request, Response } from 'express';
import { Room } from '../models/Room';
import { Review } from '../models/Review';
import { Booking } from '../models/Booking';

export const getRooms = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, guests, search, sortBy } = req.query;

    const filter: any = {};

    if (category && category !== 'All Suites') {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }

    if (guests) {
      filter.maxGuests = { $gte: Number(guests) };
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { shortDescription: searchRegex },
        { amenities: searchRegex },
        { view: searchRegex },
      ];
    }

    let query = Room.find(filter);

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        query = query.sort({ pricePerNight: 1 });
        break;
      case 'price_desc':
        query = query.sort({ pricePerNight: -1 });
        break;
      case 'rating':
        query = query.sort({ rating: -1, reviewCount: -1 });
        break;
      case 'popular':
      default:
        query = query.sort({ featured: -1, rating: -1 });
        break;
    }

    const rooms = await query.exec();
    res.json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const reviews = await Review.find({ room: room._id }).sort({ createdAt: -1 });
    
    // Also fetch active booking date ranges so client calendar can block out unavailable dates
    const activeBookings = await Booking.find({
      room: room._id,
      status: { $in: ['confirmed', 'checked-in'] },
      checkOut: { $gte: new Date() },
    }).select('checkIn checkOut');

    res.json({
      success: true,
      data: {
        ...room.toObject(),
        reviews,
        bookedDates: activeBookings.map((b) => ({
          start: b.checkIn,
          end: b.checkOut,
        })),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    res.json({ success: true, data: room });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    res.json({ success: true, message: 'Room removed from inventory' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

