const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const app = express();

const mongoUrl = process.env.MONGODB_URI;

mongoose
    .connect(mongoUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>{
        console.log("Database connected successfully");
    })
    .catch((err) =>{
        console.log("Database not connected successfully " + err);
    });

const galleryCategorySchema = new mongoose.Schema({
    name: {type:String, required: true},
    createdAt: Date,
    updatedAt: Date
});

const imagesSchema = new mongoose.Schema({
    name: {type:String, required: true},
    createdAt: Date,
    updatedAt: Date,
    category: [String],
    likes: Number,
    imageLink: {type:String, required: true}
});


app.get("/health",(req,res) =>{
    res.send(`Up and running at ${new Date()}`);
})






const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.listen(port,(req,res) => {
    console.log(`Server started at http://${host}:${port}`);
})