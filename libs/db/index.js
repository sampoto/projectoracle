/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring database
 */


var sequelize = require('sequelize');
var util = require('util');
var async = require('async');
var utils = require('./utils.js');
var modelUtils = require('./modelUtils.js');
var Umzug = require('umzug');

/**
 * @param config database config
 * @param config.options Database connect options
 * @param config.encryptKey Key to encrypt OAuth tokens
 * @param config.force (optional) Create schema forcefully by deleting any previous data
 * @param config.schema (optional) Sets table name prefix - use only with force options 
 */
module.exports = function(config) {

	var db = {};
	db.utils = utils(db, config);
	var self = this;
	
	// Constants
	// Default userlevel value is defined as 0
	db.userlevels = {
		USER: 0,
		ADMIN: 1
	};

	db.init = function(callback) {
		callback = callback || function() {};

		if (config) {
			self.sequelize = new sequelize(config.options.database, config.options.username, 
			config.options.password, config.options);
		} else {
			return callback(new db.fatalError('No database config defined'));
		}

		// Define the database model
		db.models = {};
		db.models.user = self.sequelize.import(__dirname + '/models/user', defineCall(__dirname + '/models/user'));
		db.models.account = self.sequelize.import(__dirname + '/models/account', defineCall(__dirname + '/models/account'));
		db.models.project = self.sequelize.import(__dirname + '/models/project', defineCall(__dirname + '/models/project'));
		db.models.googledoc = self.sequelize.import(__dirname + '/models/googledoc', defineCall(__dirname + '/models/googledoc'));

		Object.keys(db.models).forEach(function(modelName) {
			if ("associate" in db.models[modelName]) {
				db.models[modelName].associate(db.models);
			}
		});

		var migrationOptions = {};
		if (config.force) migrationOptions.force = true;	
		if (config.forceMigrate) migrationOptions.forceMigrate = true;

		self.sequelize.authenticate()
			.complete(function(err) {
				if (!!err) {
					return callback(new Error('Unable to connect to the database: ' + err));
				} else {
					db.migrate(migrationOptions, function(err) {
						if (!err && config.projects) {
							var forceProjects = typeof config.forceProjects != "undefined" ? config.forceProjects : false;
							db.utils.projects.createProjects(config.projects, forceProjects, callback);
						} else {
							callback(err);
						}
					});
				}
		});
	};
	
	/**
	 * Creates newest database schema
	 * @param options (optional)
	 * @param options.force Force update to newest schema
	 * @param callback
	 */
	db.migrate = function(options, callback) {
		if (typeof callback == "undefined" && typeof options == "function") {
			callback = options;
		}
		callback = callback || function(){};

		var opt = {
			storage: 'sequelize',
			storageOptions: {
				sequelize: self.sequelize,
			},
			migrations: {
				path: 'migrations',
				params: [self.sequelize.getQueryInterface(), config.tablePrefix || null]
			}
		};
		if (config.tablePrefix) opt.storageOptions.modelName = config.tablePrefix + "_SequelizeMeta";
		var umzug = new Umzug(opt);
		
		// Check first if sequelize core migrator table is still in use
		db.oldSequelizeMeta(self.sequelize, function(err, old) {
			if (err) return callback(err);
			if (old) {
				db.migrateSequelizeMeta(self.sequelize, function(err) {
					if (err) return callback(err);
					doMigrations(callback);
				});
			} else {
				doMigrations(callback);
			}
		});
		
		function doMigrations(callback) {
			umzug.executed().then(function(executed) {
				if (!options.forceMigrate && (executed.length == 0 || (options && options.force))) {
					syncAndUpdateMigrations(function(err) {
						callback(err);
					});
				} else {
					umzug.up().then(function() {
						callback(null);
					}).catch(function(err) {
						callback(err);
					});
				}
			}).catch(function(err) {
				callback(err);
			});
		}
		
		function syncAndUpdateMigrations(callback) {
			sync(config, function(err) {
				if (err) return callback(err);
				umzug.pending().then(function(pendingMigrations) {
					if (pendingMigrations.length > 0) {
						async.each(pendingMigrations, function(migration, done) {
							umzug.storage.logMigration(migration.file).then(function() {
								done(null);
							}).catch(function(err) {
								done(err);
							});
						}, function(err) {
							callback(err);
						});
					} else {
						callback(null);
					}
				}).catch(function(err) {
					callback(err);
				});
			});
		}
	}
	
	/**
	 * Checks if old SequelizeMeta table scheme is in use
	 * @param sequelize
	 * @param callback
	 */
	db.oldSequelizeMeta = function(sequelize, callback) {
		var queryInterface = sequelize.getQueryInterface();
		queryInterface.describeTable(modelUtils.tableName("SequelizeMeta", config.tablePrefix))
		.then(function(description) {
			if (description.from && description.to && description.id) {
				callback(null, true);
			} else {
				callback(null, false);
			}
		}).catch(function(err) {
			// Assumes that the error happened because the table doesn't exist
			callback(null, false);
		});
	}
	
	/**
	 * Migrates from old SequelizeMeta table scheme to scheme used by umzug
	 * @param sequelize
	 * @param callback
	 */
	db.migrateSequelizeMeta = function(sequelize, callback) {
		var sequelizeMetaName = modelUtils.tableName("SequelizeMeta", config.tablePrefix);
		var queryInterface = sequelize.getQueryInterface();
		async.parallel([
			function(done) {
				queryInterface.renameColumn(sequelizeMetaName, 'to', 'name').then(done);
			},
			function(done) {
				queryInterface.removeColumn(sequelizeMetaName, 'from');
			},
			function(done) {
				queryInterface.removeColumn(sequelizeMetaName, 'id');
			}
		],
		function(err) {
			callback(err);
		});
	}

	// Custom error class to distinguish fatal errors
	db.fatalError = function(message) {
		Error.call(this);
		this.message = message;
	}
	util.inherits(db.fatalError, Error);
	
	function defineCall(path) {
		return function(Sequelize, DataTypes) {
			return (require(path)(Sequelize, DataTypes, config.tablePrefix));
		}
	}

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

