const { Router } = require("express");
const route = Router();
const CategoryModel = require("../modules/category");
const GalleryModel = require("../modules/gallery");


route.get("/:category/:shuffle",async(req,res,next)=>{
    try {
        const category = req.params.category;
        const sortByDate = req.query.sortByDate;
        const filterByLike = req.query.filterByLike;
        const shuffle = req.params.shuffle;

        // console.log("Hello");

        let skip = parseInt(shuffle) || 0;

        let sort = 1;
        if(sortByDate == "asc"){
            sort = 1;
        }
        else if(sortByDate == "dsc"){
            sort = -1;
        }

        let filter = {};
        if (filterByLike) {
            filter = { likes: 1 };
        }

        if(!category){
            res.status(400).send("Bad request");
        }

        const galleryDetails = await GalleryModel.find({category: {$in: [category]},...filter}).skip(skip).limit(4).sort({createdAt:sort});
        res.json(galleryDetails);
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