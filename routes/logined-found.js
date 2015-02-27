
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
		// console.log(projects); 
		res.render('logined-found', { 'found-items': items });
	}

};
