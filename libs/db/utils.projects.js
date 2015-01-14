/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for database project utils
 */

 var async = require('async');
 
module.exports = function(db) {

	var projects = {};

	/**
	 * Creates a new project
	 * @param name
	 * @param callback (err, project)
	 */
	projects.createProject = function(name, callback) {
		db.models.project.create({project_name: name}).then(function(project) {
			if (callback)
				callback(null, project);
		})
		.catch(function(err) {
			if (callback)
				callback(err, null);
		});
	};
	
	/**
	 * Creates project with given applications
	 * The project is created only if it doesn't already exist
	 * @param data
	 * @param data.name
	 * @param data.id (optional)
	 * @param data.applications
	 * @param data.users
	 * @param callback
	 */
	projects.createProjectWithData = function(data, callback) {
		var searchCondition = data.id ? Sequelize.or({project_name: data.name}, {id: data.id}) : {project_name: data.name};
		var values = data.id ? {id: data.id} : {};
		if (data.name) values.project_name = data.name;
		db.models.project.findOrCreate({where: searchCondition, defaultValues: values}).then(function(projectResults) {
			async.parallel([
			function(cb) {
				async.each(data.applications, function(app, innerCb) {
					projects.setApp(projectResults[0], app, innerCb);
				}, cb);
			},
			function(cb) {
				if (Array.isArray(data.users)) {
					createProjectUsers(projectResults[0], data.users, cb);
				} else {
					cb(null, null);
				}
			}],
			function(err, results) {
				callback(err, projectResults[0]);
			});
		});
	}

	/**
	 * Creates projects with given data
	 * @param projectArr
	 * @param clearNonExisting If true, deletes existing projects before trying to create projects again
	 * @param callback (err)
	 */
	projects.createProjects = function(projectArr, clearNonExisting, callback) {
		async.series([
			function(cb) {
				if (clearNonExisting) {
					var projectIds = projectArr.map(function(project) { return project.id });
					var projectNames = projectArr.map(function(project) { return project.name });
					db.models.project.destroy({where: { project_name: { not: projectNames }, id: { not: projectIds }}}).complete(function(err) {
						cb(err);
					});
				} else {
					cb(null);
				}
			}, 
			function(cb) {
				async.each(projectArr, function(project, innerCb) {
					projects.createProjectWithData(project, innerCb);
				}, cb);
			}
		], function(err, results) {
			callback(err);
		});
	}

	/**
	 * Deletes given project
	 * @param project
	 * @param callback (err)
	 */
	projects.deleteProject = function(project, callback) {
		project.destroy().then(function() {
			if (callback)
				callback(null);
		})
		.catch(function(err) {
			if (callback)
				callback(err);
		});
	};
	
	/**
	 * Gets all projects of given user
	 * @param user
	 * @param callback (err, projects)
	 */
	projects.getUserProjects = function(user, callback) {
		user.getProjects().then(function(projects) {
			callback(null, projects);
		}).catch(function(err) {
			callback(err, null);
		});
	}

	/**
	 * Gets project by id for given user
	 * @param user
	 * @param id
	 * @param callback (err, project)
	 */
	projects.getUserProjectById = function(user, id, callback) {
		user.getProjects({ id: id }).then(function(projects) {
			if (projects.length > 0) {
				callback(null, projects[0]);
			} else {
				var error = new Error('Project does not exist');
				error.code = 'nonexistentproject';
				callback(error, null);
			}
		}).catch(function(err) {
			callback(err, null);
		});
	}

	/**
	 * Gets all applications for given project
	 * Returns applications as strings
	 * @param project
	 * @param callback (err, apps)
	 */
	projects.getProjectApps = function(project, callback) {
	
		var fetchList = [
		function(cb) {
				projects.getFlowdockApp(project, function(err, values) {
					cb(err, (values != null) ? "flowdock" : null);
				});
			},
			function(cb) {
				projects.getPivotalApp(project, function(err, projectId) {
					cb(err, (projectId != null) ? "pivotal" : null);
				});
			},
			function(cb) {
				projects.getGoogleDocs(project, false, function(err, docs) {
					cb(err, (docs.length > 0) ? "googledocs" : null);
				});
			}
		];
	
		async.parallel(fetchList, 
		function(err, results) {
			if (!err) {
				var apps = [];
				for (app in results) {
					if (results[app] != null) {
						apps.push(results[app]);
					}
				}
				callback(null, apps);
			} else {
				callback(err, null);
			}
		});
	}
	
	/**
	 * Adds user to given project
	 * @param user
	 * @param project
	 * @param callback (err)
	 */
	projects.addUserToProject = function(user, project, callback) {
		user.addProject(project);
		user.save().complete(function(err) {
			callback(err);
		});
	}
	
	/**
	 * Sets project app
	 * @param project
	 * @param app
	 * @param callback
	 */
	projects.setApp = function(project, app, callback) {
		if (app.id == "flowdock") projects.setFlowdockApp(project, app.organization, app.flow, callback);
		if (app.id == "pivotal") projects.setPivotalApp(project, app.projectId, callback);
		if (app.id == "googledocs") {
			project.getGoogleDocs().then(function(docs) {
				project.removeGoogleDocs(docs).then(function() {
					async.each(app.docs, function(doc, cb) {
						projects.createGoogleDoc(project, doc.name, doc.url, cb);
					}, callback);
				});
			});
		}
	}
	
	/**
	 * Gets Pivotal Tracker app information from given project
	 * @param project
	 * @param callback (err, values)
	 */
	projects.getFlowdockApp = function(project, callback) {
		if (project.flowdock_ref != null) {
			var components = project.flowdock_ref.split("/");
			callback(null, {organization: components[0], flow: components[1]});
		} else {
			callback(null, null);
		}
	}
	
	/**
	 * Convenience method for getting project's flowdock details and user account information
	 * @param user
	 * @param project
	 * @param callback (err, info)
	 */
	projects.getFlowdockAppInfo = function(user, project, callback) {
		projects.getFlowdockApp(project, function(err, info) {
			db.utils.getAccount(user, "flowdock", function (err, account) {
				if (!err) {
					info.account = account;
					callback(null, info);
				} else {
					callback(err, null);
				}
			});
		});
	}
	
	/**
	 * Sets flowdock reference for given project
	 * @param project
	 * @param organization
	 * @param flow
	 * @param callback (err)
	 */
	projects.setFlowdockApp = function(project, organization, flow, callback) {
		if (organization != null && flow != null) {
			project.flowdock_ref = organization + "/" + flow;
		} else {
			project.flowdock_ref = null;
		}

		project.save().then(function() {
			if (callback)
				callback(null);
		})
		.catch(function(err) {
			if (callback)
				callback(err);
		});
	}
	
	/**
	 * Gets flowdock app information from given project
	 * @param project
	 * @param callback (err, values)
	 */
	projects.getPivotalApp = function(project, callback) {
		if (project.pivotal_ref != null) {
			callback(null, {projectId: project.pivotal_ref});
		} else {
			callback(null, null);
		}
	}
	
	/**
	 * Sets Pivotal Tracker reference for given project
	 * @param project
	 * @param projectId
	 * @param callback (err)
	 */
	projects.setPivotalApp = function(project, projectId, callback) {
		project.pivotal_ref = projectId;

		project.save().then(function() {
			if (callback)
				callback(null);
		})
		.catch(function(err) {
			if (callback)
				callback(err);
		});
	}
	
	/**
	 * Convenience function for getting project, Pivotal tracker client and pivotal tracker project id
	 * from project ID
	 * @param user
	 * @param projectId Project's ID in database
	 * @param callback (err, project, client, projectId)
	 */
	projects.getPivotalResources = function(user, projectId, callback) {
		db.utils.projects.getUserProjectById(user, projectId, function(err, project) {
			if (err) return callback(err);
			db.utils.getPivotalClient(user, function(err, client) {
				if (err) return callback(err);
				db.utils.projects.getPivotalApp(project, function(err, pivotalResource) {
					if (err) return callback(err);
					callback(null, project, client, pivotalResource.projectId);
				});
			});
		});
	}
	
	/**
	 * Gets list of google documents related to given project
	 * @param project
	 * @param valuesOnly
	 * @param callback (err, docs)
	 */
	projects.getGoogleDocs = function(project, valuesOnly, callback) {
		var options = {};
		if (valuesOnly)
			options.attributes = ["doc_name", "doc_url"];

		project.getGoogleDocs(options).then(function(docs) {
			if (valuesOnly) {
				var values = docs.filter(function(doc) { return doc.values } );
				callback(null, values);
			} else {
				callback(null, docs);
			}
		})
		.catch(function(err) {
			callback(err, null);
		});
	}
	
	/**
	 * Convenience method for creating google document to given project
	 * @param project
	 * @param name
	 * @param url
	 * @param callback (err, doc)
	 */
	projects.createGoogleDoc = function(project, name, url, callback) {
		db.models.googledoc.create({doc_name: name, doc_url: url}).then(function(doc) {
			project.addGoogleDoc(doc).then(function(doc) {
				callback(null, doc);
			})
			.catch(function(err) {
				callback(err, null);
			});
		})
		.catch(function(err) {
			callback(err, null);
		});
	}
	
	/**
	 * @param project
	 * @param googledoc
	 * @param callback (err, doc)
	 */
	projects.addGoogleDoc = function(project, googledoc, callback) {
		project.addGoogleDoc(googledoc).then(function(doc) {
			callback(err, doc);
		})
		.catch(function(err) {
			callback(err, null);
		});
	}
	
	function createProjectUsers(project, users, callback) {
		project.getUsers().then(function(projectUsers) {
			return project.removeUsers(projectUsers);
		}).then(function() {
			async.each(users, function(userEmail, cb) {
				db.utils.createUser(userEmail, function(err, user) {
					if (!err) {
						projects.addUserToProject(user, project, function(err) {
							cb(err);
						});
					} else {
						cb(err);
					}
				});
			}, callback);
		});
	}

	return projects;
}