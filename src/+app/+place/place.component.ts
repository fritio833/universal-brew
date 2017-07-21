import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ModelService } from '../shared/model/model.service';
import { CommonService } from '../shared/common.service';
import { Meta } from '../../angular2-meta';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'place-detail',
  styleUrls: [ './place.component.css' ],
  templateUrl: './place.component.html'
})
export class PlaceComponent  {

  data: any = {};
  subscription:Subscription;
  pageURL:string;
  showLoader:boolean = true;
  location:any;
  placeTypes = [];
  locationPhotosArray = [];
  locationPhotos = [];
  showPhotos:boolean = false;
  locationPhoto:string;
  photoCount:number = 0;
  locationPrimaryPhoto:string = null;
  photosToLoad = [];
  showPhotoLoader:boolean = false;
  hidePhotos:boolean = false;

  constructor(public model: ModelService,              
              public router:Router,
              public common:CommonService,
              public meta:Meta,
              private route:ActivatedRoute) {


    this.route.params.subscribe(params=>{
      this.showLoader = true;
      this.getPlaceDetail(params['id']);
      this.pageURL = this.common.getAbsoluteUrl(this.router);
    });
  }

  getPlaceDetail(placeId) {

    this.model.get('/google/place_by_id/'+placeId).subscribe(place=>{
      console.log('place',place);

      this.location = place;
      this.showLoader = false;
      
      
      if ("photos" in this.location) {
        this.locationPhoto = this.common.getGoogleImg(this.location.photos[0].photo_reference,230);

        this.photoCount = this.location.photos.length;

      }

      for (var i=0; i < this.location.types.length; i++) {
        if (this.location.types[i]!='establishment' && this.location.types[i]!='point_of_interest')
          this.placeTypes.push(this.location.types[i]);
      }
      this.setMeta();     
    },error=>{
      console.log(error);
    });

  }

  setMeta() {
  
    let metaTags = [];
    let keywords = [];
    let pageTitle = this.location['name'];
    let pageDescription = `Check out photos, beers list, and details of ${this.location['name']}. Brew Search helping people find beers, breweries, and bars around the world.`;
    
    metaTags.push({name:'author', content:this.common.getAuthor()});
    keywords.push(this.location['name']);
    keywords.push('bar');
    keywords.push('bars');
    keywords.push('reviews');


    pageTitle += ' | ' + this.common.getAppName();
    this.meta.setTitle(pageTitle);

    metaTags.push(
      {
        name:'description', 
        content:pageDescription
      }
    );    


    metaTags.push({
      name:'keywords', content:keywords.join(", ")
    });

    // Facebook Tags
    metaTags.push({name:'fb:app_id', content:this.common.getFBAppId()});
    metaTags.push({name:'og:site_name', content:this.common.getSiteName()});
    metaTags.push({name:'og:type', content:"website"});
    metaTags.push({name:'og:title', content:pageTitle});
    metaTags.push({name:'og:description', content:pageDescription});
    metaTags.push({name:'og:url', content:this.pageURL});

    metaTags.push({name:'og:image', content:this.common.getDefaultNoImage()});


    this.meta.addTags(metaTags);
    
  }


}