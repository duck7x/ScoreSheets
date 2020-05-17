var express	= require("express"),
	router	= express(),
	Game	= require("../models/game");

// INDEX - show all games
router.get("/", function(req, res){
	Game.find({}, function(err, allGames){
		if(err){
			console.log(`error ocurred while loading index: ${err}`)
			// SHOULD REDIRECT TO ERROR PAGE IN THE FUTURE
			res.respond("An error occured, sorry :(")
		} else {
			res.render("games/index", {games: allGames});
		}
	});
});

router.get("/new", function(req, res){
	res.send("Here'll be the add game page! :D");
});

router.post("/", function(req, res){
	res.send("You've requested to add a game, nice!");
});

router.get("/:game", function(req, res){
	// res.send("So you wanna calculate the score for " + req.params.game + ", eh?!");
	Game.findById(req.params.game).exec(function(err, game){
		if(err){
			console.log(err);
			res.redirect("/");
		} else {
			res.render("games/show", {game: game});
		}
	});
});

router.get("/:game/edit", function(req, res){
	res.send("This will be the edit page of " + req.params.game);
});

router.put("/:game", function(req, res){
	res.send("You tried editting " + req.params.game + ", good for you!");
});

router.delete("/:game/delete", function(req, res){
	res.send("You're gonna delete " + req.params.game + "!!!");
});

module.exports = router;