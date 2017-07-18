import { environment } from '../environments/environment';

var { Router } = require('express');
var https = require('https');

//var googlePlacesAPIKey = 'AIzaSyDJ5qz7QX1yXkX2c444v5v0ziSPg15PLjM';
//var googlePlacesAPIKey = environment.google.googlePlacesAPIKey;

//var googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/';
var fbURL = environment.firebase.databaseURL;

export function firebaseApi() {

    var router = Router();

    router.route('/users/')
        .get(function(req, res) {
            var url = fbURL+'/cities.json?orderBy=city&startAt=A&limitToFirst';

            https.get(url,function(response) {

            var body ='';
            response.on('data', function(chunk) {
            body += chunk;
            });

            response.on('end', function() {
                var users = JSON.parse(body);
                res.json(users);
            });            
        });
    });

    return router;

};