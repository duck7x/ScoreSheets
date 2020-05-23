var express	= require("express"),
	router	= express(),
	User	= require("../models/user");

// INDEX - show all users
// should be admin protected
router.get("/", function(req, res){
	User.find({}, function(err, allUsers){
		if(err){
			console.log(`error occurred while loading all users: ${err}`);
			// SHOULD REDIRECT TO ERROR PAGE IN THE FUTURE
			res.respond("An error occured, sorry :(");
		} else {
			res.render("users/index", {users: allUsers});
		}
	});
});

// EDIT - form for editting a single user
router.get("/:user/edit", function(req, res){
	User.findById(req.params.user).exec(function(err, user){
		if(err){
			// NEED BETTER ERROR HANDLING
			console.log(err);
			res.redirect("/");
		} else {
			res.render("users/edit", {user: user});
		}
	});
});

// UPDATE - actually updates the user
router.put("/:user", function(req, res){
	// Check if JS can do the X = if Y else Z like python
	if(req.body.admin === "on"){
		var auth_level = "admin"
	} else {
		var auth_level = "regular"
	}
	
	User.findById(req.params.user, function(err, user){
		if(err){
			// NEED BETTER ERROR HANDLING
			console.log(err);
			return res.redirect("/users");
		}
		user.username = req.body.username;
		user.auth_level = auth_level;
		
		user.save(function(err){
			if(err){
				// NEED BETTER ERROR HANDLING
				console.log(err);
				return res.redirect("/users");
			}
			res.redirect("/users");
		});

	})
	
	// res.send(`Will updated user ${req.params.user} with username: ${req.body.username}, admin: ${auth_level}`);
});

// DESTROY - deletes a user
router.delete("/:user/delete", function(req, res){
	User.findByIdAndRemove(req.params.user, function(err){
		if(err){
			console.log(err);
			res.redirect("/users");
		} else {
			res.redirect("/users");
		}
	});
});

module.exports = router;