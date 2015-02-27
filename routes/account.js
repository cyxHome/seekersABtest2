var models = require('../models');



/**
 * Find the account the user enter when login
 */
exports.findAccount = function(req, res) { 
  var accountName = req.body;

  console.log("server get input accountName: " + accountName['name']);

  models.AccountProfile.find({"name": accountName['name']}).exec(afterQuery);

  function afterQuery(err, accounts) {
    console.log("after query call back, accounts: "+accounts);
    // the account does not exist in the database
    if (err) console.log(err);
    // if the account exist, send to client
    res.json(accounts[0]);
  }
}


/** 
 * Save the current account to database after the user has logined
 */
exports.saveCurrentAccount = function(req, res) {

  var form_data = req.body;
  var currentName = form_data['name'];

  models.CurrentAccount // update the current account profile,
    .update({"id": 1}, {"name": currentName}, function () {
    console.log("updata: "+currentName);

    models.CurrentAccount // call back function display the updated current account to the terminal
      .find({"id": 1})
      .exec(function (err, currentAccount) {
        console.log("updated new currentAccount: " + currentAccount);
        res.send("OK");
      });
    });

}


/**
 * Check if the name has been taken when the user try to sign-up
 */
exports.nameCheck = function(req, res) {

  var accountName = req.body;

  models.AccountProfile.find({"name": accountName['name']}).exec(afterQuery);

  function afterQuery(err, accounts) {
    console.log("after query call back, accounts: "+accounts);
    // the account does not exist in the database
    if (err) console.log(err);
    // if the account exist, send to client
    res.json(accounts[0]);
  }

}


/**
 * Add an account to the database after the user has signed up
 */
exports.addAccount = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // Gather the information from the client 
  var newAccount = new models.AccountProfile({
    "name": form_data['name'],
    "password": form_data['password'],
    "email": form_data['email'],
    "phone": form_data['phone'],
    "otherInfo": form_data['otherInfo'],
    "profilePicture": form_data['profilePicture'],
    "postNumber": form_data['postNumber']
  });

  // save the information to the database
  console.log("newAccount: " + newAccount);
  newAccount.save(afterSaving); 

  function afterSaving(err) {
    if(err) {console.log(err); res.send(500); }
    res.send("OK");
  }
}