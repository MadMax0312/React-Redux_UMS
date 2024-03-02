import express  from "express";
import dotenv from "dotenv";
dotenv.config()

const port = process.env.PORT || 8080

const app = express()

app.get('/',(req, res)=>res.send('Hello World'))

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})