import express from 'express';
import connectToMongoDB from './MongoDB/connectToMongoDB.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


app.listen(process.env.PORT, async () => {
    await connectToMongoDB();
    console.log('Server is running on port 5004');
});