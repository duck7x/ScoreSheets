var test	= "Timon's in the kalax - CUTE";
	count	= $("#fields-count").val(),
	skip	= "";
var fieldsContainer = $(".fields-container"),
	fieldTemplate	= $("#field-template");

// ==================================
// FUNCTIONS
// Adding a new field to page when clicking the add field icon
function addField(){
	count++;
	$("#fields-count").val(count);
	var newField = fieldsContainer.append(fieldTemplate.html());
	$(".field").last().children(".field-input, label").each(function(){
		$(this).attr("name", function(i, val){
			return val + String(count);
		});
	// $(".remove-field").last().val(count);
	$(".remove-field").last().attr("value", count);
	});
}

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

// ==================================
// NOTES FOR ME, WILL BE DELETED