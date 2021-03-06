var test	= "Timon's in the kalax - CUTE",
	count	= $("#fields-count").val(),
	skip	= "";
var fieldsContainer 					= $(".fields-container"),
	fieldTemplate						= $("#field-template"),
	setsValueTemplate					= $("#sets-template"),
	generalCheckboxTemplate				= $("#generalCheckbox-template"),
	AddClassTemplate					= $("#addClass-template"),
	multipleFieldsTemplate				= $("#multipleFields-template"),
	multipleFieldsSetsTemplate			= $("#fieldMultipleFieldsSets-template"),
	selectTemplate						= $("#fieldSelect-template"),
	reachTargetTemplate					= $("#reachTarget-template"),
	reachTargetOtherFieldTemplate		= $("#fieldReachTargetOtherField-template"),
	reachTargetOtherFieldGlobalTemplate	= $("#fieldReachTargetDynamicOtherFieldGlobal-template"),
	uniqueSetsValueTemplate				= $("#fieldUniqueSets-template"),
	rankingTemplate						= $("#fieldRanking-template"),
	mainContainer						= $(".container"),
	popupImagePrev						= $(".popup-container.image-preview");

// ==================================
// FUNCTIONS
// Adding a new field to page when clicking the add field icon
function addField(){
	count++;
	$("#fields-count").val(count);
	fieldsContainer.append(fieldTemplate.html());
	let newField = $(".field").last();
	newField.attr("count", count);
	// FIX NAME CHANGING DUE TO NEW SPAN CONTAINER THINGIE
	newField.children().children(".field-input, label, .question-mark, .explanation").each(function(){
		$(this).attr("name", function(i, val){
			return val + String(count);
		});
	// $(".remove-field").last().val(count);
		$(".remove-field").last().attr("value", count);
	});
}

function removeSpecialCalcFields(element){
	element.parent().siblings(".fieldSetsValue-container").remove();
	element.parent().siblings(".fieldGeneralCheckbox-container").remove();
	element.parent().siblings(".fieldRemoveClass-container").remove();
	element.parent().siblings(".fieldAddClass-container").remove();
	element.parent().siblings(".fieldAddFields-container").remove();
	element.parent().siblings(".fieldMultipleFieldsMethod-container").remove();
	element.parent().siblings(".fieldMultipleFieldsRelevantFields-container").remove();
	element.parent().siblings(".fieldSelect-container").remove();
	element.parent().siblings(".fieldSelect-container").remove();
	element.parent().siblings(".fieldReachTargetRange-container").remove();
	element.parent().siblings(".fieldReachTargetMethod-container").remove();
	element.parent().siblings(".fieldReachTargetOtherField-container").remove();
	element.parent().siblings(".fieldReachTargetDynamicOtherFieldGlobal-container").remove();
	element.parent().siblings(".fieldUiqueSetsValue-container").remove();
	element.parent().siblings(".fieldUniqueSetsFields-container").remove();
	element.parent().siblings(".fieldRankingValues-container").remove();
	element.parent().siblings(".fieldRankingFields-container").remove();
	element.parent().siblings(".fieldRankingTieMethod-container").remove();
}

// Adding setsValue
// function addSetsValue(element){
	
// }

// ==================================
// PAGE STARTUP EXECUTIONS
if($(".initialize").length > 0){
	addField();	
}

// ==================================
// EVENTS
// Add field
$(".add-field").on("click", addField);

// Clear all info in field
fieldsContainer.on("click", ".clear-field", function(){
	var field = $(this).parent().next().children("input");
	field.each(function(){
		// console.log("Will clear");
		// console.log($(this));
		$(this).val("");
		$(this).prop("checked", false);
	});
});

// Removes field completely
fieldsContainer.on("click", ".remove-field", function(){
	// skip += `,${$(this).val()}`;
	skip += `,${$(this).attr("value")}`;
	$("#fields-skip").val(skip);
	$(this).parent().parent().remove();
});

// Displays explanation when hovering question mark
mainContainer.on("mouseenter", ".question-mark", function(){
	let name = $(this).attr("name");
	$(`.explanation[name="${name}"]`).css("display", "flex");
});

// Removes explanation when unhovering question mark
mainContainer.on("mouseleave", ".question-mark", function(){
	let name = $(this).attr("name");
	$(`.explanation[name="${name}"]`).css("display", "none");
});

