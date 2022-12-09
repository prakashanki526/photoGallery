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
app.use(express.urlencoded());

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

app.get("/health",(req,res) =>{
    res.send(`Up and running at ${new Date()}`);
})

app.get("/admin",(req,res)=>{
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

app.post("/admin",(req,res)=>{

})





const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.listen(port,(req,res) => {
    console.log(`Server started at http://${host}:${port}`);
})