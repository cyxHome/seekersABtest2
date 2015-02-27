
var models = require('../models');

var itemToDisplay;

exports.view = function(req, res){

	res.render('search-post', { 'search-items': itemToDisplay });

};

exports.searchForFoundItems = function(req, res) {
	var submitForm = req.body;
	var itemToSearch = submitForm["item"];

	models.FoundGallery
	 	// create a case-insensitive substring matching search 
		.find({ "title": new RegExp(itemToSearch, 'i')})
		.sort('date')
		.exec(renderItems);

	function renderItems(err, items) {
		// console.log(projects); 
		itemToDisplay = items;
		res.render('search-post', { 'search-items': items });
	}
}


exports.searchForLostItems = function(req, res) {
	var submitForm = req.body;
	var itemToSearch = submitForm["item"];

	var searchStr = '/' + itemToSearch + '/';
	models.LostGallery
	 	// create a case-insensitive substring matching search 
		.find({ "title": new RegExp(itemToSearch, 'i')})
		.sort('date')
		.exec(renderItems);

	function renderItems(err, items) {
		// console.log(projects); 
		itemToDisplay = items;
		res.render('search-post', { 'search-items': items });
	}
}