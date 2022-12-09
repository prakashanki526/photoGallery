const express = require("express");
const mongoose = require("mongoose");
const connection = require("./config/db");
// const admin = require("./routes/admin");

const app = express();

connection();

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

// app.use("/admin",admin);

app.get("/admin",(req,res)=>{
    res.send("Hello admin");
})

app.post("/admin/:category",validate,(req,res,next) =>{
    const categoryName = req.params.category;
    const newCategory = new galleryCatgory({
        name: categoryName,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    galleryCatgory.findOne({name: categoryName},(err,found)=>{
        if(found.name!=categoryName){
            newCategory.save();
        }
    })
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

app.use((req,res) => {
    res.status(404).send("Page not found!!");
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.listen(port,(req,res) => {
    console.log(`Server started at http://${host}:${port}`);
})