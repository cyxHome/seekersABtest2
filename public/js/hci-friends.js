'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

});


// user profile Javascript end here

// Menu Toggle Script 

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(".menu-close").click(function(e) {
    $("#wrapper").removeClass("toggled");
});


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");

	/**
	 * Post a new found item (listening to the submit button in post-found.handlebars)
	 */
	$('#newFoundItemSubmitButton').click(function(e) {
		console.log('clicked newFoundItemSubmitButton');
		var title = $('#post-new-found-form #new-found-title').val();
		var location = $('#post-new-found-form #new-found-location').val();
		var description = $('#post-new-found-form #new-found-description').val();
		var verification = $('#post-new-found-form #new-found-verification').val();
		var image_url = $('#post-new-found-form #new-found-image').val();
		var currentdate = new Date(); 
		var json = {
			// the author information is gathered from the server
			"title": title,
			// the date and time information is set automatically according to the system time
			"date": currentdate,
			"location": location,
			"description": description,
			"verification": verification,
			"imageURL": image_url
		};
		$.post('/post-found/new', json, function() {
			// if successfully post, the current user add a new post 
			$.post('/edit-profile/postNumberPlusOne', function () { 
				// redirect to found gallery (logined-found.handlebars)
				window.location.href = '/logined-found'; 
			});
		});
	});


	/**
	 * Post a new lost item (listening to the submit button in post-lost.handlebars)
	 */
	$('#newLostItemSubmitButton').click(function(e) {
		console.log('clicked newLostItemSubmitButton');
		var title = $('#post-new-lost-form #new-lost-title').val();
		var location = $('#post-new-lost-form #new-lost-location').val();
		var description = $('#post-new-lost-form #new-lost-description').val();
		var image_url = $('#post-new-lost-form #new-lost-image').val();
		var currentdate = new Date(); 
		var json = {
			// the author information is gathered from the server
			"title": title,
			// the date and time information is set automatically according to the system time
			"date": currentdate,
			"location": location,
			"description": description,
			"imageURL": image_url
		};
		$.post('/post-lost/new', json, function() { 
			// if successfully post, the current user add a new post 
			$.post('/edit-profile/postNumberPlusOne', function () { 
				// redirect to lost gallery (logined-lost.handlebars)
				window.location.href = '/logined-lost';  
			});
		});
	});


	/**
	 * Sign up (listening to the submit button in sign-up-form)
	 */
	$('#newAccountCreateButton').click(function(e) {
		console.log('clicked newAccountCreateButton');
		var name = $('#sign-up-form #sign-up-name').val();
		var email = $('#sign-up-form #sign-up-email').val();
		var password = $('#sign-up-form #sign-up-password').val();
		var confirmPassword = $('#sign-up-form #sign-up-password-confirm').val();
		if (password !== confirmPassword) 
		{
			createPasswordUnmatched();
			return;
		}

		var json = {
			"name": name,
			"password": password,
			"email": email,
			"phone": "please edit your profile to set your phone number",
			"otherInfo": "",
			"profilePicture": "https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=100",
			"postNumber": 0
		};

		/**
		 * Check if the name has been taken
		 */
		var url_call = '/account/sign-up-name-check';

		$.post(url_call, { name: name }, function() {
    		alert( "the name has been taken" );
    		return;
  		}).fail(function() { // the name has not been taken, sign-up success, and reload the page 
			$.post('/account/new', json, function() {
				alert("sign-up success!"); 
				window.location.reload(); 
			});
  		});
	});


	/**
	 * Login (listening to the submit button in login-form)
	 */
	$('#loginRequestSubmitButton').click(function(e) {
		console.log('clicked loginRequestSubmitButton');
		var inputName = $('#login-form #login-name').val();
		var inputPassword = $('#login-form #login-password').val();
		var url_call = '/account/login';

		/** 
		 * Call back function
		 * Check if the account password match the password that the user has inputed
		 */
		function passwordCheck(account_json) {
			var accountPassword = account_json['password'];
			console.log("accountPassword: " + accountPassword);
			if (accountPassword !== inputPassword)
			{
				passwordNotMatch();
				return;
			}	
			else
			{   // successfully logined, change the current accoun
				alert("welcome back " + account_json["name"] + "!");

				localforage.setItem('currentAccount', account_json['name'], function(err, value) {
    				// Do other things once the value has been saved.
    				console.log("currentAccount: "+value);
				});

				$.post('/account/save-current', {name: account_json["name"]}, function() {});

				// redirect the page to logined page
				window.location.href = '/logined-index'; 
			}

		}

		/**
		 * post the input name to the server,
		 * if found such name in database, means there is such an account -> return the account, call passwordCheck to check if the password match the name
		 * if not found, means the name has not been signed up -> won't call passwordCheck, push an alert
		 */
		$.post(url_call, { name: inputName }, passwordCheck).fail(function() {
    		alert( "the name has not been sign-up" );
  		});
	});


	/**
	 * Edit user profile (listening to the submit button in account-profile-edit.handlebars)
	 */
	$('#editProfileSubmitButton').click(function(e) {
		console.log('clicked editProfileSubmitButton');
		var email = $('#edit-profile-form #edit-profile-email').val();
		var phone = $('#edit-profile-form #edit-profile-phone').val();
		var otherInfo = $('#edit-profile-form #edit-profile-otherInfo').val();
		var image_url = $('#edit-profile-form #edit-profile-image').val();
		var json = {
			"email": email,
			"phone": phone,
			"otherInfo": otherInfo,
			"profilePicture": image_url
		};

		$.post('/edit-profile', {json: json} , function() {
			// redirect to the profile page for user to check
			window.location.href = '/account-profile';  
		});

	});


	/**
	 * Delete my posted item (listening to the trash bin icon in account-mypost.handlebars)
	 */
	$('.glyphicon-trash').click(function(e) {

		// Get the div ID, e.g., "myPost3"
		var itemID = $(this).closest('.my-post-items').attr('id');
		// get rid of 'myPost' from the front of the id 'myPost3'
		var idNumber = itemID.substr('myPost'.length);

		$.post('/myPost/'+idNumber+'/delete', function() {
			// if successfully delete, the current user eliminate a post 
			$.post('/edit-profile/postNumberMinusOne', function () { 
				// reload the page to see the result of deleting
				window.location.reload();  
			});
		});

	});


	/**
	 * Edit my posted item (listening to the trash bin icon in account-mypost.handlebars)
	 * redirect the page to the page that can edit the post, and send the id_ of the item to the server
	 */
	$('.glyphicon-pencil').click(function(e) {

		// Get the div ID, e.g., "myPost3"
		var itemID = $(this).closest('.my-post-items').attr('id');
		// get rid of 'myPost' from the front of the id 'myPost3'
		var idNumber = itemID.substr('myPost'.length);

		$.post('/myPost/'+idNumber+'/gotoEdit', function() {
			// redirect to check my post
			window.location.href = '/account-mypost-edit'; 
		});

	});


	/**
	 * Update my posted item information (listening to the submit button in account-mypost-edit.handlebars)
	 */
	$('#editMyPostSubmitButton').click(function(e) {

		// Get the div ID, e.g., "edit-post-form3"
		var itemID = $(this).closest('.post-edit-form').attr('id');
		// get rid of 'edit-post-form' from the front of the id 'edit-post-form3'
		var idNumber = itemID.substr('edit-post-form'.length);

		console.log('clicked editMyPostSubmitButton');
		var title = $('#edit-post-title').val();
		var location = $('#edit-post-location').val();
		var description = $('#edit-post-description').val();
		var image_url = $('#edit-post-image').val();

		var json = {
			// the author information will not be changed
			"title": title,
			"location": location,
			"description": description,
			"imageURL": image_url
		};

		$.post('/myPost/'+idNumber+'/edit', {json: json}, function() {
			// redirect to check my post
			window.location.href = '/account-mypost'; 
		});

	});


	/**
	 * Go to see the profile of other author (listening to the author name in the gallery)
	 */
	$('.author-of-post').click(function(e) {

		// Get the div ID, e.g., "myPost3"
		var authorOfPost = $(this).closest('.author-of-post').attr('author');
		// get rid of 'myPost' from the front of the id 'myPost3'
		// var idNumber = itemID.substr('myPost'.length);
		console.log("the author is "+authorOfPost);

		$.post('/gotoOthersProfile', { author: authorOfPost }, function() {
			// redirect see the author's profile
			window.location.href = '/others-profile'; 
		});

	});



	/**
	 * Search for the related item (listening to the submit button in index.handlebars, logined-index.handlebars)
	 */
	$('#searchSubmitButton').click(function(e) {
		console.log('clicked searchSubmitButton');
		var searchLost = $('#search-form #search-lost').val();
		var searchFound = $('#search-form #search-found').val();
		console.log("searchLost: "+searchLost+" Its length: "+searchLost.length);
		console.log("searchFound: "+searchFound+" Its length: "+searchFound.length);
		if (searchLost.length !==0 && searchFound.length !==0) 
		{   // alert the user that he/she has specified both lost and found 
			alert("please only enter in one bar!");
			return;
		}
		else if (searchLost.length !==0)
		{   // post the item to search and display all the related items in the lost gallery
			$.post('/search-post/lost', { item: searchLost }, function() { 
				// redirect to lost gallery (logined-lost.handlebars)
				window.location.href = '/search-post';  
			});
		}
		else if (searchFound.length !==0)
		{	// post the item to search and display all the related items in the found gallery
			$.post('/search-post/found', { item: searchFound }, function() { 
				// redirect to found gallery (logined-lost.handlebars)
				window.location.href = '/search-post';  
			});
		}
		else 
		{   // alert the user that he/she has not enter any thing and click search
			alert("please enter the item you want to search for and click search");
			return;
		}
	});

	/** 
	 * alert the user to login when the user want to see other's profile
	 * prevent refresh the page by preventDefault()
	 *     so that the page won't go to the top
	 */
	$('.seeProfileNeedLogin').click(function(e) { 
		e.preventDefault();
		seeProfileNeedLogin();
	});

// initializePage end here
} 



function passwordNotMatch() {
	alert("the name and password you entered can not match")
}

function createPasswordUnmatched() {
	alert("the two passwords you entered should be the same");
}

function postNeedLogin() {
    alert("Please login before you post");
}

function searchNeedLogin() {
	alert("Please login before you search");
}

function seeProfileNeedLogin() {
	alert("Please login before you see other's profile");
}

function logoutSuccess() {
	alert("You have logout");
}