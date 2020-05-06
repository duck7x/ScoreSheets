var express	= require("express"),
	router	= express();

router.get("/", function(req, res){
	res.redirect("/games");
});

module.exports = router;