var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var env             = require('../../config/settings')['twitter'];
var async           = require('async');
var colors          = require('colors');
var mongojs         = require('mongojs');
var db              = mongojs('ecv_twitter',['ecv_twitter']);

db.on('error',function() {
    console.log('Error connecting to server...');
});

var controller_name = 'play';

module.exports = {
    list: function (req, res, next) {
        db.ecv_twitter.find().limit(100).sort({created_at:1}).toArray( function (err, docs) {
            docs.forEach(function (doc) {
                doc.tweets = JSON.parse(doc.tweets);
            });
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,docs));
        });
    },

    create: function (req, res, next) {
        var params = _.pick(req.body, 'id', 'text', 'topic', 'user_name');

        db.ecv_twitter.find({country: params.id, name: params.topic}).sort({created_at:1}).limit(1).toArray( function (err, doc) {
            //console.log(doc);
            if (doc[0]){
                doc[0].tweets = JSON.parse(doc[0].tweets);
                doc[0].tweets.push({
                    user_name: params.user_name,
                    text: params.text,
                    created_at: new Date()
                });
                db.ecv_twitter.findAndModify({
                    query: {_id: doc[0]._id},
                    update: {$set: { tweets: JSON.stringify(doc[0].tweets)} },
                    new: true
                }, function (err, result, lastErrorObject) {

                    result.tweets = JSON.parse(result.tweets);
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,result));
                });
            }
            else {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,'Not Found'));
            }
        });


    },
    get: function (req, res, next) {
        var id = req.params.id ? req.params.id : null;
        //console.log(id);
        db.ecv_twitter.find({country: id}).sort({created_at:1}).limit(4).toArray( function (err, docs) {
            docs.forEach(function (doc) {
                doc.tweets = JSON.parse(doc.tweets);
            });
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,docs));
        });

    },
    put: function(req,res,next) {

    },
    delete: function(req,res,next) {

    }
};
