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
			dbOptions: {dbname:'database', username:'<username>', 
		    password:'<password>', options:{dialect: '<dialect>', logging: false}
		    },
			sessionSecret: '<SessionSecret>',
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

[ ![Codeship Status for sampoto/projectoracle](https://www.codeship.io/projects/fc206f70-1ee3-0132-e461-5e9ca203bed1/status)](https://www.codeship.io/projects/35583)
