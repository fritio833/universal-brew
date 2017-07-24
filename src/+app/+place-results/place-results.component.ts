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
  selector: 'place-results',
  styleUrls: [ './place-results.component.css' ],
  templateUrl: './place-results.component.html'
})

export class PlaceResultsComponent {

  showLoader:boolean = true;
  getMoreLoader:boolean = false;
  qLocation:string;
  locations = [];
  nextToken:string;
  locationKey:string;
  pageURL:string;

  city:string;
  state:string;

  constructor(public model: ModelService,
              public router:Router,
              public common:CommonService,
              public meta:Meta,
              private route:ActivatedRoute) {
    

    this.route.params.subscribe((params:any)=>{

      this.locationKey = params['locationKey'];
      console.log('i got here');

      if (this.locationKey != null) {
        this.getPlacesByLocation(params['locationKey']);
        this.pageURL = this.common.getAbsoluteUrl(this.router);
      }

    });  
  }

  setMeta() {
    let metaTags = [];
    let metaTagsWithFB = [];
    let keywords = [];
    let pageTitle = `Bars in ${this.city}, ${this.state} | ${this.common.getAppName()}`;
    let pageDescription = `Find bars, clubs, pubs, and sports bars in ${this.city}, ${this.state}. At Brew Search, you can share beers, breweries, and bars socially. Listed are bars located in '${this.city}, ${this.state}'.`;
    
    this.meta.setTitle(pageTitle);
    metaTags.push({name:'author', content:this.common.getAuthor()});

    metaTags.push(
      {
        name:'description', 
        content:pageDescription
      }
    );    

    metaTags.push({
      name:'keywords', content:`${this.city} bars,bars in ${this.city}, ${this.city} sports bars, drinks in ${this.city}, places to drink in ${this.city}, ${this.state} bars`
    });

    


    // Facebook Tags
    let defaultFB = this.common.defaultOGMetaTags();
    metaTags.push({name:'fb:app_id', content:this.common.getFBAppId()});
    metaTags.push({name:'og:site_name', content:defaultFB.site_name});
    metaTags.push({name:'og:type', content:defaultFB.type});
    metaTags.push({name:'og:title', content:pageTitle});
    metaTags.push({name:'og:description', content:pageDescription});
    metaTags.push({name:'og:url', content:this.pageURL });
    metaTags.push({name:'og:image', content:defaultFB.image});
    
    this.meta.addTags(metaTags);
  }  

  getMoreLocations() {

    this.getMoreLoader = true;

    this.model.get('/google/search_place_next/'+this.nextToken)
      .subscribe(resp=>{
      console.log('next_resp',resp);

      
      if ("next_page_token" in resp)
        this.nextToken = resp.next_page_token;
      else
        this.nextToken = null;

      //console.log('nextToken',this.nextToken);

      if (resp.results.length) {
        for (var i = 0; i < resp.results.length; i++ ) {
          if ("photos" in resp.results[i])
            resp.results[i]['thumb'] = this.common.getGoogleImg(resp.results[i].photos[0].photo_reference,350);
          else
            resp.results[i]['thumb'] = 'assets/images/no-beer.jpg';

          this.locations.push(resp.results[i]);

        }
      }
      this.getMoreLoader = false;
      
    },error=>{
      console.log(error);
      this.getMoreLoader = false;
    });
  }

  getPlacesByLocation(location) {

    let locKey = this.common.revertSEOParam(location);
    let cityStateArray = locKey.split(","); 
    this.qLocation = locKey;
    this.showLoader = true;

    if (cityStateArray.length == 2) {
      this.city = cityStateArray[0];
      this.state = cityStateArray[1];
    
      let txtSearch = encodeURI('bars in '+this.city+' '+this.state);
      console.log('search st',txtSearch);

      this.model.get('/google/search_place_type/'+txtSearch)
        .subscribe(resp=>{
          console.log('places',resp);

          if (resp.status == "OK") {
            for (let i = 0; i < resp.results.length; i++) {
              if ("photos" in resp.results[i])
                resp.results[i]['thumb'] = this.common.getGoogleImg(resp.results[i].photos[0].photo_reference,350);
              else
                resp.results[i]['thumb'] = 'assets/images/no-beer.jpg';
            }
            this.locations = resp.results;
            this.nextToken = resp.next_page_token;
          }

          this.showLoader = false;
          this.setMeta();

        },error=>{
          console.log(error);
          this.showLoader = false;
        });
    }
  }


}
