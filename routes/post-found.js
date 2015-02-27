var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
	// console.log(data);
	res.render('post-found', data);
};


exports.addFoundItem = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  models.CurrentAccount // get the current account from the database
    .find({"id": 1},{"name": 1, "_id": 0}, function (err, docs) {
      var currentAccountArr = docs.map(function(d){ return d.toObject() });
      var currentName = currentAccountArr[0].name;

      var newFoundItem = new models.FoundGallery({
      "author": currentName,
      "title": form_data['title'],
      "date": form_data['date'],
      "location": form_data['location'],
      "description": form_data['description'],
      "verification": form_data['verification'],
      "imageURL": form_data['imageURL']
      });

      console.log("newFoundItem: "+newFoundItem);
      newFoundItem.save(afterSaving);

      function afterSaving(err) {
        if(err) {console.log(err); res.send(500); }
        res.send("OK");
      }
    });
}
