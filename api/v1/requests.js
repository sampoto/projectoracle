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
		function(err, project, client, projectId) {
			if (err) return next(err);
			client.project(projectId).get(function(error, PivotalProject) {
				if (error) return next(error);
				res.send(PivotalProject);
			});
		});
	}

	requests.getPivotalStories = function(req, res, next) {
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, client, projectId) {
			if (err) return next(err);
			client.project(projectId).stories.all(function(error, stories) {
				if (error) return next(error);
				if (typeof req.query.with_state == "undefined") {
					res.send(stories);
				} else {
					var state = req.query.with_state; //State: unscheduled etc..
					var items = [];
					for ( i=0; i < stories.length; ++i ) {
						if (stories[i]['currentState'] == state) {
							items.push(stories[i]);
						}
					}
					res.send(items);
				}
			});
		});

	}

	requests.getPivotalStory = function(req, res, next) {
		var storyId = req.params.storyId;
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, client, projectId) {
			if (err) return next(err);
			client.project(projectId).story(storyId).get(function(error, story) {
				if (error) return next(error);
				res.send(story);
			});
		})
	}

	requests.getPivotalIterations = function(req, res, next) {
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, client, projectId) {
			if (err) return next(err);
			client.project(projectId).iterations.all(function(error, iterations) {
				if (error) return next(error);
				if (typeof req.query.scope == "undefined"){
					res.send(iterations);
				} else {
					var scope = req.query.scope; //Scope: current, backlog..
					var items = [];   
					for ( i=0; i < iterations.length; ++i) {
						if (iterations[i]['scope'] == scope) {
							items.push(iterations[i]);
						}	
					}
					res.send(items);
				}
			});
		});
	}

	requests.getPivotalMemberships = function(req, res, next) {
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, client, projectId) {
			if (err) return next(err);
			client.project(projectId).memberships.all(function(error, memberships) {
				if (error) return next(error);
				res.send(memberships);
			});
		});
	}

	return requests;
}