import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();


const app= express();
const PORT = process.env.PORT;


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
}));


app.use(cookieParser());

app.use(express.json());
app.use('/api/user',userRoutes);

app.listen(PORT, () => {
    console.log(`Listening...`);
})