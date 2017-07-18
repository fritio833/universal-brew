import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { ModelService } from '../shared/model/model.service';
import { CommonService } from '../shared/common.service';
import { Meta } from '../../angular2-meta';
import { Http } from '@angular/http';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'brewery-location',
  styleUrls: [ './brewery-location.component.css' ],
  templateUrl: './brewery-location.component.html'
})
export class BreweryLocationComponent  {

  data: any = {};
  beer = [];
  breweryBeers = [];
  breweryPrimary:any;
  subscription:Subscription;
  pageURL:string;
  showPhotos = false;
  showLoader:boolean = true;
  brewery:any;
  locationPhotos = [];
  locationReviews = [];
  locationPrimaryPhoto:string = null;
  locationRating:number = null;
  location = {};
  locationPhotoThumbs = [];

  constructor(public model: ModelService,              
              public router:Router,
              public common:CommonService,
              public meta:Meta,
              public _http:Http,
              private route:ActivatedRoute) {

    this.route.params.subscribe(params=>{
      this.showLoader = true;
      console.log('paramId',params['id']);
      this.getBreweryLocation(params['id']);
      this.pageURL = this.common.getAbsoluteUrl(this.router);
    });

  }

  setMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = this.brewery['name'];
    let pageDescription = null;
    
    metaTags.push({name:'author', content:this.common.getAuthor()});
    keywords.push(this.brewery['name']);

    /*
    if ("style" in this.beer) {
      keywords.push(this.beer['name']+' '+this.beer['style'].shortName);
      keywords.push(this.beer['name']+' '+this.beer['style'].name);
      pageTitle +=  ' ' + this.beer['style'].shortName;
    }

    if ("breweries" in this.beer) {
      keywords.push(this.beer['breweries'][0].name);
      keywords.push('beers in ' + this.beer['breweries'][0].name);
      keywords.push(this.beer['breweries'][0].name + ' beer list');
      pageTitle += ` | ${this.beer['breweries'][0].name}`;
      pageDescription = `View ${this.beer['name']} details, ${this.beer['name']} description, share ${this.beer['name']} with friends, and find beer locations for ${this.beer['name']} brewed by ${this.beer['breweries'][0].name} at Brew Search.`;      
    } else {
      pageDescription = `View ${this.beer['name']} details, ${this.beer['name']} description, share ${this.beer['name']} with friends, and find beer locations for ${this.beer['name']} at Brew Search`; 
    }
    */

    pageTitle += ' | ' + this.common.getAppName();
    this.meta.setTitle(pageTitle);

    if ("description" in this.brewery) {
      metaTags.push(
        {
          name:'description', 
          content:this.brewery['description']
        }
      );
      pageDescription = this.brewery['description'];
    }


    metaTags.push({
      name:'keywords', content:keywords.join(", ")
    });

    // Facebook Tags
    metaTags.push({name:'fb:app_id', content:this.common.getFBAppId()});
    metaTags.push({name:'og:site_name', content:this.common.getSiteName()});
    metaTags.push({name:'og:type', content:"website"});
    metaTags.push({name:'og:title', content:pageTitle});
    metaTags.push({name:'og:description', content:`Check out photos, beers list, and details of ${this.brewery['name']}. Brew Search helping people find beers, breweries, and bars around the world.`});
    metaTags.push({name:'og:url', content:this.pageURL});

    if ("images" in this.brewery) {
      metaTags.push({name:'og:image', content:this.brewery.images.squareLarge});
    }

    this.meta.addTags(metaTags);
  }

  getBreweryLocation(locId) {
    /*
    this.model.get('/api/brewery_location/'+locId).subscribe(pub => {
      console.log('pub',pub);
    });
    */
       
    this.model.get('/api/brewery_location/'+locId).subscribe(pub => {
    
      if (!pub.error) {
        this.brewery = pub.data;
        this.breweryPrimary = this.brewery.brewery;
        console.log('brewery',this.brewery);

        this.model.get('/api/brewery_beers/'+this.brewery.breweryId).subscribe(beers=>{
          this.breweryBeers = beers.data;
          

          this.model.get('/google/place_by_origin/'
            +encodeURIComponent(this.brewery.brewery.name)+'/'
            +this.brewery.latitude+'/'
            +this.brewery.longitude).subscribe(loc=>{
            this.location = loc;

            this.model.get('/google/place_by_id/'+this.location['place_id']).subscribe(place=>{
              console.log('place11',place);
              this.location = place;

              if ("main_img" in this.location) {
                this.locationPrimaryPhoto = this.location['main_img'];
              }

              if ("rating" in this.location) {
                this.locationRating = this.location['rating'];
              }

              if ("photos" in this.location) {
                this.locationPhotos = this.location['photos'];

                for (var i=0; i < this.locationPhotos.length;i++) {
                  this.locationPhotoThumbs.push({
                    src: this.common.getGoogleImg(this.locationPhotos[i].photo_reference,100),
                    refId:this.locationPhotos[i].photo_reference
                  });
                }
              }

              if ("reviews" in this.location) {
                this.locationReviews = this.location['reviews'];
              }

              this.setMeta();

            });
          });          
        });

      }
      this.showLoader = false;
    });    
    
  }

  setPhoto(picId) {
    this.locationPrimaryPhoto = this.common.getGoogleImg(picId,500);
  }
}