/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Helper library for testing express routes
 */

var Request = module.exports.Request = function(action) {
	this.action = action;
	this.req = {};
	this.res = {};
	this.responseStatus = 200;
	this.responseBody = null;
	this.nextCalled = false;
}

/**
 * @param params
 */
Request.prototype.params = function(params) {
	this.req.params = params;
	return this;
}

/**
 * @param body
 */
Request.prototype.body = function(body) {
	this.req.body = body;
	return this;
}

/**
 * @param object
 * @param bindTarget [optional]
 */
Request.prototype.extendReq = function(object, bindTarget) {
	extend(this.req, object, bindTarget);
	return this;
}

/**
 * @param object
 * @param bindTarget [optional]
 */
Request.prototype.extendRes = function(object, bindTarget) {
	extend(this.res, object, bindTarget);
	return this;
}

/**
 * @param callback (content, nextParams)
 */
Request.prototype.end = function(callback) {
	var self = this;
	if (typeof this.action !== "function") throw new Error('Action not defined');
	this.res.status = function(status) { self.responseStatus = status; return this; }
	this.res.send = function(content) { self.responseBody = content; callback(content, null); };
	var next = function(params) { self.nextCalled = true; callback(null, params); };
	this.action(this.req, this.res, next);
}

/**
 * @param target
 * @param data
 * @param bindTarget [optional]
 */
function extend(target, data, bindTarget) {
	for (var prop in data) {
		target[prop] = data[prop];
		if (bindTarget && typeof target[prop] === "function") {
			target[prop].bind(bindTarget);
		}
	}
}

/**
 * @param db
 * @param admin Bool
 * @param callback (err, user, project)
 */
module.exports.projectTestSetup = function(db, admin, callback) {
	var userlevel = admin ? db.userlevels.ADMIN : db.userlevels.USER;
	db.models.user.create({email: "test@test.invalid", userlevel: userlevel}).complete(function(err, user) {
		if (err) return callback(err);
		db.utils.projects.createProject("test", function(err, project) {
			if (err) return callback(err);
			db.utils.projects.addUserToProject(user, project, function(err) {
				callback(err, user, project);
			});
		});
	});
}