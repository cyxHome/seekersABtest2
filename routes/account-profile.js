
var models = require('../models');

/*
 * Find the profile information that match the current user's name from the database,
 * Call back function send the data of this specific user to the client
 * This function will be called everytime when the profile page is load
 */
exports.view = function(req, res){

	models.CurrentAccount // get the current account from the database
		.find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) {
			var currentAccountArr = docs.map(function(d){ return d.toObject() });
			var currentName = currentAccountArr[0].name;

			models.AccountProfile // get the profile information from the database 
				.find({"name": currentName})
				.exec(renderProfile);
		});


	function renderProfile(err, profile) {
		console.log("view profile: "+profile); 
		res.render('account-profile', { 'profile': profile });
	}

};