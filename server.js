const express = require("express");
const app = express();
const mongoose = require("mongoose");
const shortUrl = require("./models/short.js");

mongoose.connect("mongodb+srv://myfamily:family11@family.7usbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: false
}));


app.get("/", async(req, res) => {
    const shortUrls = await shortUrl.find();
    res.render("index.ejs", {
        shortUrls: shortUrls
    });
});

app.post("/", async(req, res) => {
    await shortUrl.create({
        fullUrl: req.body.fullUrl
    });
    res.redirect("/");
});


app.listen(process.env.PORT || 8080);
