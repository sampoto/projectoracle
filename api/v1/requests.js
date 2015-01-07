/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Request implementations for API v1
 */
 
module.exports = function(db) {

	var requests = {};
	
	requests.getProjects = function(req, res, next) {
		db.utils.projects.getUserProjects(req.user, function(err, projects) {
			if (!err) {
				var projectList = projects.map(function(project) {
					return {id: project.id, name: project.name};
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

	return requests;
}