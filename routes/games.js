var express	= require("express"),
	router	= express();

router.get("/", function(req, res){
	// res.send("This is where I'd put all my games IF I'D'VE WRITTEN THE CODE FOR IT");
	res.render("games/index");
});

router.get("/new", function(req, res){
	res.send("Here'll be the add game page! :D");
});

router.post("/", function(req, res){
	res.send("You've requested to add a game, nice!");
});

router.get("/:game", function(req, res){
	res.send("So you wanna calculate the score for " + req.params.game + ", eh?!");
	// res.render("games/show", {game: req.params.game});
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