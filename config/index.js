var fs = require('fs');

module.exports = (function() {

	// Load user config if exists
	var config = {};
	var configFile = 'config.js';
	if (fs.existsSync('./config/' + configFile)) {
		config = require('./' + configFile);
	}

	config.useSSL = typeof config.useSSL != "undefined" ? config.useSSL : true;
	config.forcedSSL = typeof config.forcedSSL != "undefined" ? config.forcedSSL : true;
	config.port = (config.port || process.env.PORT || 5000);
	config.sslport = (config.sslport || process.env.SSLPORT || 5001);

	return config;
}());