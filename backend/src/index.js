import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app= express();
const PORT = process.env.PORT;

app.use(cookieParser());

app.use(express.json());
app.use('/api/user',userRoutes);

app.listen(PORT, () => {
    console.log(`Listening...`);
})