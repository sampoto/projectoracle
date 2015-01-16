/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Request implementations for API v1
 */
var utils = require('../../utils.js');

module.exports = function(db) {

	var requests = {};
	
	requests.getAccounts = function(req, res, next) {
		db.utils.getAccounts(req.user, function(err, accounts) {
			if (!err) {
				var accountNames = accounts.map(function(account) {
					return account.account_name;
				});
				res.send(accountNames);
			} else {
				next(err);
			}
		});
	}

	requests.deleteAccount = function(req, res, next){
		db.utils.deleteAccount(req.user, req.params.appId, function(err) {
			if (!err) {
				res.send('Account deleted');
			} else {
				next(err);
			}
		});
	}
	
	requests.getProjects = function(req, res, next) {
		db.utils.projects.getUserProjects(req.user, function(err, projects) {
			if (!err) {
				var projectList = projects.map(function(project) {
					return {id: project.id, name: project.project_name};
				});
				res.send(projectList);
			} else {
				next(err);
			}
		});
	}
	
	requests.getProjectApplications = function(req, res, next) {
		db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
			if (!err) {
				if (project != null) {
					db.utils.projects.getProjectApps(project, function(err, apps) {
						if (!err) {
							var appList = apps.map(function(app) {
								return {id: app};
							});
							res.send(appList);
						} else {
							next(err);
						}
					});
				} else {
					res.status(404).send("Project doesn't exist");
				}
			} else {
				next(err);
			}
		});
	}

	requests.getFlow = function(req, res, next) {
		db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
			if (err) return next(err);
			db.utils.projects.getFlowdockAppInfo(req.user, project, function(err, flowdockResource) {
				if (err) return next(err);
				var token = flowdockResource.account.access_token;
				var path = '/flows/' + flowdockResource.organization + '/' + flowdockResource.flow;
				utils.fetchJSON('api.flowdock.com', path, {Authorization: 'Bearer ' + token}, function(err, data) {
					if (err) return next(err);
					res.send(data);
				});
			});
		});
	}
	
	requests.getFlowMessages = function(req, res, next) {
		db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
			if (err) return next(err);
			db.utils.projects.getFlowdockAppInfo(req.user, project, function(err, flowdockResource) {
				if (err) return next(err);
				var token = flowdockResource.account.access_token;
				var path = '/flows/' + flowdockResource.organization + '/' + flowdockResource.flow + '/messages';
				utils.fetchJSON('api.flowdock.com', path, {Authorization: 'Bearer ' + token}, function(err, data) {
					if (err) return next(err);
					res.send(data);
				});
			});
		});
	}

	requests.getFlowUsers = function(req, res, next) {
		db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
			if (err) return next(err);
			db.utils.projects.getFlowdockAppInfo(req.user, project, function(err, flowdockResource) {
				if (err) return next(err);
				var token = flowdockResource.account.access_token;
				var path = '/flows/' + flowdockResource.organization + '/' + flowdockResource.flow + '/users';
				utils.fetchJSON('api.flowdock.com', path, {Authorization: 'Bearer ' + token}, function(err, data) {
					if (err) return next(err);
					res.send(data);
				});
			});
		});
	}

	requests.getPivotalProject = function(req, res, next) {
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, token, projectId) {
			if (err) return next(err);
			var path = utils.pivotalServicePath + "/projects/" + projectId;
			utils.fetchJSON(utils.pivotalHost, path, {"X-TrackerToken": token}, function(err, pivotalProject) {
				if (err) return next(err);
				res.send(pivotalProject);
			});
		});
	}

	requests.getPivotalStories = function(req, res, next) {
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, token, projectId) {
			if (err) return next(err);
			var path = utils.pivotalServicePath + "/projects/" + projectId + "/stories";
			var query = typeof req.query.with_state !== "undefined" ? "?with_state=" + req.query.with_state : "";
			utils.fetchJSON(utils.pivotalHost, path + query, {"X-TrackerToken": token}, function(err, stories) {
				if (err) return next(err);
				res.send(stories);
			});
		});

	}

	requests.getPivotalStory = function(req, res, next) {
		var storyId = req.params.storyId;
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, token, projectId) {
			if (err) return next(err);
			var path = utils.pivotalServicePath + "/projects/" + projectId + "/stories/" + storyId;
			utils.fetchJSON(utils.pivotalHost, path, {"X-TrackerToken": token}, function(err, story) {
				if (err) return next(err);
				res.send(story);
			});
		})
	}

	requests.getPivotalIterations = function(req, res, next) {
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, token, projectId) {
			if (err) return next(err);
			var path = utils.pivotalServicePath + "/projects/" + projectId + "/iterations";
			var query = typeof req.query.scope !== "undefined" ? "/?scope=" + req.query.scope : "";
			utils.fetchJSON(utils.pivotalHost, path + query, {"X-TrackerToken": token}, function(err, iterations) {
				if (err) return next(err);
				res.send(iterations);
			});
		});
	}

	requests.getPivotalMemberships = function(req, res, next) {
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, token, projectId) {
			if (err) return next(err);
			//TODO memberships
			var path = utils.pivotalServicePath + "/projects/" + projectId + "/memberships";
			utils.fetchJSON(utils.pivotalHost, path, {"X-TrackerToken": token}, function(err, memberships) {
				if (err) return next(err);
				res.send(memberships);
			});
		});
	}
	
	requests.getGoogleDocs = function(req, res, next) {
		db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
			if (err) return next(err);
			db.utils.projects.getGoogleDocs(project, function(err, docs) {
				if (err) return next(err);
				var docList = docs.map(function(doc) { return {"name": doc.doc_name, "url": doc.doc_url} } );
				res.send(docList);
			});
		});
	}

	return requests;
}