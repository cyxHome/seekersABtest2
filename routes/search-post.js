
var models = require('../models');

var foundItemToDisplay;
var lostItemToDisplay;
var noMatchLastSearch;

exports.view = function(req, res){

	if (noMatchLastSearch === 0)
		res.render('search-post', {'search-items-founds': foundItemToDisplay , 'search-items-lost': lostItemToDisplay});
	else
		res.render('search-post', { 'no-result': { "name" : "no match item post, try another keyword or check it in the Lost/Found Gallery" } });

};


exports.searchForLostItems = function(req, res) {
	var submitForm = req.body;
	var itemToSearch = submitForm["item"];

	var searchStr = '/' + itemToSearch + '/';
	models.LostGallery
	 	// create a case-insensitive substring matching search 
		.find({ "title": new RegExp(itemToSearch, 'i')})
		.sort('date')
		.exec(renderSearchItemsFromLost);


	function renderSearchItemsFromLost(err, lostItems) {

		function renderSearchItemsFromLostAndFound(err, foundItems) {
			if (!lostItems.length && !foundItems.length)
			{
				noMatchLastSearch = 1;
				console.log("no match item post, try another keyword or check it in the Lost/Found Gallery");
				res.render('search-post', { 'no-result': { "name" : "no match item post, try another keyword or check it in the Lost/Found Gallery" } });
			}	
			else
			{
				noMatchLastSearch = 0;
				foundItemToDisplay = foundItems;
				lostItemToDisplay = lostItems;
				console.log("have post");
				res.render('search-post', { 'search-items-founds': foundItems , 'search-items-lost': lostItems ,  });
			}
		}

		models.FoundGallery // get the post from the database 
			.find({ "title": new RegExp(itemToSearch, 'i')})
			.sort('date')
			.exec(renderSearchItemsFromLostAndFound);
	}


}