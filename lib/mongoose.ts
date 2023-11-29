import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', false);

  if (!process.env.MONGODB_URL) {
    return console.log('MISSING MONGODB_URL');
  }

  if (isConnected) {
    return console.log('Mongodb is already connected');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'portfolio',
    });
    isConnected = true;
    console.log('Mongodb is connected');
  } catch (error) {
    console.log('Mongodb connection failed', error);
  }
};