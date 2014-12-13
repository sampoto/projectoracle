/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for common utils
 */
var https = require('https');
 
module.exports = (function() {

	var utils = {};

	/**
	 * Fetches JSON objects from given source
	 * @param hostname
	 * @param path
	 * @param authToken
	 * @param callback (err, json)
	 */
	utils.fetchJSON = function(hostname, path, authToken, callback) {
		https.get({hostname: hostname, port:443, path: path, agent: false,
		headers: {Authorization: 'Bearer ' + authToken}},
		function(res) {
			var data = '';
			res.on('data', function(chunk) {
				data += chunk;
			});
			res.on('end', function() {
				var obj = JSON.parse(data);
				callback(null, obj);
			});
		}).on('error', function(err) {
			callback(err, null);
		});
	}
	
	return utils;
})();