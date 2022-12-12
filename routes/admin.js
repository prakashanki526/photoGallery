const { Router } = require("express");
const route = Router();
const CategoryModel = require("../modules/category");


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

route.post("/image",(req,res)=>{
    const image = new mongoose.model("image", imageSchema);
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


module.exports = route;