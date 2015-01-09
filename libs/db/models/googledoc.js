/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for Google Docs
 */
var utils = require('../modelUtils.js');

module.exports = function(sequelize, dataTypes, tablePrefix) {
    var googledoc = sequelize.define( "GoogleDoc", {
        doc_name: dataTypes.STRING,
        doc_url: dataTypes.STRING  
    }, {
        classMethods: {
            associate: function(models) {
                googledoc.belongsTo(models.project);
            }
        },
		freezeTableName: true,
		tableName: utils.tableName('googledocs', tablePrefix)
    })
    return googledoc;
};

