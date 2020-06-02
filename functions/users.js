var User = require("../models/user");

module.exports = {
	isLoggedIn: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		// NEED BETTER ERROR HANDLING
		console.log("Not logged in!");
		req.flash("error", "You have the be logged in to do that")
		res.redirect("/login");
	},
	isLoggedOut: function(req, res, next){
		if(!req.isAuthenticated()){
			return next();
		}
		// NEED BETTER ERROR HANDLING
		console.log("Not logged out!");
		req.flash("error", "You can't do that when you're logged in")
		res.redirect("/games");
	},
	isAdmin: function(req, res, next){
		if(req.isAuthenticated()){
			if(req.user.auth_level === "admin"){
				return next();
			}
			// NEED BETTER ERROR HANDLING
			console.log("Not admin!");
			req.flash("error", "You're not authorised to do that");
			return res.redirect("/games");
		}
		// NEED BETTER ERROR HANDLING
		console.log("Not logged in!");
		req.flash("error", "You're not authorised to do that");
		res.redirect("/login");
	}
}