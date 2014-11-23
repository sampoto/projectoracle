module.exports = {
	useSSL: true,
	forcedSSL: true,
	port: process.env.PORT,
	dbOptions: {
		dbname: "test",
		username: process.env.PG_USER,
		password: process.env.PQ_PASSWORD,
		options: {
			dialect:  'postgres',
			protocol: 'postgres',
			logging: false
		},
		encryptKey: process.env.ENCRYPTKEY
	},
	sessionSecret: process.env.SESSIONSECRET,
	auth: {
		allowRegistration: process.env.ALLOWREGISTRATION,
		googleAuth: {
			clientID: process.env.googleClientID,
			clientSecret: process.env.googleClientSecret
		},
		flowdockAuth: {
			clientID: process.env.flowdockClientID,
			clientSecret: process.env.flowdockClientSecret
		}
	}
}