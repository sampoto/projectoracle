/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for user
 */
var utils = require('../modelUtils.js');

module.exports = function(sequelize, dataTypes, tablePrefix) {
    var user = sequelize.define( "User", {
        email: dataTypes.STRING,
		userlevel: {type: dataTypes.INTEGER, defaultValue: 0}
    }, {
        classMethods: {
            associate: function(models) {
                user.belongsToMany(models.project, {through: utils.tableName('projectsusers', tablePrefix)});
                user.hasMany(models.account);
            }
        },
		freezeTableName: true,
		tableName: utils.tableName('users', tablePrefix)
    });
    return user;
};    

