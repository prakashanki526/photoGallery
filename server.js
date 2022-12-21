const express = require("express");
const admin = require("./routes/admin");
const discover = require("./routes/discover");
const connection = require("./config/db");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connection();


app.get("/health",(req,res,next) =>{
    res.send(`Up and running at ${new Date()}`);
});

app.use("/admin",admin);
app.use("/discover",discover);

app.use((req,res,next) => {
    res.status(404).send("Page not found!!");
});

app.use((err,res,req,next) =>{
    res.status(500).send("Something went wrong");
});


const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.listen(port,(req,res) => {
    console.log(`Server started at http://${host}:${port}`);
})