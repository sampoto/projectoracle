/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring database
 */

var sequelize = require('sequelize');


/**
 * @param config database config
 */
module.exports = function(config) {

	if (process.env.NODE_ENV == 'heroku' && process.env.DATABASE_URL) {
		// Heroku specific configuration - use PostgreSQL
		var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
		this.sequelize = new sequelize(match[5], match[1], match[2], {
			dialect:  'postgres',
			protocol: 'postgres',
			port:     match[4],
			host:     match[3],
			logging:  false
		});
	} else if (config) {
		this.sequelize = new sequelize(config.dbname, config.username, 
		config.password, config.options);
	} else {
	    throw new Error('No database config defined');
	}

	this.sequelize.authenticate()
	.complete(function(err) {
		if (!!err) {
			throw new Error('Unable to connect to the database: ' + err);
	    }
	});
}

