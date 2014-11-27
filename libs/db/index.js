/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring database
 */


var sequelize = require('sequelize');
var util = require('util');
var async = require('async');
var utils = require('./utils.js');

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
		db.models.user = self.sequelize.import(__dirname + '/models/user');
		db.models.account = self.sequelize.import(__dirname + '/models/account');
		db.models.project = self.sequelize.import(__dirname + '/models/project');
		db.models.googledoc = self.sequelize.import(__dirname + '/models/googledoc');

		Object.keys(db.models).forEach(function(modelName) {
			if ("associate" in db.models[modelName]) {
				db.models[modelName].associate(db.models);
			}
			if (config.schema) {
				db.models[modelName].schema(config.schema, '_');
			}
		});

		var migrationOptions = {};
		if (config.force) migrationOptions.force = true;	

		self.sequelize.authenticate()
			.complete(function(err) {
				if (!!err) {
					return callback(new Error('Unable to connect to the database: ' + err));
				} else {
					db.migrate(migrationOptions, callback);
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

		var migrator = self.sequelize.getMigrator();
		migrator.options.path = __dirname + "/../../migrations";

		migrator.findOrCreateSequelizeMetaDAO().then(function(SequelizeMeta) {
			SequelizeMeta.findAll().then(function(meta) {
				if (meta.length == 0 || (options && options.force)) {
					syncAndUpdateMigrations(migrator, SequelizeMeta, config, callback);
				} else {
					// One or more migrations have been done. Complete pending migrations
					migrator.migrate({ method: 'up' })
					.complete(function(err) {
						callback(err);
					});
				}
			}).catch(function(err) {
				callback(err);
			});
		}).catch(function(err) {
			callback(err);
		});

		// Synchronizes and updates migration status
		function syncAndUpdateMigrations(migrator, SequelizeMeta, config, callback) {
			async.series([
				function(cb) {			
					if (config.schema) {
						// Do not replace the regular schema table
						SequelizeMeta.schema(config.schema, "_");

						self.sequelize.createSchema(config.schema).then(function() {
							sync(config, function(err) {
								cb(err);
							});
						}).catch(function(err) {
							cb(err);
						});
					} else {
						sync(config, function(err) {
							cb(err);
						});
					}
				},
				function(cb) {
					if (config.schema) {
						// No migrations have been done. Mark all migrations as done and then sync
						migrator.getUndoneMigrations(function(err, migrations) {
							markMigrationsDone(migrator, migrations, cb);
						});
					} else  {
						// Do not mark migrations done when schemas are in use
						// Sequelize migrations do not currently support schema option
						cb(null);
					}
				}
			], callback);
		}
		
		// Marks all given migrations done
		function markMigrationsDone(migrator, migrations, callback) {
			async.each(migrations, function(migration, cb) {
				migrator.saveSuccessfulMigration(migration, migration, function(err) {
					cb(null);
				});
			}, callback);
		}
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

