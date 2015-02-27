
var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){

	models.FoundGallery
		.find()
		.sort('date')
		.exec(renderItems);

	function renderItems(err, items) {
		console.log(items); 
		res.render('found', { 'found-items': items });
	}

};