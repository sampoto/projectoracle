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

	utils.flowdockHost = "api.flowdock.com";
	utils.flowdockRevokePath = "/oauth/revoke";
	utils.flowdockTokenPath = "/oauth/token";
	
	/**
	 * Fetches JSON objects from given source
	 * @param hostname
	 * @param path
	 * @param headers
	 * @param callback (err, status, data)
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
					return callback(null, res.statusCode, obj);
				} catch (err) {
					return callback(err, res.statusCode, data);
				}
			});
		}).on('error', function(err) {
			callback(err, null);
		});
	}
	

	/**
	 * @param db
	 * @param authInfo
	 * @param user
	 * @param accountInfo
	 * @param hostname
	 * @param path
	 * @param headers
	 * @param callback (err, statuscode, data)
	 */
	utils.OAuthRequest = function(db, authInfo, user, accountInfo, hostname, path, headers, callback) {
		var originalHeaders = {};
		for (prop in headers) {
			originalHeaders[prop] = headers[prop];
		}
		
		doRequest(true);
		function doRequest(allowRetry) {
			headers = headers || {};
			headers['Authorization'] = 'Bearer ' + accountInfo.access_token;
			utils.fetchJSON(hostname, path, headers, function(err, statusCode, receivedData) {
				if (statusCode == 401 || statusCode == 403) {
					if (!allowRetry) return callback(new Error('Fetching new access token failed'));
					var body = {"refresh_token": accountInfo.refresh_token, "client_id": authInfo.clientId, "client_secret": authInfo.clientSecret, "grant_type": "refresh_token"};
					var tokenPath = null;
					if (accountInfo.account_name == db.utils.projects.appIds.FLOWDOCK) {
						tokenPath = utils.flowdockTokenPath;
					}
					if (tokenPath) {
						utils.post(hostname, tokenPath, headers, body, function(err, statusCode, data) {
							if (err) return callback(err);
							try {
								var obj = JSON.parse(data);
								// Update access token and try again
								accountInfo.access_token = obj.access_token;
								db.utils.updateAccessToken(accountInfo.account, user, obj.access_token, function(err) {
									if (err) return callback(err);
									headers = originalHeaders;
									headers['Authorization'] = 'Bearer ' + obj.access_token;
									utils.fetchJSON(hostname, path, headers, function(err, statusCode, receivedData) {
										callback(err, statusCode, receivedData);
									});
								});
							} catch (err) {
								return callback(err, statusCode, data);
							}
						});
					} else {
						callback(new Error('Invalid access token'));
					}
				} else if (!err) {
					callback(null, statusCode, receivedData);
				} else {
					return callback(err);
				}
			});
		}
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