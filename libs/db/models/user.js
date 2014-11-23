/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for user
 */


module.exports = function(sequelize, dataTypes) {
    var user = sequelize.define( "User", {
        email: dataTypes.STRING  
    }, {
        classMethods: {
            associate: function(models) {
                user.hasMany(models.project, {through: "projectsusers"});
                user.hasMany(models.account);
            }
        }
    });
    return user;
};    

