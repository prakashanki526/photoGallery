const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGODB_URI;
function connect(){
mongoose
    .connect(mongoUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>{
        console.log("Database connected successfully");
    })
    .catch((err) =>{
        console.log("Database not connected successfully " + err);
    });

const galleryCategorySchema = new mongoose.Schema({
    name: {type:String, required: true},
    createdAt: Date,
    updatedAt: Date
});
}

module.exports = connect;