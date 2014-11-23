var assert = require('assert');
var config = require('../../config');
var database = require('../../libs/db');

describe('Database', function() {
	it('initializes', function(done) {
		var db = new database(config.dbOptions);
		db.init(function(err) {
			done(err);
		});
	});
});