/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring database
 */


var sequelize = require('sequelize');
var util = require('util');
var utils = require('./utils.js');

/**
 * @param config database config
 */
module.exports = function(config) {

	var db = {};
	db.utils = utils(db, config);
	var self = this;
	
	db.init = function(callback) {
		callback = callback || function() {};

		if (config) {
			self.sequelize = new sequelize(config.dbname, config.username, 
			config.password, config.options);
		} else {
			return callback(new db.fatalError('No database config defined'));
		}

		// Define the database model
		db.models = {};
		db.models.user = self.sequelize.import(__dirname + '/models/user');
		db.models.account = self.sequelize.import(__dirname + '/models/account');
		db.models.project = self.sequelize.import(__dirname + '/models/project');
		db.models.googledoc = self.sequelize.import(__dirname + '/models/googledoc');

		Object.keys(db.models).forEach(function(modelName) {
			if ("associate" in db.models[modelName]) {
				db.models[modelName].associate(db.models);
			}
		});

		self.sequelize.authenticate()
		.complete(function(err) {
			if (!!err) {
				return callback(new Error('Unable to connect to the database: ' + err));
			} else {
				sync(config, callback);
			}
		});
	}

	// Custom error class to distinguish fatal errors
	db.fatalError = function(message) {
		Error.call(this);
		this.message = message;
	}
	util.inherits(db.fatalError, Error);

	function sync(config, callback) {
		if (config.options && config.options.dialect == 'mysql') {
			// Ugly fix to bypass foreign key constraints check with table deletes
			syncWithForeignKeyStatements(callback, 'SET FOREIGN_KEY_CHECKS = 0', 'SET FOREIGN_KEY_CHECKS = 1');
		} else {
			self.sequelize.sync({force: true })
			.complete(function(err) {
				return callback(err);
			});
		}
	}

	function syncWithForeignKeyStatements(callback, disableStatement, enableStatement) {
		self.sequelize.query(disableStatement).complete(function(err) {
			if (err) return callback(err);
			self.sequelize.sync({force: true })
			.complete(function(err) {
				if(err) return callback(err);
				self.sequelize.query(enableStatement).complete(function(err) {
					return callback(err);
				});
			});
		});
	}

    return db;
}

