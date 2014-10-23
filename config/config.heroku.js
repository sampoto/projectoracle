module.exports = {
	useSSL: true,
	forcedSSL: true,
	port: process.env.PORT,
	dbOptions: getHerokuDBOptions(),
	sessionSecret: process.env.SESSIONSECRET,
	auth: {
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

function getHerokuDBOptions(){
	var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
	return {dbname: match[5],
			username: match[1],
			password: match[2],
			options: {
				dialect:  'postgres',
				protocol: 'postgres',
				port:     match[4],
				host:     match[3],
				logging:  false
			}};
}