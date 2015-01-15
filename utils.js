/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for common utils
 */
var https = require('https');
 
module.exports = (function() {

	var utils = {};

	utils.pivotalHost = "www.pivotaltracker.com";
	utils.pivotalServicePath = "/services/v5";
	
	/**
	 * Fetches JSON objects from given source
	 * @param hostname
	 * @param path
	 * @param headers
	 * @param callback (err, json)
	 */
	utils.fetchJSON = function(hostname, path, headers, callback) {
		var opt = {hostname: hostname, port:443, path: path, agent: false};
		opt.headers = headers != null ? headers : {};
		opt.headers["Content-Type"] = "application/json";
		https.get(opt,
		function(res) {
			var data = '';
			res.on('data', function(chunk) {
				data += chunk;
			});
			res.on('end', function() {
				try {
					var obj = JSON.parse(data);
				} catch (err) {
					return callback(err, null);
				}
				callback(null, obj);
			});
		}).on('error', function(err) {
			callback(err, null);
		});
	}
	
	return utils;
})();