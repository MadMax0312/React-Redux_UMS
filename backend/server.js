import express from "express";
import dotenv from "dotenv";
dotenv.config()
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'

connectDB(); 

const app = express();
const port = process.env.PORT || 8000

app.use(express.json()) // to parse json
app.use(express.urlencoded({extended:true})) // to allow to send form data

app.use(cookieParser())

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/',(req, res)=>res.send('Hello World'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
 