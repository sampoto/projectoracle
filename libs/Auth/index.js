/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring auth
 */
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var OAuth2Strategy = require('passport-oauth2');

/**
 * @param passport Passport instance
 * @param authConfig Object containing auth options for different providers
 * @param authConfig.googleAuth Google auth options
 * @param authConfig.flowdockAuth Flowdock auth options
 */
module.exports = function(passport, authConfig) {
    passport.serializeUser(function(id, done) {
        done(null, id);
    });
    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

	if (authConfig) {
		configureGoogleAuth(passport, authConfig);
		configureFlowdockAuth(passport, authConfig);
	} else {
		throw new Error("Authentication options are not defined.");
	}
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
		return done(null, {username: profile.emails[0].value});
    }));
}

function configureFlowdockAuth(passport, authConfig) {
	// Configure flowdock auth
	var flowdockClientID = authConfig.flowdockAuth ? authConfig.flowdockAuth.clientID : null;
	var flowdockClientSecret = authConfig.flowdockAuth ? authConfig.flowdockAuth.clientSecret : null;
	var flowdockCallbackURL = "/auth/flowdock/callback";
	if (!flowdockClientID || !flowdockClientSecret) {
		throw new Error("Flowdock auth options are not defined.");
	}

	passport.use('flowdock', new OAuth2Strategy({
		authorizationURL: 'https://api.flowdock.com/oauth/authorize',
		tokenURL: 'https://api.flowdock.com/oauth/token',
		clientID: flowdockClientID,
		clientSecret: flowdockClientSecret,
		callbackURL: flowdockCallbackURL
	},
	function(token, refreshToken, profile, done) {
		return done(null, {});
    }));
}
