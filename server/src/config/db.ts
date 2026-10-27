import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grand_aurelia_hotel';

  mongoose.connection.on('connected', () => {
    console.log(`🛎️ [MongoDB Event] Connection established successfully to: ${mongoose.connection.host}/${mongoose.connection.name}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ [MongoDB Event] Error occurred:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ [MongoDB Event] Connection disconnected.');
  });

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`🛎️ [MongoDB] Connected successfully: ${conn.connection.host}:${conn.connection.port || 27017}/${conn.connection.name}`);
  } catch (error: any) {
    console.error('❌ [MongoDB] Initial connection error:', error.message);
    console.warn('👉 Tip: Check your MONGODB_URI in server/.env (e.g. mongodb://127.0.0.1:27017/grand_aurelia_hotel or MongoDB Atlas URI)');
  }
};
