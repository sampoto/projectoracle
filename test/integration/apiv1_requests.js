var assert = require('assert');
var async = require('async');
var extend = require('util')._extend;
var config = require('../../config');
var Requests = require('../../api/v1/requests.js');
var testUtils = require('../../testUtils.js');
config.dbOptions.force = true;
config.dbOptions.projects = null;
if (config.testOptions)
	extend(config.dbOptions, config.testOptions);
var database = require('../../libs/db');

describe('APIv1', function() {
	var db, requests;
	beforeEach(function(done){
		db = new database(config.dbOptions);
		requests = new Requests(db);
		db.init(function(err) {
			done(err);
		});
	});
	afterEach(function(done) {
		db.close();
		done();
	});

	
	describe('#getProjectApplications', function() {
		beforeEach(function(done) {
			testUtils.projectTestSetup(db, true, function(err, user, project) {
				if (err) return done(err);
				db.utils.projects.setFlowdockApp(project, "test", "test2", function(err) {
					db.utils.projects.setPivotalApp(project, "1234", function(err) {
						if (err) return done(err);
						req = new testUtils.Request(requests.getProjectApplications);
						req.extendReq({user: user, isAuthenticated: function() { return true; }})
						.params({projectId: project.id});
						done();
					});
				});
			});
		});
		
		it('Should give list of project applications', function(done) {
			req.end(function(response, nextParams) {
				if (!Array.isArray(response)) return done(new Error("Result has to be an array"));
				if (response.length != 2) return done(new Error("Wrong number of items"));
				done();
			});
		});
	});
	
	describe('#setFlowdockApp', function() {
		var req;
		it('Admin can set flowdock application', function(done) {
			setup(true, function(err, project) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					project.reload().then(function() {
						db.utils.projects.getFlowdockApp(project, function(err, flowdockApp) {
							if (err) return done(err);
							if (req.responseStatus !== 200) return done(new Error('Wrong status code ' + req.responseStatus));
							if (!flowdockApp) return done(new Error("Flowdock app was not set"));
							done();
						});
					});
				});
			});
		});
		
		it('Non-admin cannot set flowdock application', function(done) {
			setup(false, function(err, project) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					db.utils.projects.getFlowdockApp(project, function(err, flowdockApp) {
						if (err) return done(err);
						if (req.responseStatus !== 403) return done(new Error('Wrong status code ' + req.responseStatus));
						if (flowdockApp) return done(new Error("Flowdock app was set"));
						done();
					});
				});
			});
		});

		function setup(admin, callback) {
			testUtils.projectTestSetup(db, admin, function(err, user, project) {
				if (err) return callback(err);
				req = new testUtils.Request(requests.setFlowdockApp);
				req.extendReq({user: user, isAuthenticated: function() { return true; }})
				.params({projectId: project.id})
				.body({organization: "test", flow: "test2"});
				callback(null, project);
			});
		}
	});

	describe('#deleteFlowdockApp', function() {
		var req;
		it('Admin can delete flowdock application', function(done) {
			setup(true, function(err, project) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					project.reload().then(function() {
						db.utils.projects.getFlowdockApp(project, function(err, flowdockApp) {
							if (err) return done(err);
							if (req.responseStatus !== 200) return done(new Error('Wrong status code ' + req.responseStatus));
							if (flowdockApp) return done(new Error("Flowdock app was not deleted"));
							done();
						});
					});
				});
			});
		});
		
		it('Non-admin cannot delete flowdock application', function(done) {
			setup(false, function(err, project) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					db.utils.projects.getFlowdockApp(project, function(err, flowdockApp) {
						if (err) return done(err);
						if (req.responseStatus !== 403) return done(new Error('Wrong status code ' + req.responseStatus));
						if (!flowdockApp) return done(new Error("Flowdock app was deletede"));
						done();
					});
				});
			});
		});

		function setup(admin, callback) {
			testUtils.projectTestSetup(db, admin, function(err, user, project) {
				if (err) return callback(err);
				db.utils.projects.setFlowdockApp(project, "test", "test2", function(err) {
					if (err) return callback(err);
					req = new testUtils.Request(requests.deleteFlowdockApp);
					req.extendReq({user: user, isAuthenticated: function() { return true; }})
					.params({projectId: project.id});
					callback(null, project);
				});
			});
		}
	});
	
	describe('#setPivotalApp', function() {
		var req;
		it('Admin can set pivotal application', function(done) {
			setup(true, function(err, project) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					project.reload().then(function() {
						db.utils.projects.getPivotalApp(project, function(err, pivotalApp) {
							if (err) return done(err);
							if (req.responseStatus !== 200) return done(new Error('Wrong status code ' + req.responseStatus));
							if (!pivotalApp) return done(new Error("Pivotal app was not set"));
							done();
						});
					});
				});
			});
		});
		
		it('Non-admin cannot set pivotal application', function(done) {
			setup(false, function(err, project) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					db.utils.projects.getPivotalApp(project, function(err, pivotalApp) {
						if (err) return done(err);
						if (req.responseStatus !== 403) return done(new Error('Wrong status code ' + req.responseStatus));
						if (pivotalApp) return done(new Error("Pivotal app was set"));
						done();
					});
				});
			});
		});

		function setup(admin, callback) {
			testUtils.projectTestSetup(db, admin, function(err, user, project) {
				if (err) return callback(err);
				req = new testUtils.Request(requests.setPivotalApp);
				req.extendReq({user: user, isAuthenticated: function() { return true; }})
				.params({projectId: project.id})
				.body({projectId: "12345"});
				callback(null, project);
			});
		}
	});
	
	describe('#deletePivotalApp', function() {
		var req;
		it('Admin can delete pivotal application', function(done) {
			setup(true, function(err, project) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					project.reload().then(function() {
						db.utils.projects.getPivotalApp(project, function(err, pivotalApp) {
							if (err) return done(err);
							if (req.responseStatus !== 200) return done(new Error('Wrong status code ' + req.responseStatus));
							if (pivotalApp) return done(new Error("Pivotal app was not deleted"));
							done();
						});
					});
				});
			});
		});
		
		it('Non-admin cannot delete pivotal application', function(done) {
			setup(false, function(err, project) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					db.utils.projects.getPivotalApp(project, function(err, pivotalApp) {
						if (err) return done(err);
						if (req.responseStatus !== 403) return done(new Error('Wrong status code ' + req.responseStatus));
						if (!pivotalApp) return done(new Error("Pivotal app was deleted"));
						done();
					});
				});
			});
		});

		function setup(admin, callback) {
			testUtils.projectTestSetup(db, admin, function(err, user, project) {
				if (err) return callback(err);
				db.utils.projects.setPivotalApp(project, 1234, function(err) {
					req = new testUtils.Request(requests.deletePivotalApp);
					req.extendReq({user: user, isAuthenticated: function() { return true; }})
					.params({projectId: project.id});
					callback(null, project);
				});
			});
		}
	});

	describe('#getGoogleDocs', function() {
		var req;
		beforeEach(function(done) {
			testUtils.projectTestSetup(db, true, function(err, user, project) {
				if (err) return done(err);
				db.utils.projects.createGoogleDoc(project, "test", "http://test.invalid", function(error, doc) {
					if (err) return done(err);
					req = new testUtils.Request(requests.getGoogleDocs);
					req.extendReq({user: user, isAuthenticated: function() { return true; }})
					.params({projectId: project.id});
					done();
				});
			});
		});
		
		it('Should give list of google documents', function(done) {
			req.end(function(response, nextParams) {
				if (!Array.isArray(response)) return done(new Error("Result has to be an array"));
				if (response.length !== 1) return done(new Error("Wrong number of items"));
				done();
			});
		});
	});

	describe('#addGoogleDoc', function() {
		var req;
		it('Admin should be able to add google document', function(done) {
			setup(true, function(err) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					if (req.responseStatus !== 200) return done(new Error('Wrong status code ' + req.responseStatus));
					db.models.googledoc.findAll().complete(function(err, docs) {
						if (err) return done(err);
						if (docs.length === 0) return done(new Error('Document did not get added'));
						done();
					});
				});
			});
		});
		
		it('Non-admin should not be able to add google document', function(done) {
			setup(false, function(err) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					if (req.responseStatus !== 403) return done(new Error('Wrong status code ' + req.responseStatus));
					db.models.googledoc.findAll().complete(function(err, docs) {
						if (err) return done(err);
						if (docs.length !== 0) return done(new Error('Document got added'));
						done();
					});
				});
			});
		});
		
		function setup(admin, callback) {
			testUtils.projectTestSetup(db, admin, function(err, user, project) {
				if (err) return callback(err);
				req = new testUtils.Request(requests.addGoogleDoc);
				req.extendReq({user: user, isAuthenticated: function() { return true; }})
				.body({name: "test", url: "http://test.invalid"})
				.params({projectId: project.id});
				callback();
			});
		}
	});
	
	describe('#deleteGoogleDoc', function() {
		var req;
		it('Admin should be able to delete google document', function(done) {
			setup(true, function(err) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					if (req.responseStatus !== 200) return done(new Error('Wrong status code ' + req.responseStatus));
					db.models.googledoc.findAll().complete(function(err, docs) {
						if (err) return done(err);
						if (docs.length > 0) return done(new Error('Document did not get deleted'));
						done();
					});
				});
			});
		});
		
		it('Non-admin user should not be able to delete documents', function(done) {
			setup(false, function(err) {
				if (err) return done(err);
				req.end(function(response, nextParams) {
					if (req.responseStatus !== 403) return done(new Error('Wrong status code ' + req.responseStatus));
					db.models.googledoc.findAll().complete(function(err, docs) {
						if (err) return done(err);
						if (docs.length == 0) return done(new Error('Document got deleted'));
						done();
					});
				});
			});
		});
		
		function setup(admin, callback) {
			testUtils.projectTestSetup(db, admin, function(err, user, project) {
				if (err) return callback(err);
				db.utils.projects.createGoogleDoc(project, "test", "http://test.invalid", function(error, doc) {
					req = new testUtils.Request(requests.deleteGoogleDoc);
					req.extendReq({user: user, isAuthenticated: function() { return true; }})
					.params({projectId: project.id, docId: doc.id});
					callback(err);
				});
			});
		}
	});
});
