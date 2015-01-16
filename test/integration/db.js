var assert = require('assert');
var async = require('async');
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
	it('completes all migrations successfully', function(done) {
		var oldForceMigrate = config.dbOptions.forceMigrate;
		config.dbOptions.forceMigrate = true;
		var db = new database(config.dbOptions);
		db.init(function(err) {
			config.dbOptions.forceMigrate = oldForceMigrate;
			done(err);
		});
	});
	describe('Projects', function() {
		var projects = [ {name: "test", 
						applications: [ {id: "flowdock", organization: "test", flow: "test2"},
										{id: "pivotal", projectId: "1"},
										{id: "googledocs", docs: [{name: "test", url: "http://test.invalid"}]}], 
						users: ["test@test.invalid"] } ];
		var projects2 = [ {name: "test", 
						applications: [ {id: "flowdock", organization: "test3", flow: "test4"},
										{id: "pivotal", projectId: "2"},
										{id: "googledocs", docs: [{name: "test2", url: "http://test2.invalid"}]}], 
						users: ["test2@test.invalid"] } ];
		var db;
		beforeEach(function(done){
			// Initialize database before each test
			db = new database(config.dbOptions);
			db.init(function(err) {
				done(err);
			});
		});
		it('can be created using configuration files', function(done) {
			db.utils.projects.createProjects(projects, false, function(err) {
				if (err) throw err;
				db.models.project.find({where: {project_name: "test"}}).then(function(project) {
					assert(project != null, "Could not create project");
					done();
				});
			});
		});
		it('applications are stored from configuration files', function(done) {
			db.utils.projects.createProjects(projects, false, function(err) {
				if (err) throw err;
				db.models.project.find({where: {project_name: "test"}}).then(function(project) {
					assert(project != null, "Could not create project");
					getInvalidRefs(db, project, function(invalidRefs) {
						assert(invalidRefs.length == 0, "Following refs were not set properly: " + invalidRefs);
						done();
					});
				});
			});
		});
		it('users can be created from project configurations', function(done) {
			db.utils.projects.createProjects(projects, false, function(err) {
				if (err) throw err;
				db.models.user.find({email: "test@test.invalid"}).then(function(users) {
					assert(projects.length > 0, "Could not create user");
					done();
				});
			});
		});
		it('configuration overwrite option replaces application data', function(done) {
			db.utils.projects.createProjects(projects, false, function(err) {
				db.models.project.find({where: {project_name: "test"}})
				.then(function(project) {
					assert(project != null, "Could not create project");
					db.utils.projects.createProjects(projects2, false, function(err) {
						db.models.project.find({where: {project_name: "test"}})
						.then(function(project) {
							db.utils.projects.getFlowdockApp(project, function(err, flowdockApp) {
								if (err) throw err;
								assert(flowdockApp.organization == "test3", "Flowdock information was not changed");
								assert(flowdockApp.flow == "test4", "Flowdock information was not changed");
								done();
							});
						});
					});
				});
			});
		});
		it('configuration overwrite option replaces google docs data', function(done) {
			db.utils.projects.createProjects(projects, false, function(err) {
				db.models.project.find({where: {project_name: "test"}})
				.then(function(project) {
					assert(project != null, "Could not create project");
					db.utils.projects.createProjects(projects2, false, function(err) {
						db.models.project.find({where: {project_name: "test"}})
						.then(function(project) {
							db.utils.projects.getGoogleDocs(project, function(err, docs) {
								if (err) throw err;
								assert(docs.length == 1, 'Document did not get replaced with another');
								assert(docs[0].doc_name == "test2", 'Document did not get replaced with another');
								done();
							});
						});
					});
				});
			});
		});
		it('configuration overwrite option replaces user data', function(done) {
			db.utils.projects.createProjects(projects, false, function(err) {
				db.models.project.find({where: {project_name: "test"}})
				.then(function(project) {
					assert(project != null, "Could not create project");
					db.utils.projects.createProjects(projects2, false, function(err) {
						db.models.project.find({where: {project_name: "test"}})
						.then(function(project) {
							project.getUsers().then(function(users) {
								assert(users.length == 1, "User amount doesn't stay the same");
								assert(users[0].email == "test2@test.invalid", "User did not get replaced");
								done();
							});
						});
					});
				});
			});
		});
	});
});

function getInvalidRefs(db, project, callback) {
	var invalidRefs = [];
	async.parallel([
		function(done) {
			db.utils.projects.getFlowdockApp(project, function(err, flowdockApp) {
				if (err || flowdockApp == null) invalidRefs.push("Flowdock");
				done(err);
			});
		},
		function(done) {
			db.utils.projects.getPivotalApp(project, function(err, projectId) {
				if (err || projectId == null) invalidRefs.push("Pivotal");
				done(err);
			});
		},
		function(done) {
			db.utils.projects.getGoogleDocs(project, function(err, docs) {
				if (err || docs == null || docs.length == 0) invalidRefs.push("GoogleDocs");
				done(err);
			});
		}
	], function() {
		callback(invalidRefs);
	});
}