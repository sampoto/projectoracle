"use strict";

var utils = require('../libs/db/modelUtils.js');
var Bluebird = require('bluebird');
var Sequelize = require('Sequelize');

module.exports = {
	up: function(QueryInterface, tablePrefix) {
		return new Bluebird(function(resolve, reject) {
			QueryInterface.createTable(utils.tableName('users', tablePrefix),
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				createdAt: Sequelize.DATE,
				updatedAt: Sequelize.DATE,
				email: Sequelize.STRING,
				userlevel: {type: dataTypes.INTEGER, defaultValue: 0}
			})
			.then(function() {
				return QueryInterface.createTable(utils.tableName('projects', tablePrefix),
				{
					id: {
						type: Sequelize.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					createdAt: Sequelize.DATE,
					updatedAt: Sequelize.DATE,
					project_name: Sequelize.STRING,
					pivotal_ref: Sequelize.INTEGER,
					flowdock_ref: Sequelize.STRING
				});
			})
			.then(function() {
				Bluebird.join(
				QueryInterface.createTable(utils.tableName('projectsusers', tablePrefix),
					{
						createdAt: Sequelize.DATE,
						updatedAt: Sequelize.DATE,
						ProjectId: {
							type: Sequelize.INTEGER,
							references: utils.tableName('projects', tablePrefix),
							referencesKey: 'id',
							onUpdate: 'CASCADE',
							onDelete: 'CASCADE'
						},
						UserId: {
							type: Sequelize.INTEGER,
							references: utils.tableName('users', tablePrefix),
							referencesKey: 'id',
							onUpdate: 'CASCADE',
							onDelete: 'CASCADE'
						}
					}, {}),
					QueryInterface.createTable(utils.tableName('googledocs', tablePrefix),
					{
						id: {
							type: Sequelize.INTEGER,
							primaryKey: true,
							autoIncrement: true
						},
						createdAt: Sequelize.DATE,
						updatedAt: Sequelize.DATE,
						doc_name: Sequelize.STRING,
						doc_url: Sequelize.STRING,
						ProjectId: {
							type: Sequelize.INTEGER,
							references: utils.tableName('projects', tablePrefix),
							referencesKey: 'id',
							onUpdate: 'CASCADE',
							onDelete: 'SET NULL'
						}
					}, {}),
					QueryInterface.createTable(utils.tableName('accounts', tablePrefix),
					{
						id: {
							type: Sequelize.INTEGER,
							primaryKey: true,
							autoIncrement: true
						},
						createdAt: Sequelize.DATE,
						updatedAt: Sequelize.DATE,
						account_name: Sequelize.STRING,
						access_token: Sequelize.STRING,
						refresh_token: Sequelize.STRING,
						UserId: {
							type: Sequelize.INTEGER,
							references: utils.tableName('users', tablePrefix),
							referencesKey: 'id',
							onUpdate: 'CASCADE',
							onDelete: 'SET NULL'
						}
					}, {}),
					function() {
						resolve();
					}
				);
			});
		});
	},

	down: function(QueryInterface, tablePrefix) {
		return QueryInterface.dropAllTables();
	}
};
