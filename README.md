Project Oracle
============

Project Oracle aims at a mash-up application which integrates together other applications such as Flowdocks, Google spreadsheets and Pivotal Tracker.

Installation
------------
1. Clone the repository
2. Install Node.js
3. Create *config.js* to root *Config* folder
For example:

        var fs = require('fs');
        module.exports = {
			sslOptions: {
				key: fs.readFileSync('./ssl/server.key'),
				cert: fs.readFileSync('./ssl/server.crt')
			}
        }
SSL can be turned off with config option *useSSL*.
4. Install and run locally by issuing commands

        npm install
        npm start
Alternatively you can deploy the application elsewhere.

Set NODE_ENV environment variable to "heroku" to deploy to Heroku.

[ ![Codeship Status for sampoto/projectoracle](https://www.codeship.io/projects/fc206f70-1ee3-0132-e461-5e9ca203bed1/status)](https://www.codeship.io/projects/35583)