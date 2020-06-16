var test	= "Timon's in the kalax - CUTE";
	count	= $("#fields-count").val(),
	skip	= "";
var fieldsContainer 	= $(".fields-container"),
	fieldTemplate		= $("#field-template"),
	setsValueTemplate	= $("#sets-template"),
	mainContainer		= $(".container"),
	popupImagePrev		= $(".popup-container.image-preview");

// ==================================
// FUNCTIONS
// Adding a new field to page when clicking the add field icon
function addField(){
	count++;
	$("#fields-count").val(count);
	var newField = fieldsContainer.append(fieldTemplate.html());
	// FIX NAME CHANGING DUE TO NEW SPAN CONTAINER THINGIE
	$(".field").last().children().children(".field-input, label, .question-mark, .explanation").each(function(){
		$(this).attr("name", function(i, val){
			return val + String(count);
		});
	// $(".remove-field").last().val(count);
		$(".remove-field").last().attr("value", count);
	});
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

// Changing to sets calcMethod
mainContainer.on("change", ".fieldCalcMethod", function(){
	let valueContainer = $(this).parent().siblings(".fieldValue-container");
	let fieldNum = $(this).attr("name").substr(-1);
	if($(this).val() === "sets"){
		valueContainer.after(setsValueTemplate.html());
		valueContainer.next().children(".field-input, label, .question-mark, .explanation").each(function(){
			$(this).attr("name", function(i, val){
				return val + fieldNum;
			});
		});
	} else {
		$(this).parent().siblings(".fieldSetsValue-container").remove();
	}
});


// ==================================
// NOTES FOR ME, WILL BE DELETED