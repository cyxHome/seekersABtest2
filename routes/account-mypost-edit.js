
var models = require('../models');

var item_id;

/**
 * It will render the data in the old post to the editing page
 * This function is called everytime when the edit-mypost page is loaded
 */
exports.view = function(req, res){

	// either Lost Gallery or Found Gallery will have the item that has the specific id

	models.FoundGallery // get the post from the database 
		.find({"_id": item_id})
		.sort('date')
		.exec(renderPostsFromFound);

		function renderPostsFromFound(err, foundPosts) {

			function renderPostsFromFoundAndLost(err, lostPosts) {
				res.render('account-mypost-edit', { 'old-post-founds': foundPosts , 'old-post-losts': lostPosts });
			}

			models.LostGallery // get the post from the database 
				.find({"_id": item_id})
				.sort('date')
				.exec(renderPostsFromFoundAndLost);
		}
};


/**
 * Get the item id in this server before the client redirect to the page and call .view function above
 * So that the .view function can get the information of the item and display it to the handlebars
 */
exports.gotoEditMypost = function(req, res){

	item_id = req.params.id; // global variable of this server (so that the .view function can access this id)
	
	res.send("item OK");
	
};

/**
 * Update the posted item
 */
exports.editMypost = function(req, res){

	var form_data = req.body;
	newItemInfo = form_data['json'];
	var itemID = req.params.id;

	// Build up update object programmatically to not include 'title'/'location' when not provided:
	var updateObj = {"description": newItemInfo["description"], "imageURL": newItemInfo["imageURL"]};
	if (newItemInfo["title"]) {
	    updateObj["title"] = newItemInfo["title"];
	}
	if (newItemInfo["location"]) {
	    updateObj["location"] = newItemInfo["location"];
	}

	// either Lost Gallery or Found Gallery will have the item that has the specific id
	models.LostGallery
		.update({"_id": itemID}, updateObj, function () {

			models.LostGallery // display the updated data in the database
				.find({"_id": itemID})
		});

	models.FoundGallery
		.update({"_id": itemID}, updateObj, function () {

			models.FoundGallery // display the updated data in the database
				.find({"_id": itemID})
				.exec(displayChangedItem);
		});	


	function displayChangedItem (err, item) {
		res.send("item OK");
	}
};