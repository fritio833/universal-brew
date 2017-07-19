import { environment } from '../environments/environment';

var { Router } = require('express');
var https = require('https');

var fbURL = environment.firebase.databaseURL;

export function firebaseApi() {

    var router = Router();

    router.route('/user/:id')
        .get(function(req, res) {
            var url = fbURL+`/users/${req.params.id}.json`;

            console.log('url',url);

            https.get(url,function(response) {

            var body ='';
            response.on('data', function(chunk) {
            body += chunk;
            });

            response.on('end', function() {
                var user = JSON.parse(body);
                res.json(user);
            });            
        });
    });

    router.route('/checkin/:checkinId')
        .get(function(req, res) {
            var url = fbURL+`/checkin/feeds/${req.params.checkinId}.json`;
  

            https.get(url,function(response) {

            var body ='';
            response.on('data', function(chunk) {
            body += chunk;
            });

            response.on('end', function() {
                var checkin = JSON.parse(body);
                res.json(checkin);
            });            
        });
    });

    router.route('/feeds/:priorityId')
        .get(function(req, res) {

            var limit = 10;
            var url = '';
            var startAt = parseInt(req.params.priorityId);
            var _nextToken = '';
            
            if (!startAt)
                url = fbURL+`/checkin/feeds.json?orderBy="priority"&limitToFirst=${limit}`;
            else
                url = fbURL+`/checkin/feeds.json?orderBy="priority"&limitToFirst=${limit}&startAt=${startAt}`;

            https.get(url,function(response) {

            var body ='';
            response.on('data', function(chunk) {
            body += chunk;
            });

            response.on('end', function() {
                var feeds = JSON.parse(body);
                var poppedFeed = {};
                var result = [];
                var fbFeed = {};

                for (var i in feeds) {
                    var _val = feeds[i];
                    _val['key'] = i;
                    result.push(_val);
                }

                result.reverse();

                if (result.length === limit) {
                    poppedFeed = result.pop();
                    _nextToken = poppedFeed['priority'] 
                } else {
                    _nextToken = '';
                }

                fbFeed = {
                    nextToken:_nextToken,
                    data:result
                }
                res.json(fbFeed);
            });
         });
    });

    return router;

};