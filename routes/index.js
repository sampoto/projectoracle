/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 */

var express = require('express');
var path = require('path');
 
var index = function(req, res){
    res.render('index', {});
};

/**
 * @param app Express app instance
 * @param passport Passport instance
 */
module.exports = function(app, passport) {
	
	app.use("/", express.static(path.join(__dirname + "/../", 'public')));
	
	app.get('/', index);

	var auth = require('./authRoutes.js')(passport);
	app.get('/auth/google', auth.googleAuth);
	app.get('/auth/google/callback', auth.googleAuthCallback);

	app.get('*', index);
}