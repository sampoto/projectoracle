/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Request implementations for API v1
 */
var utils = require('../../utils.js');

module.exports = function(db, config) {

	var requests = {};

	var INPUT_MAX_LENGTH = 200;
	
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
	
	requests.createProject = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.createProject(req.body.name, function(err, project) {
				if (err) return next(err);
				res.send({projectId: project.id});
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}
	
	requests.deleteProject = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getProjectById(req.params.projectId, function(err, project) {
				if (err) return next(err);
				if (project != null) {
					db.utils.projects.deleteProject(project, function(err) {
						if (err) return next(err);
						res.send("Project deleted");
					});
				} else {
					res.status(404).send("Project doesn't exist");
				}
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}

	requests.addUserToProject = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getProjectById(req.params.projectId, function(err, project) {
				if (err) return next(err);
				if (project == null) return res.status(404).send("Project doesn't exist");
				db.utils.getUser(req.body.email, function(err, user) {
					if (err) return next(err);
					if (user == null) return res.status(404).send("User doesn't exist");
					db.utils.projects.addUserToProject(user, project, function(err) {
						if (err) return next(err);
						res.send("User added to project");
					});
				});
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}

	requests.removeUserFromProject = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getProjectById(req.params.projectId, function(err, project) {
				if (err) return next(err);
				if (project == null) return res.status(404).send("Project doesn't exist");
				db.utils.getUser(req.params.email, function(err, user) {
					if (err) return next(err);
					if (user == null) return res.status(404).send("User doesn't exist");
					db.utils.projects.removeUserFromProject(user, project, function(err) {
						if (err) return next(err);
						res.send("User removed from project");
					});
				});
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}

	requests.getProjectApplications = function(req, res, next) {
		db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
			if (!err) {
				if (project != null) {
					db.utils.projects.getProjectApps(project, function(err, apps) {
						if (!err) {
							res.send(apps);
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
				utils.OAuthRequest(db, {clientId: config.auth.flowdockAuth.clientID, clientSecret: config.auth.flowdockAuth.clientSecret}, 
				req.user, flowdockResource.account, utils.flowdockHost, path, {}, function(err, statuscode, data) {
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
				var path = '/flows/' + flowdockResource.organization + '/' + flowdockResource.flow + '/messages';
				utils.OAuthRequest(db, {clientId: config.auth.flowdockAuth.clientID, clientSecret: config.auth.flowdockAuth.clientSecret}, 
				req.user, flowdockResource.account, utils.flowdockHost, path, {}, function(err, statuscode, data) {
					if (err) return next(err);
					res.send(data);
				});
			});
		});
	}

	requests.getFlowdockUser = function(req, res, next) {
		db.utils.getAccountInfo(req.user, db.utils.projects.appIds.FLOWDOCK, function (err, account) {
			var path = '/user';
			utils.OAuthRequest(db, {clientId: config.auth.flowdockAuth.clientID, clientSecret: config.auth.flowdockAuth.clientSecret}, 
			req.user, account, utils.flowdockHost, path, {}, function(err, statuscode, data) {
				if (err) return next(err);
				res.send(data);
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
				utils.OAuthRequest(db, {clientId: config.auth.flowdockAuth.clientID, clientSecret: config.auth.flowdockAuth.clientSecret}, 
				req.user, flowdockResource.account, utils.flowdockHost, path, {}, function(err, statuscode, data) {
					if (err) return next(err);
					res.send(data);
				});
			});
		});
	}
	
	requests.setFlowdockApp = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
				if (err) return next(err);
				var organization = req.body.organization;
				var flow = req.body.flow;
				if (typeof organization === "string" && typeof flow === "string" 
				&& organization.length < INPUT_MAX_LENGTH && flow.length < INPUT_MAX_LENGTH) {
					db.utils.projects.setFlowdockApp(project, organization, flow, function(err) {
						if (err) return next(err);
						res.send("Flowdock application set");
					});
				} else {
					res.status(400).send("Invalid organization or flow");
				}
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}
	
	requests.deleteFlowdockApp = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
				if (err) return next(err);
				db.utils.projects.setFlowdockApp(project, null, null, function(err) {
					if (err) return next(err);
					res.send("Flowdock application deleted");
				});
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}

	requests.getPivotalProject = function(req, res, next) {
		db.utils.projects.getPivotalResources(req.user, req.params.projectId,
		function(err, project, token, projectId) {
			if (err) return next(err);
			var path = utils.pivotalServicePath + "/projects/" + projectId;
			utils.fetchJSON(utils.pivotalHost, path, {"X-TrackerToken": token}, function(err, status, pivotalProject) {
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
			utils.fetchJSON(utils.pivotalHost, path + query, {"X-TrackerToken": token}, function(err, status, stories) {
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
			utils.fetchJSON(utils.pivotalHost, path, {"X-TrackerToken": token}, function(err, status, story) {
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
			utils.fetchJSON(utils.pivotalHost, path + query, {"X-TrackerToken": token}, function(err, status, iterations) {
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
			utils.fetchJSON(utils.pivotalHost, path, {"X-TrackerToken": token}, function(err, status, memberships) {
				if (err) return next(err);
				res.send(memberships);
			});
		});
	}
	
	requests.setPivotalApp = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
				if (err) return next(err);
				if (typeof req.body.projectId === "string" && /^[0-9]+$/.test(req.body.projectId)) {
					var pivotalProjectId = parseInt(req.body.projectId);
					db.utils.projects.setPivotalApp(project, pivotalProjectId, function(err) {
						if (err) return next(err);
						res.send("Pivotal application set");
					});
				} else {
					res.status(400).send("Invalid project ID");
				}
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}
	
	requests.deletePivotalApp = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
				if (err) return next(err);
				db.utils.projects.setPivotalApp(project, null, function(err) {
					if (err) return next(err);
					res.send("Pivotal application deleted");
				});
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}
	
	requests.addAdmin = function(req, res, next) {
		if (db.utils.isAdmin(req.user) && typeof req.body.email === "string") {
			db.utils.getUser(req.body.email, function(err, user) {
				if (err) return next(err);
				if (user != null) {
					db.utils.setUserLevel(user, db.userlevels.ADMIN, function(err) {
						if (err) return next(err);
						res.status(200).send("Admin rights added");
					});
				} else {
					res.status(404).send("User not found");
				}
			});
		} else if (typeof req.body.email !== "string") {
			res.status(400).send("User email not defined");
		} else {
			res.status(403).send("No admin rights");
		}
	}

	requests.deleteAdmin = function(req, res, next) {
		if (db.utils.isAdmin(req.user) && typeof req.params.email === "string") {
			db.utils.getUser(req.params.email, function(err, user) {
				if (err) return next(err);
				if (user != null) {
					db.utils.setUserLevel(user, db.userlevels.USER, function(err) {
						if (err) return next(err);
						res.status(200).send("Admin rights revoked");
					});
				} else {
					res.status(404).send("User not found");
				}
			});
		} else if (typeof req.params.email !== "string") {
			res.status(400).send("User email not defined");
		} else {
			res.status(403).send("No admin rights");
		}
		
	}
	
	requests.getGoogleDocs = function(req, res, next) {
		db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
			if (err) return next(err);
			db.utils.projects.getGoogleDocs(project, function(err, docs) {
				if (err) return next(err);
				var docList = docs.map(function(doc) { 
					return {"id": doc.id, "name": doc.doc_name, "url": doc.doc_url} 
				});
				res.send(docList);
			});
		});
	}

	requests.addGoogleDoc = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
				if (err) return next(err);
				var name = req.body.name;
				var url = req.body.url;
				if (typeof name === "string" && typeof url === "string") {
					db.utils.projects.createGoogleDoc(project, name, url, function(err, doc) {
						if (err) return next(err);
						res.send("Document added");
					});
				} else {
					res.status(400).send("Invalid name or URL");
				}
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}
	
	requests.deleteGoogleDoc = function(req, res, next) {
		if (db.utils.isAdmin(req.user)) {
			db.utils.projects.getUserProjectById(req.user, req.params.projectId, function(err, project) {
				if (err) return next(err);
				var id = parseInt(req.params.docId);
				if (typeof id !== "undefined" && !isNaN(id)) {
					db.utils.projects.getGoogleDocs(project, {id: id}, function(err, docs) {
						if (err) return next(err);
						if (docs.length == 1) {
							db.utils.projects.deleteGoogleDoc(docs[0], function(err) {
								if (err) return next(err);
								res.send("Document deleted");
							});
						} else {
							res.status(404).send("Document doesn't exist");
						}
					});
				} else {
					res.status(400).send("Invalid ID");
				}
			});
		} else {
			res.status(403).send("No admin rights");
		}
	}

	return requests;
}