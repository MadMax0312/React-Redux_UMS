import express  from "express";
import dotenv from "dotenv";
dotenv.config()
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 8080

import userRoutes from './routes/userRoutes.js'

const app = express()

app.use('/api/users', userRoutes)

app.get('/',(req, res)=>res.send('Hello World'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})