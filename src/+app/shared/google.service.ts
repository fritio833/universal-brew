import { Injectable,Inject } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleService {

  public googlePlacesURL:string;
  public geoData:any;

  constructor(private http:Http) { 
    //this.googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/';

    

    if (environment.production)
      this.googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/';
    else
      this.googlePlacesURL = '/maps/';    
  }

  cityAutoComplete(cityName) {
    return this.http.get(this.googlePlacesURL + 'autocomplete/json?input='
        + cityName + "&country=us" 
        + '&types=(cities)&key=' 
        + environment.google.googlePlacesAPIKey)
        .retryWhen(error => error.delay(500))
        .timeout(30000)  
        .map(res => res.json());    
  }

  placePhotos(photoRef,maxWidth?) {

  /*
    if (maxWidth == null)
      maxWidth = 300;

    return this.http.get(this.googlePlacesURL + 'photo?photoreference='
        + photoRef
        + '&maxwidth='+maxWidth+'&key=' + environment.google.googlePlacesAPIKey)
        .retryWhen(error => error.delay(500))
        .timeout(30000);
   */    
  }  

  setPhotoSize(photoRef,width,height) {
    let newSize = 's'+height+'-'+'w'+width;
    return photoRef.replace(/s\d{2,4}-w\d{2,4}/g,newSize);
    //console.log(photoRef.replace(/s\d{2,4}-w\d{2,4}/g,newSize));
  }

  getPlaceByOrigin(name,lat,lng) {
    return this.http.get(this.googlePlacesURL 
        + 'nearbysearch/json?location='
        + lat 
        + ',' 
        + lng
        + '&keyword='
        + name
        +'&rankby=distance&key=' 
        + environment.google.googlePlacesAPIKey)
        .retryWhen(error => error.delay(500))
        .timeout(5000)          
        .map(res => res.json());
  }

  getPlaceFromGoogleByLatLng(placeName,lat,lng) {
    //console.log('brewery',brewery);
    let _placeName = encodeURIComponent(placeName);

    return new Observable(observer=>{
      this.getPlaceByOrigin(_placeName,lat,lng).subscribe(pub=>{
        if (pub.results.length) {
          //Get place detail
          this.placeDetail(pub.results[0].place_id).subscribe(detail=>{
            //console.log('detail',detail);
            observer.next(detail);
          },error=>{
            console.log('error placeDetail',error);    
          });
        } else {
          observer.next(false);
        }
      },error=>{
        console.log('error getPlaceByOrigin',error);
        observer.error(error);
      });      
    });
  }   

  searchByPlaceType(textSearch) {
   

     return this.http.get(this.googlePlacesURL 
        + 'textsearch/json?query='
        + textSearch
        + '&key=' 
        + environment.google.googlePlacesAPIKey)
        .retryWhen(error => error.delay(500))
        .timeout(5000)        
        .map(res => res.json());

  }

    searchByPlaceTypeNextToken(nextToken) {
   
     return this.http.get(this.googlePlacesURL 
        + 'textsearch/json?pagetoken='
        + nextToken
        + '&key=' 
        + environment.google.googlePlacesAPIKey)
        .retryWhen(error => error.delay(500))
        .timeout(5000)        
        .map(res => res.json());
  }

  placeDetail(placeId) {

    return this.http.get(this.googlePlacesURL + 'details/json?placeid='
        + placeId
        + '&key=' + environment.google.googlePlacesAPIKey)
        .retryWhen(error => error.delay(500))
        .timeout(30000)        
        .map(res => res.json());    
  }

  placesAutocomplete(locationName,lat?,lng?) {

    let loc = '';

    if (lat != null && lng != null) {
      loc = '&location='+lat+','+lng;
    }

   /*
    return this.http.get(this.googlePlacesURL + 'autocomplete/json?input='
    	  + locationName
        + loc 
        + '&types=establishment&keyword=bar&radius=500&key=' 
        + environment.google.googlePlacesAPIKey)
        .retryWhen(error => error.delay(100))
        .timeout(5000)        
        .map(res => res.json());
    */
    return this.http.get(this.googlePlacesURL + 'textsearch/json?query='
    	  + locationName
        + loc 
        + '&type=bar&key=' 
        + environment.google.googlePlacesAPIKey)
        .retryWhen(error => error.delay(500))
        .timeout(5000)        
        .map(res => res.json());
    
  }  

  setGeoData(gData) {
    this.geoData = gData;
  } 

}
