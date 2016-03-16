var path       = require('path');

var settings = {
    appMode    : 'dev',
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    logsdir     : __dirname + '/../logs/access.log',

    api_prefix  : '/api',
    
    //Put here you credentials!
    twitter: {
        TWITTER_CONSUMER_KEY: '',
        TWITTER_CONSUMER_SECRET: '',
        TWITTER_ACCESS_TOKEN_KEY: '',
        TWITTER_ACCESS_TOKEN_SECRET: ''
    },
    csrftoken : 'X-Origin-Provider'
};
module.exports = settings;