/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 */
var utils = require('../utils.js');

 /**
  * @param passport Passport instance
  */
module.exports = function(passport, db) {
	return {
		googleAuth: passport.authenticate('google', { scope : ['profile', 'email'] }),

		googleAuthCallback: function(req, res, next) {
			passport.authenticate('google', function(err, user) {
				if (err) {
					if (typeof req.session.errors == "undefined") {
						req.session.errors = [];
					}
					var message = err.message;
					if (err.code && err.code == 'accountcreationfailed') {
						console.error(err);
						message = 'Account creation failed';
					}
					req.session.errors.push(message);
					return res.redirect('/');
				}
				req.logIn(user, function(err) {
					return res.redirect('/');
				});
			})(req, res, next);
		},

		flowdockAuth: function(req, res) {
			if (req.isAuthenticated()) {
				passport.authorize('flowdock', { successRedirect : '/', failureRedirect: '/' })(req, res);
			} else {
				res.status(403).send('Not authenticated');
			}
		},

		flowdockAuthCallback: passport.authorize('flowdock', { failureRedirect: '/' }),

		flowdockAuthLink: function(req, res) {
			if (req.isAuthenticated()) {
				var account = req.account;
				var accountInfo = { account_name: db.utils.projects.appIds.FLOWDOCK,
									access_token: account.access_token,
									refresh_token: account.refresh_token };
				db.utils.linkAccount(req.user, accountInfo, function(err) {
					if (err) return next(err);
					res.redirect('/');
				});
			} else {
				res.status(403).send('Not authenticated');
			}
		},
		
		pivotalAuth: function(req, res, next) {
			if (req.isAuthenticated()) {
				if (req.body.trackerToken && typeof req.body.trackerToken === 'string') {
					var token = req.body.trackerToken;
					// Test token using /me endpoint
					utils.fetchJSON("www.pivotaltracker.com", "/services/v5/me", {"X-TrackerToken": token}, function(err, json) {
						if (err) return next(err);
						var accountInfo = { account_name: db.utils.projects.appIds.PIVOTAL,
											access_token: token };
						db.utils.linkAccount(req.user, accountInfo, function(err) {
							if (err) return next(err);
							res.redirect('/');
						});
					});
				} else {
					passport.authorize('pivotal', { successRedirect : '/', failureRedirect: '/' })(req, res, next);
				}
			} else {
				res.status(403).send('Not authenticated');
			}
		},
		
		pivotalAuthLink: function(req, res, next) {
			var accountInfo = { account_name: db.utils.projects.appIds.PIVOTAL,
								access_token: req.account.trackerToken };
			db.utils.linkAccount(req.user, accountInfo, function(err) {
				if (err) return next(err);
				res.redirect('/');
			});
			res.redirect('/');
		},
		
		profile: function(req, res, next) {
			if (req.isAuthenticated()) {
				res.send({email: req.user.email, userlevel: req.user.userlevel});
			} else {
				res.status(403).send('Not authenticated');
			}
		},
		
		logout: function(req, res, next) {
			if (req.isAuthenticated()) {
				req.logout();
				res.send("true");
			} else {
				res.send("false");
			}
		}
	};
};