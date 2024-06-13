import mongoose from 'mongoose';
import config from './config';

const connectDB = async () => {
    const { url} = config.database;

    try {
        await mongoose.connect(url);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

export default connectDB;