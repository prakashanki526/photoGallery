const express = require("express");
const admin = require("./routes/admin");
const discover = require("./routes/discover");

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

app.use("/discover",discover);

app.use((req,res) => {
    res.status(404).send("Page not found!!");
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.listen(port,(req,res) => {
    console.log(`Server started at http://${host}:${port}`);
})