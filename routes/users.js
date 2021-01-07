var express		= require("express"),
	router		= express(),
	User		= require("../models/user"),
	middleware	= require("../functions/users");

// INDEX - show all users
// should be admin protected
router.get("/", middleware.isAdmin, function(req, res){
	User.find({}, function(err, allUsers){
		if(err){
			console.log(`error occurred while loading all users: ${err}`);
			// SHOULD REDIRECT TO ERROR PAGE IN THE FUTURE
			req.flash("error", "An error occured, sorry :(");
			res.redirect("/games");
		} else {
			res.render("users/index", {users: allUsers});
		}
	});
});

// EDIT - form for editting a single user
router.get("/:user/edit", middleware.isAdmin, function(req, res){
	User.findById(req.params.user).exec(function(err, user){
		if(err){
			// NEED BETTER ERROR HANDLING
			console.log(err);
			req.flash("error", "Couldn't find the user");
			res.redirect("/users");
		} else {
			res.render("users/edit", {user: user});
		}
	});
});

// UPDATE - actually updates the user
router.put("/:user", middleware.isAdmin, function(req, res){
	var auth_level = req.body.admin === "on" ? "admin" : "regular"
	
	User.findById(req.params.user, function(err, user){
		if(err){
			// NEED BETTER ERROR HANDLING
			console.log(err);
			req.flash("error", "Couldn't find the user");
			res.redirect("/users");
		} else {
			user.username = req.body.username;
			user.auth_level = auth_level;
			user.save(function(err){
				if(err){
					// NEED BETTER ERROR HANDLING
					console.log(err);
					req.flash("error", "Edit user failed");
					res.redirect("/users");
				} else {
					req.flash("success", `User ${user.username} edited successfuly`);
					res.redirect("/users");
				}
			});
		}
		
	});
});

// DESTROY - deletes a user
router.delete("/:user/delete", middleware.isAdmin, function(req, res){
	User.findByIdAndRemove(req.params.user, function(err){
		if(err){
			console.log(err);
			req.flash("error", "Couldn't find or remove the user");
			res.redirect("/users");
		} else {
			// ADD TO THE FLASH MESSAGE WHICH USER WAS REMOVED
			req.flash("success", "Successfully removed the user");
			res.redirect("/users");
		}
	});
});

module.exports = router;