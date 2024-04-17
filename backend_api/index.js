import express from 'express';
import connectToMongoDB from './mongoDB/connectToMongoDB.js';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, async () => {
    await connectToMongoDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});
