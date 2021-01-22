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
		
		var calcToType = {
			"reg": "number",
			"sets": "number",
			"square": "number",
			"single-checkbox": "checkbox",
			"general-checkbox": "checkbox",
			"multiple-fields": "disabled",
			"general-select": "select"
		}
		
		skip += ","
		
		for(i = 1; i <= count; i++){
			if(skip.includes(`,${String(i)},`)){
				continue;
			}

			let field = {};

			field.name = eval("req.body.fieldName" + String(i)) ? eval("req.body.fieldName" + String(i)) : "";
			field.value = eval("req.body.fieldValue" + String(i)) ? Number(eval("req.body.fieldValue" + String(i))) : "";
			field.setsValue = eval("req.body.fieldSetsValue" + String(i)) ? Number(eval("req.body.fieldSetsValue" + String(i))) : "";
			field.removeClass = eval("req.body.fieldRemoveClass" + String(i)) ? eval("req.body.fieldRemoveClass" + String(i)) : "";
			field.addClass = eval("req.body.fieldAddClass" + String(i)) ? eval("req.body.fieldAddClass" + String(i)) : "";
			field.addFields = eval("req.body.fieldAddFields" + String(i)) ? eval("req.body.fieldAddFields" + String(i)) : "";
			field.generalCheckboxFunctionality = eval("req.body.fieldGeneralCheckboxFunctionality" + String(i)) ? eval("req.body.fieldGeneralCheckboxFunctionality" + String(i)) : "";
			field.multipleFieldsMethod = eval("req.body.fieldMultipleFieldsMethod" + String(i)) ? eval("req.body.fieldMultipleFieldsMethod" + String(i)) : "";
			field.setsValue = eval("req.body.fieldMultipleFieldsSets" + String(i)) ? eval("req.body.fieldMultipleFieldsSets" + String(i)) : field.setsValue;
			field.multipleFieldsRelevantFields = eval("req.body.fieldMultipleFieldsRelevantFields" + String(i)) ? eval("req.body.fieldMultipleFieldsRelevantFields" + String(i)) : "";
			field.selectOptions = eval("req.body.fieldSelect" + String(i)) ? eval("req.body.fieldSelect" + String(i)) : field.selectOptions;
			field.title = eval("req.body.fieldTitle" + String(i)) ? eval("req.body.fieldTitle" + String(i)) : "";
			field.icon = eval("req.body.fieldIcon" + String(i)) ? eval("req.body.fieldIcon" + String(i)) : "";
			field.description = eval("req.body.fieldDescription" + String(i)) ? eval("req.body.fieldDescription" + String(i)) : "";
			field.classesDesc = eval("req.body.fieldDescClasses" + String(i)) ? eval("req.body.fieldDescClasses" + String(i)) : "";
			field.classesPlayer = eval("req.body.fieldPlayerClasses" + String(i)) ? eval("req.body.fieldPlayerClasses" + String(i)) : "";
			field.calcMethod = eval("req.body.fieldCalcMethod" + String(i)) ? eval("req.body.fieldCalcMethod" + String(i)) : "";
			field.type = calcToType[eval("req.body.fieldCalcMethod" + String(i))];
			field.scoreTotal = eval("req.body.fieldScoreTotal" + String(i)) === "on";
			field.hidden = eval("req.body.fieldHidden" + String(i)) === "on";
			field.disabled = eval("req.body.fieldDisabled" + String(i)) === "on";

			fields.push(field);
		}
		return fields;
	}
}