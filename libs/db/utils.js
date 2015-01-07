/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for database utils
 */
 
var crypto = require('crypto');
var projects = require('./utils.projects.js');
var algorithm = 'aes-256-cbc';

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
		db.models.user.find({email: email}).then(function(user) {
			callback(null, user);
		})
		.catch(function(err) {
			callback(err, null);
		});
	}
	
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

		db.models.account.create({account_name: accountInfo.account_name,
		access_token: encrypt(config.encryptKey, user.email, accountInfo.access_token),
        refresh_token: encrypt(config.encryptKey, user.email, accountInfo.refresh_token)})
		.then(function(account) {
			user.addAccount(account).then(function() {
				if (callback)
					callback(null);
			})
			.catch(function(err) {
				if (callback)
					callback(err);
			});
		})
		.catch(function(err) {
			if (callback)
				callback(err);
		});
	}
	
	/**
	 * Gets certain kind of account information from given user
	 * @param user
	 * @param accountName
	 * @param callback (error, account)
	 */
	utils.getAccount = function(user, accountName, callback) {
		user.getAccounts({where: {account_name: accountName}}).then(function(accounts) {
			if (accounts.length > 0) {
				var acc = accounts[0];
				var account = { account_name: acc.account_name,
								access_token: decrypt(config.encryptKey, user.email, acc.access_token),
								refresh_token: decrypt(config.encryptKey, user.email, acc.refresh_token) };
				callback(null, account);
			} else {
				callback(new Error('Account not found'));
			}
		})
		.catch(function(err) {
			callback(err, null);
		});
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
	 * Deletes given account from user
	 */
	utils.deleteAccount = function(user, accountName, callback) {
		user.getAccounts({where: {account_name: accountName}}).then(function(accounts) {
			if (accounts.length > 0) {
				var acc = accounts[0];
				acc.destroy().then(function() {
					callback();
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback(new Error('Account not found'));
			}
		}).catch(function(err) {
			callback(err);
		});
	}
	
	return utils;
}

function encrypt(key, salt, token) {
	var cipher = crypto.createCipher(algorithm, key + salt);
	var encryptedPassword = cipher.update(token, 'utf8', 'base64');
	encryptedPassword += cipher.final('base64');
	return encryptedPassword;
}

function decrypt(key, salt, token) {
	var decipher = crypto.createDecipher(algorithm, key + salt);
	var decryptedPassword = decipher.update(token, 'base64', 'utf8');
	decryptedPassword += decipher.final('utf8');
	return decryptedPassword;
}