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
	if (typeof object != 'object') return;
	for (var prop in object) {
		if (typeof object[prop] != "undefined") {
			if (object[prop] === target) continue;
			if (target[prop] != null && typeof target[prop] == 'object' &&
				object[prop] != null && typeof object[prop] == 'object') {
				extend(target[prop], object[prop]);
			} else if (Array.isArray(target[prop]) && Array.isArray(object[prop])) {
				target[prop].concat(object[prop]);
			} else {
				target[prop] = object[prop];
			}
		}
	}
}