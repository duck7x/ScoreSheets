var express		= require("express"),
	router		= express(),
	exec		= require("child_process").exec,
	middleware	= require("../functions/users");

// INDEX - shows all media
router.get("/", middleware.isAdmin, function(req, res){
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
router.get("/new", middleware.isAdmin, function(req, res){
	res.render("media/new");
});

// CREATE - actually adds the new images
router.post("/", middleware.isAdmin, function(req, res){
	var count	= req.body.count,
		skip	= req.body.skip,
		url		= "",
		name	= "",
		type	= "",
		failed	= 0,
		success	= 0;
	
	// SHOULD MAKE A FUNCTION
	// SHOULD IMPROVE AND GENERALISE THE UPLOAD FUNCTION
	for(i = 1; i<= count; i++){
		if(skip.includes(String(i))){
			continue;
		}
		
		name = eval("req.body.imageName" + String(i));
		url = eval("req.body.imageUrl" + String(i));
		type = url.split(".").slice(-1);
		exec(`wget ${url} -O public/media/${name}.${type}`, function(err, stdout, stderr){
			if(err){
				console.log(err);
				failed++;
				req.flash("error", `Failed to upload ${failed} images`);
			} else {
				success++;
				req.flash("success", `${success} images uploaded successfuly`);
			}
		});
	}
	
	// if(success > 0){
	// 	req.flash("success", `${success} images uploaded successfuly`);
	// }
	// if(failed > 0){
	// 	req.flash("error", `Failed to upload ${failed} images`);
	// }
	
	res.redirect("/media");
});

// DESTROY - deletes media

module.exports = router;