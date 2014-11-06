/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for account
 */


module.exports = function(sequelize, dataTypes) {
    var account = sequelize.define( "Account", {
        account_name: dataTypes.STRING,
        access_token: dataTypes.STRING,
        refresh_token: dataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                account.belongsTo(models.user)
            }
        }
    })
    return account;
};

