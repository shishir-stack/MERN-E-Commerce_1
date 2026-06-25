import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
const port=process.env.PORT || 4000;
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


const app =express();
app.use(express.json());
app.use(cors({
    origin:["https://mern-e-commerce-1-2.onrender.com" ,"http://localhost:5174"],
    credentials:true,
}));
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/order', orderRoutes);
app.use(express.static('public'));

app.listen(port,()=>{
    console.log(`Server Running Port ${port}`);
    connectDB();
})
