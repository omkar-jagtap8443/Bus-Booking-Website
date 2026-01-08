import express from 'express';
import dotenv from 'dotenv';

const app=express();

dotenv.config();

const PORT=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Bus Booking System Backend is running');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});