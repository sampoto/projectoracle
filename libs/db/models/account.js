/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Database model for account
 */


var sequelize = require('sequelize');

module.exports = {
    account: sequelize.STRING,
    token: sequelize.STRING,
    refresh_token: sequelize.STRING

};
