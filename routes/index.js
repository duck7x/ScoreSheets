var User		= require("../models/user"),
	express		= require("express"),
	router		= express(),
	middleware	= require("../functions/users")

router.get("/", function(req, res){
	// if(res.locals.error){
	// 	req.flash("error", res.locals.error);
	// }
	// if(res.locals.success){
	// 	req.flash("success", res.locals.success);
	// }
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
			req.flash("error", "Sorry, an error occurred while registering, please try again");
			res.redirect("/register");
		} else {
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Registered successfully, welcome to ScoreSheets! :)")
				res.redirect("/games");
			});
		}
	});
});

router.get("/login", middleware.isLoggedOut, function(req, res){
	res.render("users/login");
});

router.post("/login", middleware.isLoggedOut, passport.authenticate("local", {
	successRedirect: "/games",
	failureRedirect: "/login"
}), function(req, res){});

router.get("/logout", middleware.isLoggedIn, function(req, res){
	req.logout();
	req.flash("success", "Logged you out, see you soon! :)");
	res.redirect("/games");
});

module.exports = router;