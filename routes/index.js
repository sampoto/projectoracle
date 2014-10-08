/*
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 */

var index = function(req, res){
    res.render('index', {});
};

/**
 * @param app Express app instance
 */
module.exports = function(app) {
	app.get('/', index);
}