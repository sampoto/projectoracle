/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for database utils
 */
 
var crypto = require('crypto');
var projects = require('./utils.projects.js');
var async = require('async');
var algorithm = 'aes-256-cbc';
var commonUtils = require('../../utils.js');

module.exports = function(db, config) {
	var utils = {};

	utils.projects = projects(db);
	
	/**
	 * Creates account with given email address
	 * @param email
	 * @param callback (err, user)
	 */
	utils.createUser = function(email, callback) {
		db.models.user.findOrCreate({where: {email: email}, defaults:{}}).then(function(users) {
			if (callback)
				callback(null, users[0]);
		})
		.catch(function(err) {
			if (callback)
				callback(err, null);
		});
	}
	
	/**
	 * Gets user with given email address
	 * @param email Email address
	 * @param callback (error, user)
	 */
	utils.getUser = function(email, callback) {
		db.models.user.findOne({where: {email: email}}).then(function(user) {
			callback(null, user);
		})
		.catch(function(err) {
			callback(err, null);
		});
	}

	/**
	 * Convenience function for setting userlevel for given user
	 * @param user
	 * @param userlevel
	 * @param callback (err)
	 */
	utils.setUserLevel = function(user, userlevel, callback) {
		user.userlevel = userlevel;
		user.save().then(function() {
			callback(null);
		}).catch(function(err) {
			callback(err);
		});
	}

	/**
	 * Tells if given user is an admin
	 */
	utils.isAdmin = function(user) {
		return (user.userlevel === db.userlevels.ADMIN);
	}
	
	/**
	 * Sets admins
	 * @param admins Array of admin email addresses
	 * @param forceAdmins
	 * @param callback (err)
	 */
	utils.setAdmins = function(admins, forceAdmins, callback) {
		if (typeof forceAdmins != "undefined" && forceAdmins) {
			db.models.user.update({userlevel: 0}, {where: {email: { not: admins } }})
			.then(function() {
				createAdmins();
			}).catch(function(err) {
				callback(err);
			});
		} else {
			createAdmins();
		}

		function createAdmins() {
			async.each(admins, function(adminEmail, cb) {
				db.models.user.findOrCreate({where: {email: adminEmail}, defaults: {userlevel: db.userlevels.ADMIN}})
				.then(function() {
					cb();
				}).catch(function(err) {
					cb(err);
				});
			}, function(err) {
				callback(err);
			});
		}
	};

	/**
	 * Links an account to given user
	 * @param user
	 * @param accountInfo
	 * @param accountInfo.account_name
	 * @param accountInfo.access_token
	 * @param accountInfo.refresh_token
	 * @param callback (err)
	 */
	utils.linkAccount = function(user, accountInfo, callback) {
		callback = callback || function(){};
		user.getAccounts({where: {account_name: accountInfo.account_name}}).then(function(accounts) {
			if (accounts.length > 0) {
				accounts[0].destroy().then(function() {
					createAccount();
				});
			} else {
				createAccount();
			}
		}).catch(function(err) {
			callback(err);
		});

		function createAccount() {
			db.models.account.create({account_name: accountInfo.account_name,
			access_token: encrypt(config.encryptKey, user.email, accountInfo.access_token),
			refresh_token: encrypt(config.encryptKey, user.email, accountInfo.refresh_token)})
			.then(function(account) {
				user.addAccount(account).then(function() {
					callback(null);
				})
				.catch(function(err) {
					callback(err);
				});
			})
			.catch(function(err) {
				callback(err);
			});
		}
	}
	
	/**
	 * Gets certain kind of account information from given user
	 * @param user
	 * @param accountName
	 * @param callback (error, account)
	 */
	utils.getAccountInfo = function(user, accountName, callback) {
		user.getAccounts({where: {account_name: accountName}}).then(function(accounts) {
			if (accounts.length > 0) {
				var acc = accounts[0];
				var account = utils.getAccountDetails(user, acc);
				callback(null, account);
			} else {
				var error = new Error('Account not found');
				error.code = 'accountnotfound';
				callback(error);
			}
		})
		.catch(function(err) {
			callback(err, null);
		});
	}
	
	/**
	 * Gets account details from user's account object
	 * Use this to access decrypted tokens
	 * @param user
	 * @param account
	 */
	utils.getAccountDetails = function(user, account) {
		var details = { account_name: account.account_name,
						access_token: decrypt(config.encryptKey, user.email, account.access_token),
						refresh_token: decrypt(config.encryptKey, user.email, account.refresh_token),
						account: account };
		return details;
	}
	
	/**
	 * Gets linked accounts for given user
	 * @param user
	 * @param callback
	 */
	utils.getAccounts = function(user, callback) {
		user.getAccounts().then(function(accounts) {
			callback(null, accounts);
		}).catch(function(err) {
			callback(err, null);
		});
	}
	
	/**
	 * @param account
	 * @param accessToken
	 * @param callback (err)
	 */
	utils.updateAccessToken = function(account, user, accessToken, callback) {
		account.access_token = encrypt(config.encryptKey, user.email, accessToken);
		account.save().complete(function(err) {
			callback(err);
		});
	}

	/**
	 * Deletes given account from user
	 * @param user
	 * @param accountName
	 * @param callback (err);
	 */
	utils.deleteAccount = function(user, accountName, callback) {
		user.getAccounts({where: {account_name: accountName}}).then(function(accounts) {
			if (accounts.length > 0) {
				var acc = accounts[0];
				if (accountName == 'flowdock') {
					utils.revokeAndDeleteAccount(user, acc, "api.flowdock.com", commonUtils.flowdockRevokePath, callback);
				} else {
					acc.destroy().complete(function(err) {
						callback(err);
					});
				}
			} else {
				callback(new Error('Account not found'));
			}
		}).catch(function(err) {
			callback(err);
		});
	}
	
	/**
	 * Revokes and deletes given account (RFC 7009)
	 * @param user
	 * @param account
	 * @param host
	 * @param path
	 * @param callback (err)
	 */
	utils.revokeAndDeleteAccount = function(user, account, host, path, callback) {
		var accessToken = decrypt(config.encryptKey, user.email, account.access_token);
		var refreshToken = decrypt(config.encryptKey, user.email, account.refresh_token);
		var data = {"token": refreshToken, "token_type_hint": "refresh_token"};
		var headers = {Authorization: 'Bearer ' + accessToken};
		commonUtils.post(host, path, headers, data, function(err, status, response) {
			if (err) return callback(err);
			data = {"token": accessToken, "token_type_hint": "access_token"};
			commonUtils.post(host, path, headers, data, function(err, status, response) {
				if (err) return callback(err);
				account.destroy().then(function() {
					callback(null);
				}).catch(function(err) {
					callback(err);
				});
			});
		});
	}

	return utils;
}

function encrypt(key, salt, token) {
	if (token == null) return null;
	var cipher = crypto.createCipher(algorithm, key + salt);
	var encryptedPassword = cipher.update(token, 'utf8', 'base64');
	encryptedPassword += cipher.final('base64');
	return encryptedPassword;
}

function decrypt(key, salt, token) {
	if (token == null) return null;
	var decipher = crypto.createDecipher(algorithm, key + salt);
	var decryptedPassword = decipher.update(token, 'base64', 'utf8');
	decryptedPassword += decipher.final('utf8');
	return decryptedPassword;
}