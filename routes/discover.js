const { Router } = require("express");
const mongoose = require("mongoose");
const connection = require("../config/db");

const route = Router();

connection();

const galleryCategorySchema = new mongoose.Schema({
    name: {type:String, required: true},
    createdAt: Date,
    updatedAt: Date
});

const imageSchema = new mongoose.Schema({
    name: {type:String, required: true},
    createdAt: Date,
    updatedAt: Date,
    category: [String],
    likes: Number,
    imageLink: {type:String, required: true}
});


route.get("/",(req,res)=>{
    res.send("Inside discover.");
});

route.get("/categorylist",(req,res)=>{
    const galleryCategory = new mongoose.model("galleryCategory", galleryCategorySchema);

    galleryCategory.find( {},(err,found)=>{
        const cats = [];
        found.forEach((category)=>{
            cats.push(category.name);
        })
        res.send(cats);
    });
});

route.get("/getimages",(req,res)=>{
    const image = new mongoose.model("image", imageSchema);
    image.find({category:{$all:["nature"]}},(err,found) => {
        console.log(found.slice(0,4));
    })
})

module.exports = route;