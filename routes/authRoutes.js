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
				if (err) { return next(err); }
				req.logIn(user, function(err) {
					if (!err) {
						res.cookie('user', user.username);
					}
					return res.redirect('/');
				});
			})(req, res, next);
		},
		
		loggedIn: function(req, res, next) {
			res.send(req.isAuthenticated() ? req.user : '');
		},
		
		logout: function(req, res, next) {
			res.logout();
		}
	}
 };

