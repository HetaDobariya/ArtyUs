import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app= express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/user',userRoutes);

app.listen(PORT, () => {
    console.log(`Listening...`);
})