// Shows image preview popup window
$(".open-popup").on("click", function(){
	let image = $(`input[name=${$(this).attr("name")}]`).val();
	popupImagePrev.children().last().css("background-image", `url(${image})`);
	popupImagePrev.css("display", "flex");
});

// Changing to sets, general-checkbox, multiple-fields or general-select calcMethod
mainContainer.on("change", ".fieldCalcMethod", function(){
	let valueContainer 		= $(this).parent().siblings(".fieldValue-container"),
		disabledCheckbox	= $(this).parent().siblings(".fieldDisabled-container").children("[type=checkbox]");
	// let fieldNum = $(this).attr("name").substr(-1);
	let fieldNum = $(this).parent().parent().attr("count");
	removeSpecialCalcFields($(this));
	if($(this).val() === "sets"){
		valueContainer.after(setsValueTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
	} else if($(this).val() === "general-checkbox"){
		// At the moment there's only one functionality to general-checkbox, when there'll be multiple options this will be changed
		valueContainer.after(AddClassTemplate.html());
		valueContainer.after(generalCheckboxTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
	} else if($(this).val() === "multiple-fields"){
		valueContainer.after(multipleFieldsTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
	} else if($(this).val() === "general-select"){
		valueContainer.after(selectTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
	} else if($(this).val() === "reach-target"){
		valueContainer.after(reachTargetTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
		valueContainer.next().next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
	} else if($(this).val() === "unique-sets"){
		valueContainer.after(uniqueSetsValueTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
		valueContainer.next().next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
		disabledCheckbox.prop("checked", true);
	} else if($(this).val() === "ranking"){
		valueContainer.after(rankingTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
		valueContainer.next().next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
		valueContainer.next().next().next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
	}
});

// Changing the multiple-fields calcMethod to setsValueTemplate
mainContainer.on("change", ".fieldMultipleFieldsMethod", function(){
	let valueContainer = $(this).parent().siblings(".fieldValue-container");
	// let fieldNum = $(this).attr("name").substr(-1);
	let fieldNum = $(this).parent().parent().attr("count");
	if($(this).val() === "sets"){
		valueContainer.after(multipleFieldsSetsTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
	} else {
		$(this).parent().siblings(".fieldMultipleFieldsSets-container").remove();
	}
});

// Changing the reach-target calcMethod to otherFieldTemplate or dynamic other field
mainContainer.on("change", ".fieldReachTargetMethod", function(){
	// let methodContainer = $(this).parent().siblings(".fieldReachTargetMethod-container");
	let methodContainer		= $(this).parent(),
		disabledCheckbox	= $(this).parent().siblings(".fieldDisabled-container").children("[type=checkbox]");
	// let fieldNum = $(this).attr("name").substr(-1);
	let fieldNum = $(this).parent().parent().attr("count");
	if($(this).val() === "other-field" || $(this).val() === "dynamic-other-field"){
// 		$(".fieldReachTargetMethod-container").last().siblings(".fieldReachTargetOtherField-container").children(".field-input").val(test)
		let otherFieldVal = $(this).parent().siblings(".fieldReachTargetOtherField-container").children(".field-input").val();
		$(this).parent().siblings(".fieldReachTargetDynamicOtherFieldGlobal-container").remove();
		$(this).parent().siblings(".fieldReachTargetOtherField-container").remove();
		methodContainer.after(reachTargetOtherFieldTemplate.html());
		methodContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		disabledCheckbox.prop("checked", true);
		});
		$(this).parent().siblings(".fieldReachTargetOtherField-container").children(".field-input").val(otherFieldVal);
		if($(this).val() === "dynamic-other-field"){
			methodContainer.next().after(reachTargetOtherFieldGlobalTemplate.html());
			methodContainer.next().next().children(".field-input, label, .question-mark, .explanation").each(function(){
				$(this).attr("name", function(i, val){
					return val + fieldNum;
				});
			});
		}
	} else {
		$(this).parent().siblings(".fieldReachTargetOtherField-container").remove();
		$(this).parent().siblings(".fieldReachTargetDynamicOtherFieldGlobal-container").remove();
		disabledCheckbox.prop("checked", false);
	}
});


// ==================================
// NOTES FOR ME, WILL BE DELETED