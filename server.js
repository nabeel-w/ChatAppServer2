import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dataRoute from "./routes/dataRoute.js"

dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
const mongoLink=process.env.MONGODB_URI||"mongodb://127.0.0.1:27017";

app.use(cors());

try{
    mongoose.connect(mongoLink,{
        dbName: "chatAppDB"
    });
    const db = mongoose.connection;
    db.once('open', () => {console.log('Connected to MongoDB!')});
}catch(err){
    console.log("Connection to database failed", err);
}

app.use("/api/user", dataRoute);

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});