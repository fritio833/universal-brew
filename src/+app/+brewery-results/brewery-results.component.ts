import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Meta } from '../../angular2-meta';

import { ModelService } from '../shared/model/model.service';
import { CommonService } from '../shared/common.service';

declare var $:any;

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'brewery-results',
  styleUrls: [ './brewery-results.component.css' ],
  templateUrl: './brewery-results.component.html'
})

export class BreweryResultsComponent {
  qBrewery:string;
  qLocation:string;
  lat:number;
  lng:number;
  data: any = {};
  subscription:Subscription;
  isLocationSearch:boolean = false;
  beers = [];
  breweries = [];
  numPages:number = 0;
  currentPage:number = 1;
  pageSize:number = 50;
  totalResults:number = 0;
  showLoader:boolean = true;
  msg:string;
  city:string;
  state:string;  

  constructor(public model: ModelService,
              public router:Router,
              public common:CommonService,
              public meta:Meta,
              public route:ActivatedRoute) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    
    this.subscription = this.route.queryParams.subscribe((queryParam:any)=>{
      this.qBrewery = queryParam['q'];

      if (this.qBrewery!=null) {
        this.showLoader = true;
        this.msg = null;
        if (queryParam['p'] == null) {
          this.currentPage = 1;
          this.isLocationSearch = false;
        } else
          this.currentPage = queryParam['p'];

        this.getBreweriesByName(this.qBrewery,this.currentPage);
      }
    });

    this.route.params.subscribe((params:any)=>{

      var locationKey = params['locationKey'];

      if (locationKey != null) {
        this.isLocationSearch = true;
        this.getBreweriesByLocation(params['locationKey']);
      }
    });  
  }

  setMeta() {
    let metaTags = [];
    let metaTagsWithFB = [];
    let keywords = [];
    let pageTitle = '';
    let pageDescription = '';
    
    metaTags.push({name:'author', content:this.common.getAuthor()});

    if (this.isLocationSearch && this.city!=null) {
      pageTitle = `${this.city}, ${this.state} Breweries | ${this.common.getAppName()}`;
      metaTags.push(
        {
          name:'description', 
          content:`Find breweries, tasting rooms, micro breweries, and brew pubs in ${this.city}, ${this.state}. At Brew Search, you can share beers, breweries, and bars socially. Listed are breweries located in '${this.city}, ${this.state}'.`
        }
      );    

      metaTags.push({
        name:'keywords', content:`${this.city} breweries,breweries in ${this.city}, ${this.city} brew pubs, brewery in ${this.city}, ${this.city} microbrewery, ${this.state} breweries`
      });

    } else {
      pageTitle = `Breweries matching ${this.qBrewery} | ${this.common.getAppName()}`;
      metaTags.push(
        {
          name:'description', 
          content:`Find breweries, tasting rooms, micro breweries, and brew pubs using our web or mobile app. At Brew Search, you can share beers, breweries, and bars socially. Listed are breweries that match '${this.qBrewery}'.`
        }
      );    

      metaTags.push({
        name:'keywords', content:`${this.qBrewery},${this.qBrewery} brewery, ${this.qBrewery} tasting room, breweries, microbrewery, brew pubs, `
      });
    }

    this.meta.setTitle(pageTitle);

    // Facebook Tags
    let defaultFB = this.common.defaultOGMetaTags();
    metaTags.push({name:'fb:app_id', content:this.common.getFBAppId()});
    metaTags.push({name:'og:site_name', content:defaultFB.site_name});
    metaTags.push({name:'og:type', content:defaultFB.type});
    metaTags.push({name:'og:title', content:defaultFB.title});
    metaTags.push({name:'og:description', content:defaultFB.description});
    metaTags.push({name:'og:url', content:defaultFB.url});
    metaTags.push({name:'og:image', content:defaultFB.image});
    
    this.meta.addTags(metaTags);
  }  

  onNext() {
    console.log('next');
    this.currentPage++;
    
    this.router.navigate(['breweries'],{
      queryParams:{q:encodeURI(this.qBrewery),p:this.currentPage}
    });
        
  }

  onPrev() {
    console.log('prev');
    this.currentPage--;
    this.router.navigate(['breweries'],{
      queryParams:{q:encodeURI(this.qBrewery),p:this.currentPage}
    });
  }

  goToPage(page) {
    console.log(page);
    this.currentPage = page;

    this.router.navigate(['breweries'],{
      queryParams:{q:encodeURI(this.qBrewery),p:this.currentPage}
    });    
  }  

  getBreweriesByLocation(location) {

    //let checkHasHyphenReg= new RegExp("-");
    //let checkHasHyphen = checkHasHyphenReg.test(location);
    //console.log('no hyphen',checkHasHyphen);

    let locKey = this.common.revertSEOParam(location);
    //console.log('locKey',locKey);
    let cityStateArray = locKey.split(","); 
    this.qLocation = locKey;
    this.showLoader = true;

    if (cityStateArray.length == 2) {
      this.city = cityStateArray[0];
      this.state = cityStateArray[1];
    }

    this.model.get('/google/city_auto/'+locKey).subscribe(resp=>{

      if (resp.predictions.length) {
        this.model.get('/google/place_by_id/'+resp.predictions[0].place_id).subscribe(place=>{

          this.lat = place.geometry.location.lat;
          this.lng = place.geometry.location.lng;

          this.model.get('/api/brewery_by_location/'+this.lat+'/'+this.lng).subscribe(breweries=>{
            //console.log('api',breweries);
            if (!breweries.totalResults) {
              this.msg = "No breweries in "+this.qLocation+".";
              this.breweries = [];
              this.showLoader = false;
              this.setMeta();
            } else {
              this.msg = null;
              this.breweries = [];
              //this.breweries = breweries.data;
              for (var i = 0; i < breweries.data.length; i++) {
                breweries.data[i].brewery.type = breweries.data[i].locationTypeDisplay;
                breweries.data[i].brewery.locId = breweries.data[i].id;
                breweries.data[i].brewery.locality = breweries.data[i].locality;
                breweries.data[i].brewery.region = breweries.data[i].region;
                this.breweries.push(breweries.data[i].brewery);
              }
              this.numPages = breweries.numberOfPages;
              this.totalResults = breweries.totalResults;
              this.showLoader = false;
              this.setMeta();              
              //console.log('this.breweries',this.breweries);
            }          
          });
        });
      }
    },error=>{
      console.log(error);
    });
  }

  getBreweriesByName(breweryName,page?) {

    var _page = '';

    if (page != undefined) {
      _page = '&p='+page; 
    } 

    
    this.model.get('/api/breweries_by_name/?name='+breweryName + _page).subscribe(data => {

      if (!data.error) {
        console.log('data',data);
        this.breweries = data.data;
        this.numPages = data.numberOfPages;
        this.totalResults = data.totalResults;
        this.showLoader = false;
        //console.log('breweries',this.breweries);

        if (!this.totalResults)
          this.msg = "No breweries found with the name '"+this.qBrewery+"'.";
      }
      this.setMeta();
      this.showLoader = false;
    });
  }

}
