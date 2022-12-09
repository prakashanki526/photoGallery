
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