module.exports = {
	useSSL: true,
	forcedSSL: true,
	trustProxy: true,
	port: process.env.PORT,
	dbOptions: getHerokuDBOptions(),
	sessionSecret: process.env.SESSIONSECRET,
	auth: {
		allowRegistration: process.env.ALLOWREGISTRATION || false,
		googleAuth: {
			clientID: process.env.googleClientID,
			clientSecret: process.env.googleClientSecret
		},
		flowdockAuth: {
			clientID: process.env.flowdockClientID,
			clientSecret: process.env.flowdockClientSecret
		}
	},
	debug: process.env.DEBUG
}

function getHerokuDBOptions(){
	var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
	return {options: {
				database: match[5],
				username: match[1],
				password: match[2],
				dialect:  'postgres',
				protocol: 'postgres',
				port:     match[4],
				host:     match[3],
				logging:  false
			},
			encryptKey: process.env.ENCRYPTKEY,
			force: typeof process.env.FORCE !== "undefined" ? process.env.FORCE : false,
			admins: (function() {
				return typeof process.env.ADMIN !== "undefined" ? [process.env.ADMIN] : null; 
			}()),
			forceAdmins: typeof process.env.FORCEADMINS !== "undefined" ? process.env.FORCEADMINS : false
			};
}