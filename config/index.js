var fs = require('fs');

/**
 * @param filename Optional parameter for selecting a custom config file
 */
module.exports = (function(filename) {

	var config = require('./default.js');

	// Load user config if exists
	// Config values override the default values
	var environment = process.env.NODE_ENV || "development";
	var configFile = filename || 'config.'+environment+'.js';
	if (fs.existsSync(__dirname + "/" + configFile)) {
		var conf = require('./' + configFile);
		extend(config, conf);
	}

	return config;
}());

function extend(target, object) {
	for (var prop in object) {
		target[prop] = object[prop];
	}
}