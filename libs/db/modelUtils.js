/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Module for model related utils
 */

module.exports = (function() {
	var utils = {};
	/**
	 * Convenience function used in migrations
	 * @param tableName
	 * @param tablePrefix
	 */
	utils.tableName = function(tableName, tablePrefix) {
		return (typeof tablePrefix == "string") ? tablePrefix + "_" + tableName : tableName;
	}

	return utils;
})();