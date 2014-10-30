/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 */

var express = require('express');
var path = require('path');
 
var index = function(req, res){
    res.render('index.html', {});
};

var partials = function (req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
}

/**
 * @param app Express app instance
 * @param passport Passport instance
 */
module.exports = function(app, passport) {
	
	app.use("/", express.static(path.join(__dirname + "/../", 'public')));
	app.use(function(req, res, next) {
		res.cookie('XSRF-TOKEN', req.session._csrf);
		next();
	});

	app.get('/', index);
	app.get('/partials/:name', partials);

	var auth = require('./authRoutes.js')(passport);
	app.get('/auth/google', auth.googleAuth);
	app.get('/auth/google/callback', auth.googleAuthCallback);
	app.get('/loggedin', auth.loggedIn);
	app.post('/logout', auth.logout);

	app.get('*', index);
}