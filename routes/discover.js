const { Router } = require("express");
const route = Router();
const CategoryModel = require("../modules/category");
const GalleryModel = require("../modules/gallery");


route.get("/:category",async(req,res,next)=>{
    try {
        const category = req.params.category;
        console.log(category);
        if(!category){
            res.status(400).send("Bad request");
        }

        const galleryDetails = await GalleryModel.find({category: {$in: [category]}}).limit(4);
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