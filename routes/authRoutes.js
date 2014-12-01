/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 */
 
 /**
  * @param passport Passport instance
  */
 module.exports = function(passport) {
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

		flowdockAuth: passport.authorize('flowdock', { successRedirect : '/', failureRedirect: '/' }),

		flowdockAuthCallback: passport.authorize('flowdock', { failureRedirect: '/' }),

		loggedIn: function(req, res, next) {
			res.send(req.isAuthenticated() ? req.user : '');
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

