import { environment } from '../environments/environment';

var util = require('util');
var { Router } = require('express');
var request = require('request');
var https = require('https');

//var googlePlacesAPIKey = 'AIzaSyDJ5qz7QX1yXkX2c444v5v0ziSPg15PLjM';
var googlePlacesAPIKey = environment.google.googlePlacesAPIKey;

var googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/';

export function googlePlacesApi() {

    var router = Router();

    router.route('/place_by_origin/:name/:lat/:lng')
        .get(function(req, res) {

            var url = googlePlacesURL+ 'nearbysearch/json?location='
            + req.params.lat 
            + ',' 
            + req.params.lng
            + '&keyword='
            + encodeURIComponent(req.params.name)
            +'&rankby=distance&key=' 
            + googlePlacesAPIKey;
            
            https.get(url,function(response) {

                var body ='';
                response.on('data', function(chunk) {
                body += chunk;
                });

                response.on('end', function() {
                    var places = JSON.parse(body);
                    var locations = places.results;
                    var location = locations[0];

                    if ("photos" in location) {
                        location['main_img'] = getGoogleImg(location.photos[0].photo_reference);
                    }
                    res.json(location);
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
        });

        function getGoogleImg(photo_ref) {
            
            return googlePlacesURL+'photo?photoreference='+photo_ref+'&maxwidth=500&key='+googlePlacesAPIKey;
        }        

    return router;
};

