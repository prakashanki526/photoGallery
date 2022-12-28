const { Router } = require("express");
const route = Router();
const CategoryModel = require("../modules/category");
const GalleryModel = require("../modules/gallery");

route.get("/",(req,res) =>{
    res.send("Hello");
})

route.get("/get-categories", async(req,res,next) =>{
    try{
        const categories = await CategoryModel.find({});
        res.send(categories);
    } catch(error) {
        console.log(error);
        next(error);
    }
})

route.get("/api",async(req,res,next)=>{
    try {
        const category = req.query.category;
        const sortByDate = req.query.sortByDate;
        const filterByLike = req.query.filterByLike;
        const shuffle = req.query.shuffle;

        if(!category){
            res.status(400).send("Bad request");
            return;
        }
        
        let skip = parseInt(shuffle) || 0;
        
        let sort = 1;
        if(sortByDate == "asc"){
            sort = 1;
        }
        else if(sortByDate == "dsc"){
            sort = -1;
        }
        let filter = {};
        if (filterByLike == "true") {
            filter = { likes: 1 };
        }
        const galleryDetails = await GalleryModel.find({category: {$in: [category]},...filter}).skip(skip).limit(4).sort({createdAt:sort});
        // res.send("Hii");
        res.json({galleryDetails});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

route.get("/like/:imageId", async (req, res, next) => {
    try {
        const imageId = req.params.imageId;

        if (!imageId) {
            res.status(400).send("Bad Request");
        }

        let likeValue;

        const imageDetails = await GalleryModel.findOne({ _id: imageId });

        let toggleLike = "";

        if (imageDetails) {
            if (imageDetails.likes) {
                likeValue = 0;
                toggleLike = "Removed from favourites.";
            } else {
                likeValue = 1;
                toggleLike = "Added to favourites";
            }
        }

        await GalleryModel.updateOne(
            { _id: imageId },
            { $set: { likes: likeValue } }
        );

        res.send(toggleLike);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = route;