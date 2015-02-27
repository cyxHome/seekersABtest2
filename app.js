
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var account = require('./routes/account');
var lost = require('./routes/lost');
var found = require('./routes/found');
var about = require('./routes/about');
var postfound = require('./routes/post-found');
var postlost = require('./routes/post-lost');
var loginedindex = require('./routes/logined-index');
var loginedabout = require('./routes/logined-about');
var loginedlost = require('./routes/logined-lost');
var loginedfound = require('./routes/logined-found');
var accountmypost = require('./routes/account-mypost');
var accountmypostedit = require('./routes/account-mypost-edit');
var accountprofile = require('./routes/account-profile');
var accountprofileedit = require('./routes/account-profile-edit');
var accountmessage = require('./routes/account-message');
var othersprofile = require('./routes/others-profile');
var searchpost = require('./routes/search-post');





// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'seeker';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
var database_uri = process.env.MONGOLAB_URI || local_database_uri;
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
// Example route
// app.get('/users', user.list);

app.get('/', index.view);
app.get('/lost', lost.view);
app.get('/found', found.view);
app.get('/about', about.view);
app.get('/post-found', postfound.view);
app.get('/post-lost', postlost.view);
app.get('/logined-index', loginedindex.view);
app.get('/logined-about', loginedabout.view);
app.get('/logined-lost', loginedlost.view);
app.get('/logined-found', loginedfound.view);
app.get('/account-mypost', accountmypost.view);
app.get('/account-message', accountmessage.view);
app.get('/account-profile', accountprofile.view);
app.get('/account-profile-edit', accountprofileedit.view);
app.get('/account-mypost-edit', accountmypostedit.view);
app.get('/others-profile', othersprofile.view);
app.get('/search-post', searchpost.view);


app.post('/account/new', account.addAccount);
app.post('/post-found/new', postfound.addFoundItem);
app.post('/post-lost/new', postlost.addLostItem);
app.post('/edit-profile', accountprofileedit.editProfile);
app.post('/account/login', account.findAccount);
app.post('/account/sign-up-name-check', account.nameCheck);
app.post('/account/save-current', account.saveCurrentAccount);
app.post('/myPost/:id/delete', accountmypost.deleteItem);
app.post('/myPost/:id/gotoEdit', accountmypostedit.gotoEditMypost);
app.post('/myPost/:id/edit', accountmypostedit.editMypost);
app.post('/edit-profile/postNumberPlusOne', accountprofileedit.postPlusOne);
app.post('/edit-profile/postNumberMinusOne', accountprofileedit.postMinusOne);
app.post('/gotoOthersProfile', othersprofile.gotoOthersProfile);
app.post('/search-post/lost', searchpost.searchForLostItems);
app.post('/search-post/found', searchpost.searchForFoundItems);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
