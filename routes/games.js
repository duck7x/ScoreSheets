var express			= require("express"),
	router			= express(),
	exec			= require("child_process").exec,
	Game			= require("../models/game"),
	middleware		= require("../functions/users"),
	gameFunctions	= require("../functions/games");

var calcMethods 					= ["reg", "sets", "square", "single-checkbox", "general-checkbox", "multiple-fields", "general-select", "reach-target", "ranking",
									   "unique-sets"],
	// formTypes	= ["text", "checkbox", "number"];
	formTypes						= ["number", "checkbox", "select"],
	generalCheckboxFunctionalities	= ["add-class"],
	reachTargetMethods				= ["self", "other-field", "dynamic-other-field"],
	rankingTiesMethods				= ["split-rounded-down", "split-rounded-up", "friendly"],
	winConditions 					= ["highest-score"];

// INDEX - show all games
router.get("/", function(req, res){
	Game.find({}, null, {sort: {name: 1}}, function(err, allGames){
		if(err){
			console.log(`error occurred while loading index: ${err}`);
			// SHOULD REDIRECT TO ERROR PAGE IN THE FUTURE
			res.respond("An error occured, sorry :(");
		} else {
			res.render("games/index", {games: allGames});
		}
	});
});

// NEW - form to add a new game
router.get("/new", middleware.isAdmin, function(req, res){
// router.get("/new", function(req, res){
	res.render("games/new", {calcMethods: calcMethods, formTypes: formTypes, generalCheckboxFunctionalities: generalCheckboxFunctionalities, reachTargetMethods: reachTargetMethods, rankingTiesMethods: rankingTiesMethods, winConditions: winConditions});
});

// CREATE - actually add a new game
router.post("/", middleware.isAdmin, function(req, res){
// router.post("/", function(req, res){
	
	var name			= req.body.name,
		image			= req.body.image,
		minPlayers		= req.body.minPlayers,
		maxPlayers		= req.body.maxPlayers,
		winCondition	= req.body.winCondition,
		tieBreaker		= req.body.tieBreaker,
		fields			= [],
		count			= req.body.count,
		skip			= req.body.skip;
	image = gameFunctions.uploadImage(req, res, name, image);
	fields = gameFunctions.buildFields(req, res, count, skip, fields);
	
	var newGame = {
		name: name,
		image: image,
		minPlayers: minPlayers,
		maxPlayers: maxPlayers,
		winCondition: winCondition,
		tieBreaker: tieBreaker,
		fields: fields
	}

	Game.create(newGame, function(err, newlyCreated){
		if(err){
			console.log(err);
			req.flash("error", `Could not add ${newGame.name} due to an error: ${err}`);
			res.redirect("back");
		} else {
			console.log(newlyCreated);
			res.redirect(`/games/${newlyCreated._id}`);
		}
	});

});

// SHOW - display each individual game
router.get("/:game", function(req, res){
	Game.findById(req.params.game).exec(function(err, game){
		if(err){
			// NEED BETTER ERROR HANDLING
			console.log(err);
			res.redirect("/");
		} else {
			res.render("games/show", {game: game});
		}
	});
});

// EDIT - form for editting a game
router.get("/:game/edit", middleware.isAdmin, function(req, res){
	Game.findById(req.params.game, function(err, game){
		if(err){
			// NEED BETTER ERROR HANDLING
			console.log(err);
			req.flash("error", "Couldn't find the game");
			res.redirect("/games");
		} else {
			res.render("games/edit", {game: game, calcMethods: calcMethods, formTypes: formTypes, generalCheckboxFunctionalities: generalCheckboxFunctionalities, reachTargetMethods: reachTargetMethods, rankingTiesMethods: rankingTiesMethods, winConditions: winConditions});
		}
	});
});

// UPDATE - actually edits the game
router.put("/:game", middleware.isAdmin, function(req, res){
	
	var name			= req.body.name,
		image			= req.body.image,
		minPlayers		= req.body.minPlayers,
		maxPlayers		= req.body.maxPlayers,
		winCondition	= req.body.winCondition,
		tieBreaker		= req.body.tieBreaker,
		fields			= [],
		count			= req.body.count,
		skip			= req.body.skip;
	image = gameFunctions.uploadImage(req, res, name, image);
	fields = gameFunctions.buildFields(req, res, count, skip, fields);
	
	Game.findById(req.params.game, function(err, game){
		if(err){
			// NEED BETTER ERROR HANDLING
			console.log(err);
			req.flash("error", "Couldn't find the game");
			res.redirect("/games");
		} else {
			game.name = name;
			game.image = image;
			game.minPlayers = minPlayers;
			game.maxPlayers = maxPlayers;
			game.winCondition = winCondition;
			game.tieBreaker = tieBreaker;
			game.fields = fields;

			game.save(function(err){
				if(err){
					// NEED BETTER ERROR HANDLING
					console.log(err);
					req.flash("error", "Game edit failed");
					res.redirect("/games");
				} else {
					req.flash("success", `Game ${game.name} editted successfuly`);
					res.redirect(`/games/${game._id}`);
				}
			});
		}
	});
});

// DESTROY - deletes a game
router.delete("/:game/delete", middleware.isAdmin, function(req, res){
	Game.findByIdAndRemove(req.params.game, function(err){
		if(err){
			console.log(err);
			req.flash("error", "Couldn't find or remove the game");
			res.redirect("/games");
		} else {
			// ADD TO THE FLASH MESSAGE WHICH GAME WAS REMOVED
			req.flash("success", "Successfully removed the game");
			res.redirect("/games");
		}
	})
});

module.exports = router;