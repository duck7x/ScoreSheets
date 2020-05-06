var express			= require("express"),
	app				= express(),
	mongoose		= require("mongoose"),
	bodyParser		= require("body-parser"),
	methodOverride	= require("method-override");

// requiring routes
var gamesRoutes	= require("./routes/games"),
	aboutRoutes	= require("./routes/about"),
	indexRoutes	= require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use("/", indexRoutes);
app.use("/games", gamesRoutes);
app.use("/about", aboutRoutes);

app.listen(3000, function(){
	console.log("ScoreSheets is up!")
});