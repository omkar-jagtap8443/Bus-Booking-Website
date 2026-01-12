import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './Config/db.js';
import routeRoutes from './Routes/routeRoutes.js';
import bookingRoutes from './Routes/bookingRoutes.js';
import metaRoutes from './Routes/metaRoutes.js';
import { errorHandler, notFound } from './Middelware/errorHandler.js';
import compression from 'compression';

dotenv.config();



const app = express();
app.use(compression());


const PORT = process.env.PORT || 4000;
const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(origin => origin.trim())
    : ['http://localhost:5173'];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}


app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api/routes', routeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/meta', metaRoutes);

app.use(notFound);
app.use(errorHandler);

const bootstrap = async () => {
    try {
        await connectDB();
    } catch (error) {
        console.warn('Running without database connection:', error.message);
    }

    app.listen(PORT, () => {
        console.log(`🚍 Bus Booking API ready on port ${PORT}`);
    });
};

bootstrap();