import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import paymentRoutes from './routes/paymentRoute.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

// dotenv config
dotenv.config()

// connect Database
connectDB();

// es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')));


// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/payment', paymentRoutes);



// rest api 
app.use('*',(req, res)=>{
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})



// port & run listen
const PORT = process.env.PORT || 8778
app.listen(PORT ,()=>{
    console.log("app is listining on port " + PORT)
})
