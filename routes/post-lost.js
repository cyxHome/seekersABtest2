var data = require('../data.json');

exports.view = function(req, res){
	// console.log(data);
	res.render('post-lost', data);
};

var models = require('../models');

exports.addLostItem = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  models.CurrentAccount // get the current account from the database
    .find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) {
      var currentAccountArr = docs.map(function(d){ return d.toObject() });
      var currentName = currentAccountArr[0].name;

      var newLostItem = new models.LostGallery({
      "author": currentName,
    	"title": form_data['title'],
    	"date": form_data['date'],
    	"location": form_data['location'],
    	"description": form_data['description'],
    	"imageURL": form_data['imageURL']
      });

      console.log("newLostItem: "+newLostItem);
      newLostItem.save(afterSaving);

      function afterSaving(err) {
        if(err) {console.log(err); res.send(500); }
        res.send("OK");
      }
    });
}