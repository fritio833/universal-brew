import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ModelService } from '../shared/model/model.service';
import { CommonService } from '../shared/common.service';
import { Meta } from '../../angular2-meta';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'beer-detail',
  styleUrls: [ './beer-detail.component.css' ],
  templateUrl: './beer-detail.component.html'
})
export class BeerDetailComponent  {

  data: any = {};
  beer = [];
  randomBeers = [];
  subscription:Subscription;
  pageURL:string;
  showLoader:boolean = true;

  constructor(public model: ModelService,              
              public router:Router,
              public common:CommonService,
              public meta:Meta,
              private route:ActivatedRoute) {

    this.route.params.subscribe(params=>{
      this.showLoader = true;
      this.getBeer(params['id']);
      this.pageURL = this.common.getAbsoluteUrl(this.router);
    });

  }

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

  getBeer(beerId) {
    
    this.model.get('/api/beer_detail/'+beerId).subscribe(beer => {
    
      if (!beer.error) {
        this.beer = beer.data;
        this.setMeta();
        //console.log('beer',this.beer);
        if ("style" in this.beer) {
          this.model.get('/api/random_beer_by_style/'+this.beer['style'].id).subscribe(ranBeer => {
             this.randomBeers = ranBeer.data;
             this.showLoader = false; 
          });
        } else {
          this.showLoader = false;
        }
      }
    });    
      
  }

}