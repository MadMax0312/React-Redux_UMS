import express from "express";
import dotenv from "dotenv";
dotenv.config()
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import userRoutes from './routes/userRoutes.js'

connectDB(); 

const app = express();
const port = process.env.PORT || 8000

app.use(express.json()) // to parse json
app.use(express.urlencoded({extended:true})) // to allow to send form data

app.use('/api/users', userRoutes)

app.get('/',(req, res)=>res.send('Hello World'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
 