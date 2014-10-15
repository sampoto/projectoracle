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

		googleAuthCallback: passport.authenticate('google', {
			successRedirect : '/',
			failureRedirect : '/'
		})
	}
 };

