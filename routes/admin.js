const { Router } = require("express");
const route = Router();
const mongoose = require("mongoose");
const connection = require("../config/db");

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

const galleryCategory = new mongoose.model("galleryCategory", galleryCategorySchema);
const image = new mongoose.model("image", imageSchema);

route.get("/",(req,res)=>{
    res.send("Hello admin");
})

route.post("/category",validate,(req,res,next) =>{
    const categoryName = req.body.category;
    const newCategory = new galleryCategory({
        name: categoryName,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    galleryCategory.findOne({name: categoryName},(err,found)=>{
        if(!found){
            newCategory.save();
        }
    });
});

route.post("/image",validate,(req,res,next)=>{
    const newImage = new image({
        name: req.body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: req.body.categories,
        likes: 0,
        imageLink: req.body.link
    })
    newImage.save();
});

function validate(req,res,next){
    res.send("Something went wrong! Please try after some time.");
    next();
}

module.exports = route;