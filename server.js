/**
 * Project Oracle
 * TIE-13106 (TIE-13100) Project Work on Pervasive Systems
 */

var express = require('./node_modules/express');
var routes = require('./routes');
var http = require('http');
var https = require('https');
var path = require('path');
var bodyParser = require('body-parser');

/**
 * Creates server instance
 */
module.exports = function() {
	var app = express();

	/**
	 * Runs the server
	 * @param config
	 */
	function run(config) {

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
						return res.redirect(301, 'https://' + req.hostname  + ":" + app.get('sslport') + req.url);
					} else {
						return next();
					}
				});
			};
		}

		// Envinronment settings
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'ejs');
		app.use(bodyParser.urlencoded({
		  extended: true
		}))

		routes(app);
	}
	
	/**
	 * Closes the server
	 */
	function close() {
		app.close();
	}

	return {app: app, 
			run: run,
			close: close};
}