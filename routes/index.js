/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 */

var express = require('express');
var path = require('path');
var Apiv1 = require('../api/v1');

var index = function(req, res){
    res.render('index.html', {});
};

var partials = function (req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
}

/**
 * @param app Express app instance
 * @param config Application config
 * @param passport Passport instance
 * @param db database instance
 */
module.exports = function(app, config, passport, db) {
	
	var apiv1 = Apiv1(db);
	
	app.use("/", express.static(path.join(__dirname + "/../", 'public')));
	app.use(function(req, res, next) {
		if (typeof req.csrfToken == "function")
			res.cookie('XSRF-TOKEN', req.csrfToken());
		next();
	});

	// Handler for errors that are displayed after redirects
	app.use(function(req, res, next) {
		if (req.session.errors && req.session.errors.length > 0) {
			var data = {errors: req.session.errors};
			delete req.session.errors;
			res.render('error.html', data);
		} else {
			next();
		}
	});

	app.get('/', index);
	app.get('/partials/:name', partials);

	app.use('/api/v1', apiv1);

	var auth = require('./authRoutes.js')(passport, db);
	app.get('/auth/google', auth.googleAuth);
	app.get('/auth/google/callback', auth.googleAuthCallback);
	app.get('/auth/flowdock', auth.flowdockAuth);
	app.get('/auth/flowdock/callback', auth.flowdockAuthCallback, auth.flowdockAuthLink);
	
	/**
	 * @apiDescription Method to get Pivotal Tracker token by authenticating with username and password to Pivotal Tracker.
	 * @api {post} /auth/pivotal Pivotal Tracker authentication
	 * @apiGroup Authentication
	 * @apiParam {String} username	Pivotal tracker username 
	 * @apiParam {String} password	Pivotal tracker password
	 * @apiParamExample {json} Pivotal-Authentication-Example:
	 *     {
	 *       "username":"foo",
	 *		 "password":"bar"
	 *     }	 
	 */
	app.post('/auth/pivotal', auth.pivotalAuth, auth.pivotalAuthLink);

	app.get('/profile', auth.profile);
	app.post('/logout', auth.logout);

	app.use(function(err, req, res, next) {
		if (config.debug) {
			console.error(err.stack);
		}
		if (typeof err.code != "undefined" && err.code === 'EBADCSRFTOKEN') {
			res.status(403);
			res.send('invalid csrf token');
		} else {
			res.status(500);
			res.send('Internal server error');
		}
	});
	
	app.get('*', index);
}
