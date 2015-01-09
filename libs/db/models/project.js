/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for project
 */
var utils = require('../modelUtils.js');

module.exports = function(sequelize, dataTypes, tablePrefix) {
    var project = sequelize.define( "Project", {
        project_name: dataTypes.STRING,
        pivotal_ref: dataTypes.INTEGER,
        flowdock_ref: dataTypes.STRING  
    }, {
        classMethods: {
            associate: function(models) {
                project.hasMany(models.googledoc);
                project.belongsToMany(models.user, {through: utils.tableName('projectsusers', tablePrefix)});
            }
        },
		freezeTableName: true,
		tableName: utils.tableName('projects', tablePrefix)
    })
    return project;
};

