var _               = require('lodash');
var settings        = require('../config/settings');
var env             = require('../config/settings')['twitter'];
var async           = require('async');
var colors          = require('colors');
var Twitter         = require('twitter');
var mongojs         = require('mongojs');
var db              = mongojs('ecv_twitter',['ecv_twitter']);

db.on('error',function() {
    console.log('Error connecting to server...');
});


var client = new Twitter({
    consumer_key: env.TWITTER_CONSUMER_KEY,
    consumer_secret: env.TWITTER_CONSUMER_SECRET,
    access_token_key: env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: env.TWITTER_ACCESS_TOKEN_SECRET
});

//Paisos amb els que jugarem

/*
 * Spain:	23424950
 * Barcelona: 753692
 * France: 	23424819
 */
var countries = [
    {name: 'WorldWide', value:1 },
    {name: 'Spain', value: 23424950},
    {name: 'Portugal', value: 23424925},
    {name: 'France', value: 23424819},
    {name: 'Switzerland', value: 23424957},
    {name: 'Catalonia', value: 753692}
];

var getTrends = function(id, country) {
    //Get trends from country
    client.get('trends/place',{id: id}, function(error, trends, response){
        if(error) {
            console.log(error);
        }
        async.forEachLimit(trends[0]['trends'], 4, function(trend, taskDone) {

            //Get top tweets for trend
            client.get('search/tweets',{q: trend['query']}, function(error, tweets, response){
                //console.log(tweets['statuses']);
                if(error) {
                    console.log(error);
                }
                var toptweets = [];

                async.forEachLimit(tweets['statuses'], 15, function(tweet, taskDone) {
                    toptweets.push({
                        user_name: tweet['user']['screen_name'],
                        text: tweet['text'],
                        created_at: tweet['created_at']
                    });
                });

                db.ecv_twitter.insert({
                    country: country,
                    country_id: id,
                    name: trend['name'],
                    url: trend['url'],
                    query: trend['query'],
                    tweet_volume: trend['tweet_volume'],
                    tweets: JSON.stringify(toptweets),
                    created_at: new Date()
                });
                console.log(('Inserting: ' + trend['name'] + ' on ' + country).green);

            })
        });
    });
};

var i = 0;
setInterval(function(){
    console.log(('Getting trends from ' + countries[i].name).red );
    getTrends(countries[i].value, countries[i].name);
    i = i !== countries.length-1  ? i+1 : 0;
}, 1000*60*4);

