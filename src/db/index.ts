import mongoose from 'mongoose';
// import { DB_NAME } from '../constants';

const dbConnect = async (): Promise<void> => {
  try {
    const mongoURI = process.env.DB_POOL_URI;
    const DB_NAME = process.env.DB_NAME;
    console.log('mongoURI: ', mongoURI, ' ', DB_NAME);

    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    const connectionInstance = await mongoose.connect(
      `${mongoURI}/${DB_NAME}`,
      {
        retryWrites: true,
        w: 'majority',
      }
    );

    console.log(
      `\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default dbConnect;
