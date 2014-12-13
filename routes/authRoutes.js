/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 */
 
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
					req.session.errors.push(err.message);
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
				var accountInfo = { account_name: 'flowdock',
									access_token: account.access_token,
									refresh_token: account.refresh_token };
				db.utils.linkAccount(req.user, accountInfo, null);
				res.redirect('/');
			} else {
				res.status(403).send('Not authenticated');
			}
		},
		
		loggedIn: function(req, res, next) {
			res.send(req.isAuthenticated() ? req.user.email : '');
		},
		
		logout: function(req, res, next) {
			if (req.isAuthenticated()) {
				req.logout();
				res.send("true");
			} else {
				res.send("false");
			}
		}
	}
 };

