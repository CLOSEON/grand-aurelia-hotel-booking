import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import statsRoutes from './routes/statsRoutes';
import { Room } from './models/Room';
import { Booking } from './models/Booking';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB().then(async () => {
  // Auto-seed if database is brand new
  try {
    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
      console.log('📦 [Server] Database is empty. Running initial luxury catalog seed...');
      const { exec } = await import('child_process');
      exec('npm run seed', (error, stdout) => {
        if (error) console.error('Seed execution error:', error);
        else console.log(stdout);
      });
    }
  } catch (err) {
    console.error('Auto-seed check warning:', err);
  }
});

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/stats', statsRoutes);

// Health & MongoDB connection check endpoint
app.get('/api/health', async (_req, res) => {
  const readyStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const state = mongoose.connection.readyState;
  let roomCount = 0;
  let bookingCount = 0;
  try {
    if (state === 1) {
      roomCount = await Room.countDocuments();
      bookingCount = await Booking.countDocuments();
    }
  } catch (e) {}

  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    hotel: 'The Grand Aurelia Palace & Suites',
    version: '1.0.0',
    mongodb: {
      status: readyStates[state] || 'unknown',
      connected: state === 1,
      host: mongoose.connection.host || '127.0.0.1',
      port: mongoose.connection.port || 27017,
      database: mongoose.connection.name || 'grand_aurelia_hotel',
      totalRoomsInDb: roomCount,
      totalBookingsInDb: bookingCount,
    },
  });
});

// Serve frontend static build if built
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));

app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('Grand Aurelia API is running. Start the client dev server or run `npm run build` to view web UI.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  🛎️  THE GRAND AURELIA — HERITAGE SUITES & CONCIERGE API       ║
║  📍  Server running at: http://localhost:${PORT}                  ║
║  📦  Database: MongoDB (grand_aurelia_hotel)                     ║
║  🔑  Status: PRODUCTION READY                                    ║
╚══════════════════════════════════════════════════════════════════╝
  `);
});

