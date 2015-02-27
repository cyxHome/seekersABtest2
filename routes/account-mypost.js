var models = require('../models');

exports.view = function(req, res){

	models.CurrentAccount // get the current account from the database
		.find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) {
			var currentAccountArr = docs.map(function(d){ return d.toObject() });
			var currentName = currentAccountArr[0].name;

			models.FoundGallery // get the post from the database 
				.find({"author": currentName})
				.sort('date')
				.exec(renderItemsFromFound);


			function renderItemsFromFound(err, foundItems) {

				function renderItemsFromFoundAndLost(err, lostItems) {
					if (!lostItems.length && !foundItems.length)
					{
						console.log("no post");
						res.render('account-mypost', { 'no-post': { "name" : "there is not post here" } });
					}	
					else
					{
						console.log("have post");
						res.render('account-mypost', { 'my-founds': foundItems , 'my-losts': lostItems ,  });
					}
				}

				models.LostGallery // get the post from the database 
						.find({"author": currentName})
						.sort('date')
						.exec(renderItemsFromFoundAndLost);
			}
		});

};

exports.deleteItem = function(req, res) {
  var itemID = req.params.id;

  // find the item and remove it
  // YOU MUST send an OK response w/ res.send();
  models.LostGallery.find({"_id": itemID}).remove().exec(afterRemoving);
  models.FoundGallery.find({"_id": itemID}).remove().exec(afterRemoving);

  function afterRemoving(err, projects) {
    if(err) { console.log(err); res.send(500); }
    res.send("OK");
  }
}