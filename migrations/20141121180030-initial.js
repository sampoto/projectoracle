"use strict";

var async = require('async');

module.exports = {
	up: function(migration, DataTypes, done) {
		async.series([
		function(cb) {
			migration.createTable('users',
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				createdAt: DataTypes.DATE,
				updatedAt: DataTypes.DATE,
				email: DataTypes.STRING
			}, 
			{}).complete(cb);
		},
		function(cb) {
			migration.createTable('projects',
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				createdAt: DataTypes.DATE,
				updatedAt: DataTypes.DATE,
				project_name: DataTypes.STRING,
				pivotal_ref: DataTypes.INTEGER,
				flowdock_ref: DataTypes.STRING
			}, 
			{}).complete(cb);
		},
		function(cb) {
			async.parallel([
			function(inner_cb) {
				migration.createTable('projectsusers',
				{
					createdAt: DataTypes.DATE,
					updatedAt: DataTypes.DATE,
					ProjectId: {
						type: DataTypes.INTEGER,
						references: 'projects',
						referencesKey: 'id',
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE'
					},
					UserId: {
						type: DataTypes.INTEGER,
						references: 'users',
						referencesKey: 'id',
						onUpdate: 'CASCADE',
						onDelete: 'CASCADE'
					}
				}, 
				{}).complete(inner_cb);
			},
			function(inner_cb) {
				migration.createTable('googledocs',
				{
					id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					createdAt: DataTypes.DATE,
					updatedAt: DataTypes.DATE,
					doc_name: DataTypes.STRING,
					doc_url: DataTypes.STRING,
					ProjectId: {
						type: DataTypes.INTEGER,
						references: 'projects',
						referencesKey: 'id',
						onUpdate: 'CASCADE',
						onDelete: 'SET NULL'
					}
				}, 
				{}).complete(inner_cb);
			},
			function(inner_cb) {
				migration.createTable('accounts',
				{
					id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					createdAt: DataTypes.DATE,
					updatedAt: DataTypes.DATE,
					account_name: DataTypes.STRING,
					access_token: DataTypes.STRING,
					refresh_token: DataTypes.STRING,
					UserId: {
						type: DataTypes.INTEGER,
						references: 'users',
						referencesKey: 'id',
						onUpdate: 'CASCADE',
						onDelete: 'SET NULL'
					}
				}, 
				{}).complete(inner_cb);
			}],
			function(err) {
				cb(err);
			});
		}],
		function() {
			done();
		});
	},

	down: function(migration, DataTypes, done) {
		migration.dropAllTables().complete(function(err) {
			done();
		});
	}
};
