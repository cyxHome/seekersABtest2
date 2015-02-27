
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'seeker';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);




// Do the initialization here



/**
 * Initalize the lost gallery database 
 */

// Step 1: load the JSON data 
var lostGallery_json = require('./data_json/lost-gallery.json');

// Step 2: Remove all existing documents
models.LostGallery
  .find()
  .remove()
  .exec(onceClearLostGallery); // callback to continue at



// Step 3: load the data from the JSON file
function onceClearLostGallery(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  console.log('lostGallery_json.length: ' + lostGallery_json.length);
  
  var to_save_count = lostGallery_json.length;

  for(var i=0; i<lostGallery_json.length; i++) {
    var json = lostGallery_json[i];
    var proj = new models.LostGallery(json);

    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('Lost Gallery Initialization DONE');
        // The script won't terminate until the 
        // connection to the database is closed


      }
    });
  }
}


/**
 * Initalize the found gallery database 
 */

// Step 1: load the JSON data 
var foundGallery_json = require('./data_json/found-gallery.json');

// Step 2: Remove all existing documents
models.FoundGallery
  .find()
  .remove()
  .exec(onceClearFoundGallery); // callback to continue at



// Step 3: load the data from the JSON file
function onceClearFoundGallery(err) {
  if(err) console.log(err);

  console.log('foundGallery_json.length: ' + foundGallery_json.length);
  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = foundGallery_json.length;
  for(var i=0; i<foundGallery_json.length; i++) {
    var json = foundGallery_json[i];
    var proj = new models.FoundGallery(json);

    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('Found Gallery Initialization DONE');
        

      }
    });
  }
}


/**
 * Initalize the account
 */

// Step 1: load the JSON data 
var accounts_json = require('./data_json/accounts.json');

// Step 2: Remove all existing documents
models.AccountProfile
  .find()
  .remove()
  .exec(onceClearAccountProfile); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearAccountProfile(err) {
  if(err) console.log(err);
  console.log('accounts_json.length: ' + accounts_json.length);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = accounts_json.length;
  for(var i=0; i<accounts_json.length; i++) {
    var json = accounts_json[i];
    var proj = new models.AccountProfile(json);

    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('Account Profile Initialization DONE');

       
      }
    });
  }
}


/**
 * Initalize the current account to empty string
 */

// Step 1: load data from local file
var currentAccounts_json = require('./data_json/current-account.json');

// Step 2: Remove all existing documents
models.CurrentAccount
  .find()
  .remove()
  .exec(onceClearCurrentAccount); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearCurrentAccount(err) {
  if(err) console.log(err);
  console.log('currentAccounts_json.length: ' + currentAccounts_json.length);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = currentAccounts_json.length;
  for(var i=0; i<currentAccounts_json.length; i++) {
    var json = currentAccounts_json[i];
    var proj = new models.CurrentAccount(json);
    proj.save(function(err, proj) {
        if(err) console.log(err);

        to_save_count--;
        console.log(to_save_count + ' left to save');
        if(to_save_count <= 0) {
           console.log('Current Account Initialization DONE');

          // The script won't terminate until the 
          // connection to the database is closed

          // put this in the last intialization
          // and check in the terminal that all the database has been intialized properly (with "Done" printed out)
           mongoose.connection.close(); 
        }
    });
  }
}