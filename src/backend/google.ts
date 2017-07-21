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

    router.route('/place_photo/:id')
        .get(function(req, res) {

            var url = googlePlacesURL 
            + 'photo?photoreference='
            + req.params.id
            + '&maxwidth=500&key=' + googlePlacesAPIKey;

            //console.log('url',url);
            //res.json(url);          
            
            https.get(url,function(response) {

                var body ='';
                response.on('data', function(chunk) {
                body += chunk;
                });

                response.on('end', function() {
                    var photo = JSON.parse(body);
                    
                    //console.log(places)
                    res.json(photo);
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
        });

    router.route('/place_by_id/:id')
        .get(function(req, res) {

            var url = googlePlacesURL+ 'details/json?placeid='
            + req.params.id 
            + '&key=' 
            + googlePlacesAPIKey;
            
            https.get(url,function(response) {

                var body ='';
                response.on('data', function(chunk) {
                body += chunk;
                });

                response.on('end', function() {
                    var _places = JSON.parse(body);
                    var place = _places.result;
                    
                    if ("photos" in place) {
                        place['main_img'] = getGoogleImg(place.photos[0].photo_reference);
                    }
                    
                    //console.log(places)
                    res.json(place);
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
        });

    router.route('/search_place_type/:city_name')
        .get(function(req, res) {
            
            var url = googlePlacesURL + 'textsearch/json?query='
            + req.params.city_name
            + '&key='+googlePlacesAPIKey;

            https.get(url,function(response) {

                var body ='';
                response.on('data', function(chunk) {
                body += chunk;
                });

                response.on('end', function() {
                    var _places = JSON.parse(body);
                    //console.log(places)
                    res.json(_places);
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });

        });
        
    router.route('/search_place_next/:token_id')
        .get(function(req, res) {
            
            var url = googlePlacesURL + 'textsearch/json?pagetoken='
            + req.params.token_id
            + '&key='+googlePlacesAPIKey;

            https.get(url,function(response) {

                var body ='';
                response.on('data', function(chunk) {
                body += chunk;
                });

                response.on('end', function() {
                    var _places = JSON.parse(body);
                    //console.log(places)
                    res.json(_places);
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });

        });

    router.route('/city_auto/:city_name')
        .get(function(req, res) {

            var url = googlePlacesURL + 'autocomplete/json?input='
            + req.params.city_name + "&country=us" 
            + '&types=(cities)&key='+googlePlacesAPIKey;
            

            https.get(url,function(response) {

                var body ='';
                response.on('data', function(chunk) {
                body += chunk;
                });

                response.on('end', function() {
                    var _places = JSON.parse(body);
                    //console.log(places)
                    res.json(_places);
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });

        });

    router.route('/bar_auto/:bar_name/:lat/:lng')
        .get(function(req, res) {

            let loc = '';
            let lat = req.params.lat;
            let lng = req.params.lng;

            if (lat != null && lng != null) {
              loc = '&location='+lat+','+lng;
            }            

            var url = googlePlacesURL 
            + 'textsearch/json?query='
    	    + req.params.bar_name
            + loc 
            + '&type=bar&key='+googlePlacesAPIKey;
            

            https.get(url,function(response) {

                var body ='';
                response.on('data', function(chunk) {
                body += chunk;
                });

                response.on('end', function() {
                    var _places = JSON.parse(body);
                    //console.log(places)
                    res.json(_places);
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

