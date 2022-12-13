const { Router } = require("express");
const route = Router();
const CategoryModel = require("../modules/category");
const GalleryModel = require("../modules/gallery");


route.get("/",(req,res)=>{
    res.send("Hello admin");
})

route.post("/add-category/:categoryName",async(req,res,next) =>{
    try {
        const categoryName = req.params.categoryName;
        if(!categoryName){
            res.status(400).send("Bad request");
        }

        const newCategory = {name: categoryName};
        await CategoryModel.create(newCategory);
        res.send("Category added.");

    } catch (error) {
        console.log(error);
        next(error);
    }
});

route.post("/add-image",async(req,res,next)=>{
    try {
        const imageName = req.body.name;
        const category = req.body.category;
        const imageLink = req.body.link;

        if(!imageName || !category || !imageLink){
            res.status(400).send("Bad request");
        }

        const newImage = {name: imageName, category: category, imageUrl: imageLink};
        await GalleryModel.create(newImage);
        res.send("Image added.");
    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = route;