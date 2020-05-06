var express	= require("express"),
	router	= express();

router.get("/", function(req, res){
	// res.render("about/index");
	res.send("This will be the about page!");
});

router.get("/edit", function(req, res){
	res.send("Here you'll be able to edit the about page!");
});

router.put("/", function(req, res){
	res.send("That's it, you've editted the about page!");
});

module.exports = router;