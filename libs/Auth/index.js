/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for configuring auth
 */
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var OAuth2Strategy = require('passport-oauth2');

/**
 * @param passport Passport instance
 * @param authConfig Object containing auth options for different providers
 * @param authConfig.googleAuth Google auth options
 * @param authConfig.flowdockAuth Flowdock auth options
 * @param db Database instance
 */
module.exports = function(passport, authConfig, db) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        db.models.user.find(id).then(function(user) {
			done(null, user);
		}).catch(function(err) {
			done(err, null);
		});
    });

	if (authConfig) {
		configureGoogleAuth(passport, db, authConfig);
		configureFlowdockAuth(passport, authConfig);
		configurePivotalAuth(passport);
	} else {
		throw new Error("Authentication options are not defined.");
	}
};

function configureGoogleAuth(passport, db, authConfig) {
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
		db.utils.getUser(profile.emails[0].value, function(err, user) {
			if (!err && user != null) {
				return done(null, user);
			} else if (authConfig.allowRegistration) {
				// Create account automatically if registration is allowed
				db.utils.createUser(profile.emails[0].value, function(err, user) {
					if (!err) {
						return done(null, user);
					} else {
						err.code = 'accountcreationfailed';
						return done(err, null);
					}
				});
			} else {
				return done(new Error("No account exists for given email"), null);
			}
		});
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
		return done(null, {access_token: token, refresh_token: refreshToken});
    }));
}

function configurePivotalAuth(passport) {
	passport.use('pivotal', new LocalStrategy(
		function(username, password, done) {
			var path = utils.pivotalServicePath + "/me";
			var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
			utils.fetchJSON(utils.pivotalHost, path, {Authorization: auth}, function(err, profile) {
				if (!err) {
					done(null, {trackerToken: profile.api_token});
				} else {
					done(err, null);
				}
			});
		})
	);
}
