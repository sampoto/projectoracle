/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for common utils
 */
var https = require('https');
var querystring = require('querystring');

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

	/**
	* @param hostname
	* @param path
	* @param headers
	* @param dataToSend Data to be sent
	* @param callback (err, status, data)
	*/
	utils.post = function(hostname, path, headers, dataToSend, callback) {
		var opt = {hostname: hostname, port:443, path: path, method: 'POST', agent: false};
		var formattedData = querystring.stringify(dataToSend);
		opt.headers = headers != null ? headers : {};
		opt.headers["Content-Type"] = "application/x-www-form-urlencoded";
		opt.headers["Content-Length"] = formattedData.length;
		var req = https.request(opt,
		function(res) {
			var data = '';
			res.on('data', function(chunk) {
				data += chunk;
			});
			res.on('end', function() {
				callback(null, res.statusCode, data);
			});
		}).on('error', function(err) {
			callback(err, null);
		});

		req.write(formattedData);
		req.end();
	}

	return utils;
})();