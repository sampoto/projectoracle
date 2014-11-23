/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring database
 */


var sequelize = require('sequelize');
var utils = require('./utils.js');

/**
 * @param config database config
 */
module.exports = function(config) {

	var db = {};
	var self = this;

	db.init = function(callback) {
		callback = callback || function() {};

		if (config) {
			self.sequelize = new sequelize(config.dbname, config.username, 
			config.password, config.options);
		} else {
			return callback(new Error('No database config defined'));
		}

		self.sequelize.authenticate()
		.complete(function(err) {
			if (!!err) {
				return callback(new Error('Unable to connect to the database: ' + err));
			} else {
				setup(config, callback);
			}
		});
	}
	
	function setup(config, callback) {
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
		
		db.utils = utils(db, config);

		sync(callback);
	}
	
	function sync(callback) {
		self.sequelize.sync({force: true })
		.complete(function(err) {
			if(!!err) {
				return callback(new Error('Cannot synchronise the database schema: ' + err));
			} else {
				return callback(null);
			}
		});
	}
	
    return db;
}

