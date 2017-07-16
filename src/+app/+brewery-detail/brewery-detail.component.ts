import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ModelService } from '../shared/model/model.service';
import { CommonService } from '../shared/common.service';
import { Meta } from '../../angular2-meta';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'brewery-detail',
  styleUrls: [ './brewery-detail.component.css' ],
  templateUrl: './brewery-detail.component.html'
})
export class BreweryDetailComponent  {

  data: any = {};
  beer = [];
  randomBeers = [];
  subscription:Subscription;
  pageURL:string;
  showLoader:boolean = true;
  brewery:any;

  constructor(public model: ModelService,              
              public router:Router,
              public common:CommonService,
              public meta:Meta,
              private route:ActivatedRoute) {

    this.route.params.subscribe(params=>{
      this.showLoader = true;
      this.getBrewery(params['id']);
      this.pageURL = this.common.getAbsoluteUrl(this.router);
    });

  }

  setMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = this.brewery['name'];
    let pageDescription = '';
    
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
    }


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

  getBrewery(breweryId) {
    
    this.model.get('/api/brewery_detail/'+breweryId).subscribe(pub => {
    
      if (!pub.error) {
        this.brewery = pub.data;
        console.log('brewery',this.brewery);
        this.setMeta();
        //console.log('beer',this.beer);
      }
      this.showLoader = false;
    });    
      
  }

}