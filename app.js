var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/sosdb");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var bachelors = [
    {name: "Ran", image: "https://static.miraheze.org/ranchstorywiki/thumb/d/d5/Ch_Ran_2_%28Story_of_Seasons_FoMT%29.png/112px-Ch_Ran_2_%28Story_of_Seasons_FoMT%29.png"},
    {name: "Popuri", image: "https://static.miraheze.org/ranchstorywiki/thumb/1/10/Ch_Popuri_%28Story_of_Seasons_FoMT%292.png/129px-Ch_Popuri_%28Story_of_Seasons_FoMT%292.png"},
    {name: "Gray", image: "https://static.miraheze.org/ranchstorywiki/thumb/0/01/Ch_Gray_%28Story_of_Seasons_FoMT%29.png/74px-Ch_Gray_%28Story_of_Seasons_FoMT%29.png"}
]


app.get("/", function(req, res){
    res.render("index.ejs");
});

app.get("/bachelors", function(req, res){
    res.render("bachelors.ejs", {bachelors:bachelors});
});

app.post("/bachelors", function(req, res){
    //get data from form and add to bachelors array
    var name = req.body.name;
    var image = req.body.image;
    var newBachelor = {name: name, image: image};
    bachelors.push(newBachelor);

    //redirect back to bachelors page
    res.redirect("/bachelors");
});

app.get("/bachelors/new", function(req, res){
    res.render("new/bachelor.ejs");
})

app.listen(process.env.PORT || 3001, process.env.IP, function(){
    console.log("SoS has started!");
});