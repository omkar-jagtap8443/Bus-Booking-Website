import mongoose from 'mongoose';

const connectDB = async () => {
	const uri = process.env.MONGO_URI;

	if (!uri) {
		console.warn('⚠️  MONGO_URI is not defined. Backend will run without database connectivity.');
		return null;
	}

	if (mongoose.connection.readyState === 1) {
		return mongoose.connection;
	}

	try {
		const connection = await mongoose.connect(uri, {
			serverSelectionTimeoutMS: 5000,
			maxPoolSize: 10,
		});
		console.log(`✅ MongoDB connected: ${connection.connection.host}`);
		return connection;
	} catch (error) {
		console.error('❌ MongoDB connection failed:', error.message);
		throw error;
	}
};

export default connectDB;
