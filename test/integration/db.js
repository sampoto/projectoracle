var assert = require('assert');
var extend = require('util')._extend;
var config = require('../../config');
config.dbOptions.force = true;
if (config.testOptions)
	extend(config.dbOptions, config.testOptions);
var database = require('../../libs/db');

describe('Database', function() {
	it('initializes', function(done) {
		var db = new database(config.dbOptions);
		db.init(function(err) {
			done(err);
		});
	});
});