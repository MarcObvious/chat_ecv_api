var settings = require('../../config/settings');

var play_routes = require('./api_play');

var home_routes = require('./web_home');

module.exports = function (app) {
    //Api routes
    app.use(settings.api_prefix+'/play',play_routes);
    //Web routes
    app.use('/',home_routes);
};