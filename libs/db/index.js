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

	if (config) {
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

