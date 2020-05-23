var User = require("../models/user");

module.exports = {
	isLoggedIn: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		// NEED BETTER ERROR HANDLING
		console.log("Not logged in!");
		res.redirect("/login");
	},
	isLoggedOut: function(req, res, next){
		if(!req.isAuthenticated()){
			return next();
		}
		// NEED BETTER ERROR HANDLING
		console.log("Not logged out!");
		res.redirect("/");
	},
	isAdmin: function(req, res, next){
		if(req.isAuthenticated()){
			if(req.user.auth_level === "admin"){
				return next();
			}
			// NEED BETTER ERROR HANDLING
			console.log("Not admin!");
			return res.redirect("/");
		}
		// NEED BETTER ERROR HANDLING
		console.log("Not logged in!");
		res.redirect("/login");
	}
}