/**
 * Project Oracle
 * TIE-13106 (TIE-13100) Project Work on Pervasive Systems
 */

var fs = require('fs');
var express = require('./node_modules/express');
var routes = require('./routes');
var http = require('http');
var https = require('https');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Load config if exists
var config = {};
var configFile = './config.js';
if (fs.existsSync(configFile)) {
    config = require(configFile);
}
var useSSL = typeof config.useSSL != "undefined" ? config.useSSL : true;
var forcedSSL = typeof config.forcedSSL != "undefined" ? config.forcedSSL : true;

// Envinronment settings
app.set('port', (config.port || process.env.PORT || 5000));
app.set('sslport', (config.sslport || process.env.SSLPORT || 5001));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}))

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express http server listening on port ' + app.get('port'));
});

// Start https server for other environments than heroku
if (process.env.NODE_ENV != 'heroku' && useSSL) {
	if (config && config.sslOptions) {
		https.createServer(config.sslOptions, app).listen(app.get('sslport'), function(){
			console.log('Express https server listening on port ' + app.get('sslport'));
		});
	} else {
		console.log("Error: Config file (" + configFile + ") doesn't exist or SSL options are not defined.");
		process.exit(1);
	}
}

if (useSSL && forcedSSL) {
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

app.get('/', routes.index);