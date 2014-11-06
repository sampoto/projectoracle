/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring database
 */


var sequelize = require('sequelize');
var db = {};


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
	
	// Define the database model
    db.user = this.sequelize.import(__dirname + '/models/user');
    db.account = this.sequelize.import(__dirname + '/models/account');
	db.project = this.sequelize.import(__dirname + '/models/project');
	db.googledoc = this.sequelize.import(__dirname + '/models/googledoc');
	
	Object.keys(db).forEach(function(modelName) {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });
	
	this.sequelize.sync({force: true })
	    .complete(function(err) {
	        if(!!err) {
	            throw new Error('Cannot synchronise the database schema: ' + err);
            }
        });
     
    return db;
}

