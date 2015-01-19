Project Oracle
============

Project Oracle aims at a mash-up application which integrates together other applications such as Flowdock, Google spreadsheets and Pivotal Tracker.

Installation
------------
1. Clone/download the project
2. Configure the application using config file.
The used configuration file is determined by NODE_ENV environment variable. The configuration file path pattern is *config/config.[NODE_ENV].js*.
If NODE_ENV is not issued, the file is *config/config.development.js*.

 Configuration file example:

        var fs = require('fs');
        module.exports = {
        	sslOptions: {
        		key: fs.readFileSync('./ssl/server.key'),
        		cert: fs.readFileSync('./ssl/server.crt')
        	},
        	dbOptions: {
        		options: {
        			database:'database', username:'<username>', 
        			password:'<password>', dialect: '<dialect>', 
        			logging: false
        		},
        		encryptKey:'<encryptkey>',
        		projects: [ 
        			{name: "test", 
        			applications: [ {id: "flowdock", organization: "<organization>", flow: "<flow>"},
        							{id: "pivotal", projectId: "<projectId>"},
        							{id: "googledocs", docs: [{name: "<name>", url: "<url>"}]}], 
        			users: ["test@test.invalid"] }
        		],
        		force: true
        	},
        	sessionSecret: '<SessionSecret>',
        	debug: true,
        	auth: {
        		googleAuth: {
        			clientID: '<ClientID>',
        			clientSecret: '<ClientSecret>'
        		},
        		flowdockAuth: {
        			clientID: '<ClientID>',
        			clientSecret: '<ClientSecret>'
        		}
        	}
        }
3. To install and run locally, issue commands

        npm install
        npm start
Alternatively you can deploy the application elsewhere.

Set NODE_ENV environment variable to "heroku" and configure the rest of the environment variables to deploy to Heroku.

If you want to use Docker, install Docker and Fig and run `fig up`. Remember to generate your SSL key without a passphrase, with e.g.

```
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem
```

[ ![Codeship Status for sampoto/projectoracle](https://www.codeship.io/projects/fc206f70-1ee3-0132-e461-5e9ca203bed1/status)](https://www.codeship.io/projects/35583)
