const express = require("express");
const admin = require("./routes/admin");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/health",validate,(req,res,next) =>{
    res.send(`Up and running at ${new Date()}`);
});

function validate(req,res,next){
    res.send("Something went wrong! Please try after some time.");
    next();
}

app.use("/admin",admin);


// Discover route

// app.get("/discover",(req,res)=>{
//     res.send("Inside discover.");
// });

// app.get("/discover/categorylist",(req,res)=>{
//     galleryCategory.find( {},(err,found)=>{
//         const cats = [];
//         found.forEach((category)=>{
//             cats.push(category.name);
//         })
//         res.send(cats);
//     });
// })

app.use((req,res) => {
    res.status(404).send("Page not found!!");
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.listen(port,(req,res) => {
    console.log(`Server started at http://${host}:${port}`);
})