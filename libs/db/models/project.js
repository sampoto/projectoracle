/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for project
 */


module.exports = function(sequelize, dataTypes) {
    var project = sequelize.define( "Project", {
        project_name: dataTypes.STRING,
        pivotal_ref: dataTypes.INTEGER,
        flowdock_ref: dataTypes.STRING  
    }, {
        classMethods: {
            associate: function(models) {
                project.hasMany(models.googledoc),
                project.belongsTo(models.user)
            }
        }
    })
    return project;
};

