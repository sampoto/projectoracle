/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for account
 */
var utils = require('../modelUtils.js');

module.exports = function(sequelize, dataTypes, tablePrefix) {
    var account = sequelize.define( "Account", {
        account_name: dataTypes.STRING,
        access_token: dataTypes.STRING,
        refresh_token: dataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                account.belongsTo(models.user);
            }
        },
		freezeTableName: true,
		tableName: utils.tableName('accounts', tablePrefix)
    })
    return account;
};

