/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring auth
 */
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/**
 * @param passport Passport instance
 * @param authConfig Object containing auth options for different providers
 * @param authConfig.googleAuth Google auth options
 */
module.exports = function(passport, authConfig) {
    passport.serializeUser(function(id, done) {
        done(null, id);
    });
    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

	configureGoogleAuth(passport, authConfig);
};

function configureGoogleAuth(passport, authConfig) {
	// Configure google authentication
	var googleClientID = authConfig.googleAuth ? authConfig.googleAuth.clientID : null;
	var googleClientSecret = authConfig.googleAuth ? authConfig.googleAuth.clientSecret : null;
	var googleCallbackURL = "/auth/google/callback";
	if (!googleClientID || !googleClientSecret) {
		throw new Error("Google authentication options are not defined.");
	}

    passport.use(new GoogleStrategy({
        clientID        : googleClientID,
        clientSecret    : googleClientSecret,
        callbackURL     : googleCallbackURL,
    },
    function(token, refreshToken, profile, done) {
		return done(null, profile.emails[0].value);
    }));
}
