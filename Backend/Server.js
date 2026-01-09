import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app=express();

dotenv.config();

const PORT=process.env.PORT || 3000;

app.use(cors({
origin:"http://localhost:5173/",
 credentials: true
}))

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Bus Booking System Backend is running');
})

app.get('/cors',(req,res)=>{
    res.send('working okay cors')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    
});