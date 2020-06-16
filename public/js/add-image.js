var test	= "Timon is perfect",
	count	= $("#images-count").val(),
	skip	= "";

var imagesContainer	= $(".images-container"),
	imagesTemplate	= $("#images-template"),
	mainContainer	= $(".container"),
	imagesCount		=$("#images-count");

// ==================================
// FUNCTIONS
// Add a new image thingie when clicking the add image thingie icon
function addImageThingie(){
	count++;
	imagesCount.val(count);
	var newImage = imagesContainer.append(imagesTemplate.html());
	$(".field").last().children("label, input").each(function(){
		$(this).attr("name", function(i, val){
			return val + String(count);
		});
		$(".remove-image").last().attr("value", count);
	});
}

// ==================================
// PAGE STARTUP EXECUTIONS
addImageThingie();

// ==================================
// EVENTS
// Add image thingie
$(".add-image").on("click", addImageThingie);

// Clear all info in field
imagesContainer.on("click", ".clear-image", function(){
	var imageField = $(this).parent().next().children("input");
	imageField.each(function(){
		$(this).val("");
	});
});

// Removes field compeltely
imagesContainer.on("click", ".remove-image", function(){
	skip += `,${$(this).attr("value")}`;
	$("#images-skip").val(skip);
	$(this).parent().parent().remove();
});


// ==================================
// NOTES FOR ME, WILL BE DELETED