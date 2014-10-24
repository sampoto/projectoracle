module.exports = {
	useSSL: true,
	forcedSSL: true,
	port: process.env.PORT,
	dbOptions: getHerokuDBOptions()
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