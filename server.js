/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 */

var express = require('./node_modules/express');
var session = require('express-session');
var routes = require('./routes');
var http = require('http');
var https = require('https');
var path = require('path');
var passport = require('passport');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var database = require('./libs/db');
var auth = require('./libs/Auth');

/**
 * Creates server instance
 */
module.exports = function() {
	var app = express();
	var db = null;

	/**
	 * Runs the server
	 * @param config
	 */
	function run(config) {
	    
	    // Connect to database
	    db = new database(config.dbOptions);
		db.init();
	
		http.createServer(app).listen(config.port, function(){
			console.log('Express http server listening on port ' + config.port);
		});

		// Start https server for other environments than heroku
		if (process.env.NODE_ENV != 'heroku' && config.useSSL) {
			if (config && config.sslOptions) {
				https.createServer(config.sslOptions, app).listen(config.sslport, function(){
					console.log('Express https server listening on port ' + config.sslport);
				});
			} else {
				throw new Error("Error: SSL options are not defined.");
			}
		}
		
		if (config.useSSL && config.forcedSSL) {
			if (process.env.NODE_ENV == 'heroku') {
				app.use(function (req, res, next) {
					res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');
					if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
						return res.redirect(301, 'https://' + req.host + req.url);
					} else {
						return next();
					}
				});
			} else {
				app.use(function (req, res, next) {
				res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');
					if (!req.secure) {
						return res.redirect(301, 'https://' + req.hostname  + ":" + config.sslport + req.url);
					} else {
						return next();
					}
				});
			};
		}

		// Envinronment settings
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'ejs');
		app.engine('html', require('ejs').renderFile);
		app.use(bodyParser.urlencoded({
		  extended: true
		}))
		app.use(session({ resave: true, saveUninitialized: true, secret: config.sessionSecret }));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(csrf({value: csrfValue}));

		routes(app, config, passport, db);
		auth(passport, config.auth, db);
	}
	
	/**
	 * Closes the server
	 */
	function close() {
		app.close();
		db.close();
	}

	return {app: app, 
			run: run,
			close: close};
}

function csrfValue(req) {
	var token;
	if (req.body && req.body._csrf) {
		token = req.body._csrf;
	} else if (req.query && req.query._csrf) {
		token = req.query._csrf;
	} else {
		token = req.headers['x-csrf-token'] || req.headers['x-xsrf-token'];
	}
	return token;
}
