import { Request, Response } from 'express';
import { Room } from '../models/Room';
import { Booking } from '../models/Booking';

export const getConciergeStats = async (_req: Request, res: Response) => {
  try {
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: { $in: ['confirmed', 'checked-in'] } });
    
    // Total revenue aggregate
    const revenueAgg = await Booking.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    // Occupancy rate calculation
    const occupancyRate = totalRooms > 0 ? Math.min(100, Math.round((confirmedBookings / totalRooms) * 100)) : 0;

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('room', 'name roomNumber category pricePerNight');

    res.json({
      success: true,
      data: {
        totalRooms,
        totalBookings,
        confirmedBookings,
        totalRevenue,
        occupancyRate,
        recentBookings,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

