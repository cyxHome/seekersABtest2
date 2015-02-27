
var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){

	models.LostGallery
		.find()
		.sort('date')
		.exec(renderItems);

	function renderItems(err, items) {
		console.log(items); 
		res.render('lost', { 'lost-items': items });
	}

};