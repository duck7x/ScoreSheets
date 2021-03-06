var express			= require("express"),
	app				= express(),
	User			= require("./models/user"),
	flash			= require("connect-flash");
	seedDB			= require("./seeds"),
	passport		= require("passport"),
	mongoose		= require("mongoose"),
	bodyParser		= require("body-parser"),
	localStrategy	= require("passport-local"),
	methodOverride	= require("method-override");

// requiring routes
var gamesRoutes	= require("./routes/games"),
	aboutRoutes	= require("./routes/about"),
	indexRoutes	= require("./routes/index"),
	usersRoutes	= require("./routes/users"),
	mediaRoutes	= require("./routes/media");


// mongoose.connect("mongodb://localhost/scoresheets", { useNewUrlParser: true, useUnifiedTopology:true });
mongoose.connect(process.env.MONGOSRV, { useNewUrlParser: true, useUnifiedTopology:true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// passport authentication configuration
app.use(require("express-session")({
	secret: "Lun and Timon in the morning!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// seedDB();

app.use("/", indexRoutes);
app.use("/users", usersRoutes);
app.use("/games", gamesRoutes);
app.use("/about", aboutRoutes);
app.use("/media", mediaRoutes);

// enables the app to work both from heroku and goorm
if(process.env.MONGOSRV === "mongodb://localhost/scoresheets"){
	app.listen(3000, function(){	
		console.log("ScoreSheets is up on Goorm!")
	});
} else {
	app.listen(process.env.PORT, function(){
		console.log("ScoreSheets is up on heroku!")
	});
}