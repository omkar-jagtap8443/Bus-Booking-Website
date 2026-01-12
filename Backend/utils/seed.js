import dotenv from 'dotenv';
import connectDB from '../Config/db.js';
import BusRoute from '../Models/BusRoute.js';
import sampleRoutes from './sampleRoutes.js';

dotenv.config();

const seedRoutes = async () => {
  try {
    await connectDB();
    await BusRoute.deleteMany();
    await BusRoute.insertMany(sampleRoutes);
    console.log('✅ Sample routes seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed routes', error.message);
    process.exit(1);
  }
};

seedRoutes();
