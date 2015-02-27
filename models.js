
var Mongoose = require('mongoose');



/**
 * Lost Gallery Schema and Model
 */
var LostGallerySchema = new Mongoose.Schema({
	// fields are defined here
	"author": String,
	"title": String,
	// do not need time (just put the time in the date, so that moogooes can sort by date)
	"date": Date,
	"location": String,
	"description": String,
	"imageURL": String
});

exports.LostGallery = Mongoose.model('LostGallery', LostGallerySchema);


/** 
 * Found Gallery Schema and Model
 */
var FoundGallerySchema = new Mongoose.Schema({
	"author": String,
	"title": String,
	"date": Date,
	"location": String,
	"description": String,
	"verification": String,
	"imageURL": String
});

exports.FoundGallery = Mongoose.model('FoundGallery', FoundGallerySchema);


/** 
 * Account and Profile Schema and Model
 */
var AccountProfileSchema = new Mongoose.Schema({
	"name": String,
	"password": String,
	"email": String,
	"phone": String,
	"otherInfo": String,
	"profilePicture": String,
	"postNumber": Number
});

exports.AccountProfile = Mongoose.model('AccountProfile', AccountProfileSchema);


/** 
 * Current Account Schema and Model
 * we need a database for current account
 *    so that we can get the current account directly in the server (from database)
 *    and it is benefical to save the last account we used in the database 
 *    (so that we can frequently restart the server during debugging, which will make us lose the data in the server.
 *    But if we use a database (instead of a global veriable) to store the data for the server, we will not lose it) 
 */
var CurrentAccountSchema = new Mongoose.Schema({
	// fields are defined here
	"id": Number,
	"name": String
});

exports.CurrentAccount = Mongoose.model('CurrentAccount', CurrentAccountSchema);