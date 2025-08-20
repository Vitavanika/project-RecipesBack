import mongoose from 'mongoose';
import 'dotenv/config';

export const initMongoConnection = async () => {
  try {
    const {
      MONGODB_USER: user,
      MONGODB_PASSWORD: password,
      MONGODB_URL: url,
      MONGODB_DB: db,
    } = process.env;

    const connectionString = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};