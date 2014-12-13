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
				callback(null, null);
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
	 * Gets flowdock app information from given project
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
	 * Sets flowdock reference for given project
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
				callback(err, doc);
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
	
	return projects;
}