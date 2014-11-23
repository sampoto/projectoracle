/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for Google Docs
 */


module.exports = function(sequelize, dataTypes) {
    var googledoc = sequelize.define( "GoogleDoc", {
        doc_name: dataTypes.STRING,
        doc_url: dataTypes.STRING  
    }, {
        classMethods: {
            associate: function(models) {
                googledoc.belongsTo(models.project);
            }
        }
    })
    return googledoc;
};

