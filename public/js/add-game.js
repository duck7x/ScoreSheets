var test="Timon's in the kalax - CUTE"
var fieldsContainer = $(".fields-container");

// ==================================
// FUNCTIONS
// Adding a new field to page when clicking the add field icon
function addField(){
	var newField = fieldsContainer.append($("#field-template").html());
}

// ==================================
// PAGE STARTUP EXECUTIONS
addField();

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
	$(this).parent().parent().remove();
});

// ==================================
// NOTES FOR ME, WILL BE DELETED