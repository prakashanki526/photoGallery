const { Router } = require("express");
const route = Router();
const CategoryModel = require("../modules/category");


route.get("/",(req,res)=>{
    res.send("Inside discover.");
});

route.get("/list-category",async(req,res,next)=>{
    try {
        const galleryDetails = await CategoryModel.find({});
        res.send(galleryDetails);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

route.get("/getimages",(req,res)=>{
    const image = new mongoose.model("image", imageSchema);
    image.find({category:{$all:["nature"]}},(err,found) => {
        console.log(found.slice(0,4));
    })
})

module.exports = route;