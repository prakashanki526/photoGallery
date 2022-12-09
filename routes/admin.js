const { Router } = require("express");
const route = Router();
const connection = require("../config/db");

route.get("/",validate,(req,res,next)=>{
    res.send("Hello admin");
})

route.post("/:category",(req,res) =>{
    const categoryName = req.params.category;
    const newCategory = new galleryCatgory({
        name: categoryName,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    newCategory.save();
});

route.post("/",validate,(req,res,next)=>{
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