var util = require('util');
var {Router} = require('express');
var request = require('request');

// Our API for demos only
import {fakeDataBase} from './db';
import {fakeDemoRedisCache} from './cache';

// you would use cookies/token etc
var USER_ID = 'f9d98cf1-1b96-464e-8755-bcc2a5c09077'; // hardcoded as an example

var breweryDBAPI = '3c7ec73417afb44ae7a4450482f99d70';
var breweryDBURL = 'https://api.brewerydb.com/v2/';



// Our API for demos only
export function serverApi(req, res) {
  let key = USER_ID + '/data.json';
  let cache = fakeDemoRedisCache.get(key);
  if (cache !== undefined) {
    console.log('/data.json Cache Hit');
    return res.json(cache);
  }
  console.log('/data.json Cache Miss');

  fakeDataBase.get()
    .then(data => {
      fakeDemoRedisCache.set(key, data);
      return data;
    })
    .then(data => res.json(data));
}


// todo API

var COUNT = 4;
var TODOS = [
  { id: 0, value: 'finish example', created_at: new Date(), completed: false },
  { id: 1, value: 'add tests',      created_at: new Date(), completed: false },
  { id: 2, value: 'include development environment', created_at: new Date(), completed: false },
  { id: 3, value: 'include production environment',  created_at: new Date(), completed: false }
];

export function createBreweryDbApi() {

  var router = Router();

  router.route('/beer_detail/:beer_id')
    .get(function(req, res) {
      console.log('GET BEER',req.params);
      
      request(breweryDBURL
        +'beer/' 
        + req.params.beer_id
        + '/?key=' + breweryDBAPI
        + '&type=beer&withBreweries=Y&withSocialAccounts=Y&withIngredients=Y', function (error, response, body) {

        if (response === undefined) {
          var dbResp = {data:[],error:true,msg:"Brewery API Down"};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      });  
    });

  router.route('/random_beer_by_style/:style_id')
    .get(function(req, res) {
      console.log('GET RAND BEER',req.params);
      
      request(breweryDBURL
        +'beers/?key=' 
           + breweryDBAPI
           + '&styleId='
           + req.params.style_id
           +'&randomCount=10&availableId=1&order=random&withBreweries=Y', function (error, response, body) {

        if (response === undefined) {
          var dbResp = {data:[],error:true,msg:"Brewery API Down"};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      });    
    });    

  router.route('/beers_by_name')
    .get(function(req, res) {
      console.log('GET BEERS',req.query.name);

      var _page = ''

      if (req.query.p !== undefined) {
        _page = '&p='+req.query.p; 
      } 

      request(breweryDBURL
        +'search/?key='+ breweryDBAPI
        +'&q='+req.query.name
        + _page
        +'&withBreweries=Y&type=beer', function (error, response, body) {

        if (response === undefined) {
          var dbResp = {data:[],error:true,msg:"Brewery API Down"};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      });       

    });

  router.route('/brewery_beers/:brewery_id')
    .get(function(req, res) {
      console.log('GET BREWERY BEERS',req.params);

      request(breweryDBURL
        +'brewery/'
        + req.params.brewery_id
        +'/beers?key='+ breweryDBAPI, function (error, response, body) {

        if (response === undefined) {
          var dbResp = {data:[],error:true,msg:"Brewery API Down"};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      });      
    });

  router.route('/breweries_by_name')
    .get(function(req, res) {
      console.log('GET BREWERIES',req.query.name);

      var _page = ''

      if (req.query.p !== undefined) {
        _page = '&p='+req.query.p; 
      } 

      request(breweryDBURL
        +'search/?key='+ breweryDBAPI
        +'&q=*'+req.query.name+'*'
        + _page
        +'&withLocations=Y&type=brewery', function (error, response, body) {

        if (response === undefined) {
          var dbResp = {data:[],error:true,msg:"Brewery API Down"};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      });       

    });

  router.route('/brewery_by_location/:lat/:lng')
    .get(function(req, res) {
      //console.log('lat',req.params.lat);
      //console.log('lng',req.params.lng);

      /*
      var _page = ''

      if (req.query.p !== undefined) {
        _page = '&p='+req.query.p; 
      }

      */           
      request(breweryDBURL
          + 'search/geo/point?lat='
          + req.params.lat
          + '&lng='
          + req.params.lng
          + "&radius=25" 
          + '&key='+breweryDBAPI, function (error, response, body) {

        if (response === undefined) {
          var dbResp = {data:[],error:true,msg:"Brewery API Down"};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      });       
    });

  router.route('/brewery_location/:location_id')
    .get(function(req, res) {
      console.log('GET Brewery Loc',req.params.location_id);
      
      request(breweryDBURL 
        +'location/' 
        + req.params.location_id
        + '/?key=' + breweryDBAPI, function (error, response, body) {
        if (response === undefined) {
          var dbResp = {data:[],error:true,msg:"Brewery API Down"};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      });  
    });

  router.route('/brewery_detail/:brewery_id')
    .get(function(req, res) {
      console.log('GET Brewery',req.params);
      
      request(breweryDBURL 
        +'brewery/' 
        + req.params.brewery_id
        + '/?key=' + breweryDBAPI
        + '&withLocations=Y&withSocialAccounts=Y', function (error, response, body) {

        if (response === undefined) {
          var dbResp = {data:[],error:true,msg:"Brewery API Down"};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      });  
    });

  router.route('/todos')
    .get(function(req, res) {
      console.log('GET');
      // 70ms latency

      request(breweryDBURL
        +'search/?key='+ breweryDBAPI
        +'&q=Bud&withBreweries=Y&type=beer', function (error, response, body) {

        console.log('error',error);
        console.log('response',response);
        console.log('body',body);

        if (response === undefined) {
          var dbResp = {data:[]};
          res.json(dbResp);          
        } else {
          res.json(JSON.parse(response.body));          
        }
      }); 
      
    })
    .post(function(req, res) {
      console.log('POST', util.inspect(req.body, {colors: true}));
      var todo = req.body;
      if (todo) {
        TODOS.push({
          value: todo.value,
          created_at: new Date(),
          completed: todo.completed,
          id: COUNT++
        });

        request(breweryDBURL
          +'search/?key='+ breweryDBAPI
          +'&q='+req.query.q+'&withBreweries=Y&type=beer', function (error, response, body) {

          /*  
          if(response.statusCode === 200)
            res.status(200).send(response.body);
          else
            res.status(404).send('Brewery API down');
          */  
          
        });        
        return res.json(todo);
      }

      return res.end();
    });

  router.param('todo_id', function(req, res, next, todo_id) {
    // ensure correct prop type
    var id = Number(req.params.todo_id);
    try {
      var todo = TODOS[id];
      req.todo_id = id;
      req.todo = TODOS[id];
      next();
    } catch (e) {
      next(new Error('failed to load todo'));
    }
  });

  router.route('/todos/:todo_id')
    .get(function(req, res) {
      console.log('GET', util.inspect(req.todo, {colors: true}));

      res.json(req.todo);
    })
    .put(function(req, res) {
      console.log('PUT', util.inspect(req.body, {colors: true}));

      var index = TODOS.indexOf(req.todo);
      var todo = TODOS[index] = req.body;

      res.json(todo);
    })
    .delete(function(req, res) {
      console.log('DELETE', req.todo_id);

      var index = TODOS.indexOf(req.todo);
      TODOS.splice(index, 1);

      res.json(req.todo);
    });

  return router;
};

