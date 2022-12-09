const express = require("express");
const mongoose = require("mongoose");
const connect = require("./config/db");

const app = express();

connect();

const galleryCategorySchema = new mongoose.Schema({
    name: {type:String, required: true},
    createdAt: Date,
    updatedAt: Date
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const imagesSchema = new mongoose.Schema({
    name: {type:String, required: true},
    createdAt: Date,
    updatedAt: Date,
    category: [String],
    likes: Number,
    imageLink: {type:String, required: true}
});

const galleryCatgory = new mongoose.model("galleryCategory", galleryCategorySchema);
const image = new mongoose.model("image", imagesSchema);

app.get("/health",validate,(req,res,next) =>{
    res.send(`Up and running at ${new Date()}`);
});

function validate(req,res,next){
    res.send("Something went wrong! Please try after some time.");
    next();
}

app.get("/admin",validate,(req,res,next)=>{
    res.send("Hello admin");
})

app.post("/admin/:category",(req,res) =>{
    const categoryName = req.params.category;
    const newCategory = new galleryCatgory({
        name: categoryName,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    newCategory.save();
});

app.post("/admin",validate,(req,res,next)=>{

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



const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.listen(port,(req,res) => {
    console.log(`Server started at http://${host}:${port}`);
})