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
  locationPhotoThumbs = [];
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
      //console.log('place',place);

      this.location = place;
      this.showLoader = false;
      
      
      if ("photos" in this.location) {
        this.locationPhoto = this.common.getGoogleImg(this.location.photos[0].photo_reference,230);

        for (var i=0; i < this.location.photos.length;i++) {

          this.locationPhotoThumbs.push(this.location.photos[i].photo_reference);          
        }
        console.log('thumbs',this.locationPhotoThumbs);
        this.photoCount = this.location.photos.length;

      }

      for (var i=0; i < this.location.types.length; i++) {
        if (this.location.types[i]!='establishment' && this.location.types[i]!='point_of_interest')
          this.placeTypes.push(this.location.types[i]);
      }      
    },error=>{
      console.log(error);
    });

  }

/*
  setMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = this.beer['name'];
    let pageDescription = '';
    
    metaTags.push({name:'author', content:this.common.getAuthor()});
    keywords.push(this.beer['name']);



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

    if ("labels" in this.beer) {
      metaTags.push({name:'og:image', content:this.beer['labels'].medium});
    }

    this.meta.addTags(metaTags);
  }
  */

  setPhoto(picId) {
    this.locationPrimaryPhoto = this.common.getGoogleImg(picId,500);
  }

  loadSinglePhoto() {
    //this.showPhotoLoader = true;
    this.photosToLoad.push(this.common.getGoogleImg(this.locationPhotoThumbs.pop()));
    console.log('photos to load',this.photosToLoad);
  }

  toggleHidePhotos() {
    if (!this.hidePhotos)
      this.hidePhotos = true;
    else
      this.hidePhotos = false;
  }

}