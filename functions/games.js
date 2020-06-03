var exec = require("child_process").exec;

module.exports = {
	uploadImage: function(req, res, name, image){
		if(req.body.upload){
			var imageName = name.toLowerCase().replace(/ /g, "-"),
				imageType = image.split(".").slice(-1);
			exec(`wget ${image} -O public/media/${imageName}.${imageType}`, function(err, stdout, stderr){
				if(err){
					// NEED BETTER ERROR HANDLING
					req.flash("error", "failed to upload game image");
					console.log(err);
				}
			});
			image = `/media/${imageName}.${imageType}`;
		}
		return image;
	},
	buildFields: function(req, res, count, skip, fields){
		for(i = 1; i <= count; i++){
			if(skip.includes(String(i))){
				continue;
			}

			let field = {};

			field.name = eval("req.body.fieldName" + String(i)) ? eval("req.body.fieldName" + String(i)) : "";
			field.value = eval("req.body.fieldValue" + String(i)) ? Number(eval("req.body.fieldValue" + String(i))) : "";
			field.setsValue = eval("req.body.fieldSetsValue" + String(i)) ? Number(eval("req.body.fieldSetsValue" + String(i))) : "";
			field.title = eval("req.body.fieldTitle" + String(i)) ? eval("req.body.fieldTitle" + String(i)) : "";
			field.type = eval("req.body.fieldFormType" + String(i)) ? eval("req.body.fieldFormType" + String(i)) : "";
			field.icon = eval("req.body.fieldIcon" + String(i)) ? eval("req.body.fieldIcon" + String(i)) : "";
			field.classesDesc = eval("req.body.fieldDescClasses" + String(i)) ? eval("req.body.fieldDescClasses" + String(i)) : "";
			field.classesPlayer = eval("req.body.fieldPlayerClasses" + String(i)) ? eval("req.body.fieldPlayerClasses" + String(i)) : "";
			field.calcMethod = eval("req.body.fieldCalcMethod" + String(i)) ? eval("req.body.fieldCalcMethod" + String(i)) : "";
			field.scoreTotal = eval("req.body.fieldScoreTotal" + String(i)) === "on";

			fields.push(field);
		}
		return fields;
	}
}