var express		= require("express"),
	router		= express(),
	exec		= require("child_process").exec,
	middleware	= require("../functions/users");

// INDEX - shows all media
router.get("/", middleware.isAdmin, function(req, res){
// router.get("/", function(req, res){
	// res.send("Media page!");
	exec("ls public/media", function(err, stdout, stderr){
		if(err){
			// NEED BETTER ERROR HANDLING
			req.flash("error", "failed to ls");
			console.log(err);
		}
		// console.log(mediaFiles);
		res.render("media/index", {mediaFiles: stdout});
	});	
});

// NEW - form to add new medias
router.get("/new", function(req, res){
// router.get("/new", middleware.isAdmin, function(req, res){
	res.render("media/new");
});

// CREATE - actually adds the new images
router.post("/", middleware.isAdmin, function(req, res){
	res.send("Media added!");
});

// DESTROY - deletes media

module.exports = router;