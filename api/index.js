import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDb')
})

const app=express();

app.listen(3000,()=>{
    console.log('App is working on port:3000')
})