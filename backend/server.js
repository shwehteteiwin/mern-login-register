import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import authRouthes from './routes/authRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 5000
const app = express();

// app.get('/',(req,res)=>{
//     res.send("Hello World")
// })

app.use(express.json());
app.use("/api/users",authRouthes)

connectDB();

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})
