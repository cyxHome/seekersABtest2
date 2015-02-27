
var models = require('../models');

/*
 * It will render the data in the old post to the editing page
 * This function is called everytime when the edit-profile page is loaded
 */
exports.view = function(req, res) {
	models.CurrentAccount // get the current account from the database
		.find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) { 
			var currentAccountArr = docs.map(function(d){ return d.toObject() });
			var currentName = currentAccountArr[0].name;

			models.AccountProfile // get the profile information asociated with the name
				.find({"name": currentName})
				.exec( function (err, oldProfile) { 
					console.log(oldProfile);
					res.render('account-profile-edit', { 'old-profile': oldProfile });
				});
		});
}


/**
 * Update the account profile
 */
exports.editProfile = function(req, res) {
	var form_data = req.body;
	newProfileInfo = form_data['json'];

	// Build up update object programmatically to not include 'title'/'location' when not provided:
	var updateObj = {"otherInfo": newProfileInfo["otherInfo"], "profilePicture": newProfileInfo["profilePicture"]};
	if (newProfileInfo["email"]) {
	    updateObj["email"] = newProfileInfo["email"];
	}
	if (newProfileInfo["phone"]) {
	    updateObj["phone"] = newProfileInfo["phone"];
	}

	models.CurrentAccount // get the current account from the database
		.find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) { 
			var currentAccountArr = docs.map(function(d){ return d.toObject() });
			var currentName = currentAccountArr[0].name;

			models.AccountProfile // update the profile in the database
				.update({"name": currentName}, updateObj, function () {

			models.AccountProfile // display the updated data in the database
				.find({"name": currentName})
				.exec(displayChangedProfile);
			});
		});				


	function displayChangedProfile (err, profile) {
		console.log("new profile: "+ profile); 
		res.send("profile OK");
	}
};


/** 
 * the post number of the user add one
 */
exports.postPlusOne = function(req, res) {
	models.CurrentAccount // get the current account from the database
		.find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) { 
			var currentAccountArr = docs.map(function(d){ return d.toObject() });
			var currentName = currentAccountArr[0].name;

			models.AccountProfile // get the postNumber from the database
				.find({"name": currentName}, function (err, docs) { 
				var currentProfileArr = docs.map(function(d){ return d.toObject() });
				var oldpostNumber = currentProfileArr[0].postNumber;
				models.AccountProfile // update the profile in the database
					.update({"name": currentName}, { "postNumber": oldpostNumber+1}, function () {
						models.AccountProfile // display the updated data in the database
						.find({"name": currentName})
						.exec(displayChangedProfile);
					});
				});	
		});	

	function displayChangedProfile (err, profile) {
		console.log("new profile: "+ profile); 
		res.send("profile OK");
	}
}


/** 
 * the post number of the user add one
 */
exports.postMinusOne = function(req, res) {
	models.CurrentAccount // get the current account from the database
		.find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) { 
			var currentAccountArr = docs.map(function(d){ return d.toObject() });
			var currentName = currentAccountArr[0].name;

			models.AccountProfile // get the postNumber from the database
				.find({"name": currentName}, function (err, docs) { 
				var currentProfileArr = docs.map(function(d){ return d.toObject() });
				var oldpostNumber = currentProfileArr[0].postNumber;
				models.AccountProfile // update the profile in the database
					.update({"name": currentName}, { "postNumber": oldpostNumber-1}, function () {
						models.AccountProfile // display the updated data in the database
						.find({"name": currentName})
						.exec(displayChangedProfile);
					});
				});	
		});	

	function displayChangedProfile (err, profile) {
		console.log("new profile: "+ profile); 
		res.send("profile OK");
	}
}