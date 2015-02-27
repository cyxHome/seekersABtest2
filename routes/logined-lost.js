
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
		// console.log(projects); 
		res.render('logined-lost', { 'lost-items': items });
	}

};

