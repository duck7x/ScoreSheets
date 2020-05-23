var User	= require("../models/user"),
	express	= require("express"),
	router	= express();

router.get("/", function(req, res){
	res.redirect("/games");
});

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var username	= req.body.username,
		password	= req.body.password
	User.register(new User({username: username}), password, function(err, user){
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

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/"
}), function(req, res){});

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

module.exports = router;