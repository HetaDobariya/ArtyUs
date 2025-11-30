import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import traderRoutes from './routes/traderRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import productRoutes from './routes/productRoutes.js'
import serviceproviderRoutes from './routes/serviceProviderRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import serviceBookingRoutes from './routes/serviceBookingRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';

dotenv.config();

const app= express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));


app.use(cookieParser());

app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/trader',traderRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/product',productRoutes);
app.use('/api/serviceprovider',serviceproviderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/service-booking', serviceBookingRoutes);
app.use('/api/service', serviceRoutes);

app.listen(PORT, () => {
    console.log(`Listening...`);
})