import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class CommonService {

  FBAppId = '1034295406675441';
  AppName = 'Brew Search';
  AppAuthor = 'Brew Search Team';
  WebSite = 'BrewSearchApp.com';

  constructor() { }

  showHalfStar(rating) {
    //console.log(rating);
    if((rating % 1) > 0.4)
      return true;
    else
      return false;
  }

  getSiteName() {
    return this.WebSite;
  }

  getFBAppId() {
    return this.FBAppId;
  }

  getAppName() {
    return this.AppName;
  }

  getAuthor() {
    return this.AppAuthor;
  }

  getGoogleThumbs(photoId) {

  }

  getToGoogleMapsUrl(lat,lng) {
    return 'http://maps.google.com/?q='+lat+','+lng;    
  }

  getGoogleImg(photo_ref,width?) {
    var _width = 500;
    if (width != null)
      _width = width;

    return 'https://maps.googleapis.com/maps/api/place/photo?photoreference='+photo_ref+'&maxwidth='+_width+'&key='+environment.google.googlePlacesAPIKey;
  }

  paramSEOFriendly(paramName) {
    /*
    let param = paramName.replace(/[^a-zA-Z0-9\s]+/g,""); // Remove Special Characters
    param = param.replace(/\s+/g,"-"); // replace spaces with hyphen
    return param.toLowerCase();
    */
    return paramName.toLowerCase().replace(/[^a-z0-9À-ž]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');    
  }

  revertSEOParam(param) {
    let paramArray = param.split("-");
    let state = '';
    let city = '';
    state = paramArray.pop();
    city = paramArray.join("-");
    city = city.replace(/\-/g," ");
    return this.titleCase(city) + "," + state.toUpperCase();
  }

  titleCase(str) {
    str = str.toLowerCase();
    str = str.split(" ");
    str = str.map(function(val){
      val = val.charAt(0).toUpperCase() + val.slice(1);
      return val;
    });
    str = str.join(" ");
    return str;
  }  

  dateFriendly(dateStr) {
    var dateTemp = dateStr.split(" ");
    var dateFormat = dateTemp[0].split("-");
    return dateFormat[1]+'/'+dateFormat[2]+'/'+dateFormat[0];
  }
  
  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =  month + '/'+date + '/' + year;
    return time;
  }

  defaultOGMetaTags() {
    let metaTags = {
      site_name:'BrewSearcApp.com',
      type:'website',
      title:'Find Beers, Bars, and Breweries!',
      description:'A great description.',
      url:'https://brewsearchapp.com',
      image:'https://firebasestorage.googleapis.com/v0/b/bender-1487426215149.appspot.com/o/img%2FBrewSearchOG.jpg?alt=media&token=44ce4c8b-06f1-4e4b-ab30-80e10363b865'
    };
    return metaTags;
  }

  getDefaultNoImage() {
    return 'https://firebasestorage.googleapis.com/v0/b/bender-1487426215149.appspot.com/o/img%2FBrewSearchOG.jpg?alt=media&token=44ce4c8b-06f1-4e4b-ab30-80e10363b865';
  }

  getBaseUrl() {
    if (Zone.current.get("originUrl")) {
        return Zone.current.get('originUrl');
    } else if (location) {
        return location.origin;
    } else {
        return '';
    }
  }

  getAbsoluteUrl(router) {
    let baseUrl = this.getBaseUrl();

    if (baseUrl.length) {
      return baseUrl + router.url;
    } else {
      return '';
    }
  }

  getBasePage(router) {
    let bPage = router.url.replace(/\?/g,"/").split('/');
    
    if (bPage.length > 1)
      return bPage[1]
    else
      return null;

  }

  timeDifference(previous, short?) {

    
    if (previous == null)
      return '';

    let current = new Date().getTime();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var checkOne;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {

        if (short)
          return Math.round(elapsed/1000) + 's';
        else {
         checkOne = Math.round(elapsed/1000);
         if (checkOne == 1)
           return Math.round(elapsed/1000) + ' second ago';
         else
           return Math.round(elapsed/1000) + ' seconds ago';
        }  
    }

    else if (elapsed < msPerHour) {

         if (short)
           return Math.round(elapsed/msPerMinute) + 'm';
         else {
          checkOne = Math.round(elapsed/msPerMinute) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerMinute)  + ' minute ago';
          else
            return Math.round(elapsed/msPerMinute) + ' minutes ago';           
         }              
    }

    else if (elapsed < msPerDay ) {

         if (short)
           return Math.round(elapsed/msPerHour ) + 'h';
        else {
          checkOne = Math.round(elapsed/msPerHour) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerHour )  + ' hour ago';
          else
            return Math.round(elapsed/msPerHour ) + ' hours ago';            
        }
              
    }

    else if (elapsed < msPerMonth) {
        if (short)
          return Math.round(elapsed/msPerDay) + 'd';
        else {
          checkOne = Math.round(elapsed/msPerDay) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerDay)  + ' day ago';
          else
            return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
        } 
    }

    else if (elapsed < msPerYear) {
        if (short)
          return Math.round(elapsed/msPerMonth) + 'mo';
        else {
          checkOne = Math.round(elapsed/msPerMonth) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerMonth)  + ' month ago';
          else
            return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';           
        }
            
    }

    else {
        if (short)
          return Math.round(elapsed/msPerYear ) + 'yr';
        else {
          checkOne = Math.round(elapsed/msPerYear) ;
          if (checkOne == 1)
            return Math.round(elapsed/msPerYear)  + ' year ago';
          else
            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';           
        }
            
    }
  }  

}
