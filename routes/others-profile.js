
var models = require('../models');

var authorToVisit; 

/*
 * Find the profile information that match of the author who post the article,
 * Call back function send the data of this specific user to the client
 * This function will be called everytime when the profile page is load
 */
exports.view = function(req, res){

	models.AccountProfile // get the profile information from the database 
		.find({"name": authorToVisit})
		.exec(renderProfile);

	function renderProfile(err, profile) {
		console.log("view profile: "+profile); 
		res.render('others-profile', { 'profile': profile });
	}
};


/**
 * Get the author in this server before the client redirect to the page and call .view function above
 * So that the .view function can get the profile of the author and display it to the handlebars
 */
exports.gotoOthersProfile = function(req, res){
  	var form_data = req.body;
	authorToVisit = form_data["author"]; // global variable of this server (so that the .view function can access this author)
	res.send("item OK");
	
};