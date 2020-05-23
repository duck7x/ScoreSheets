var User		= require("../models/user"),
	express		= require("express"),
	router		= express(),
	middleware	= require("../middleware/users")

router.get("/", function(req, res){
	res.redirect("/games");
});

router.get("/register", middleware.isLoggedOut, function(req, res){
	res.render("users/register");
});

router.post("/register", middleware.isLoggedOut, function(req, res){
	var username	= req.body.username,
		password	= req.body.password
	User.register(new User({username: username, auth_level: "regular"}), password, function(err, user){
		if(err){
			console.log(err);
			res.redirect("/");
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/");
			});
		}
	});
});

router.get("/login", middleware.isLoggedOut, function(req, res){
	res.render("users/login");
});

router.post("/login", middleware.isLoggedOut, passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/"
}), function(req, res){});

router.get("/logout", middleware.isLoggedIn, function(req, res){
	req.logout();
	res.redirect("/");
});

module.exports = router;