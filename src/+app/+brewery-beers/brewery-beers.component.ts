import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Meta } from '../../angular2-meta';
import { CommonService } from '../shared/common.service';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'brewery-beers',
  styleUrls: [ './brewery-beers.component.css' ],
  templateUrl: './brewery-beers.component.html'
})
export class BreweryBeersComponent {

  showLoader:boolean = false;
  subscription:Subscription;
  breweryBeers = [];
  breweryDdBeers = [];
  limit:number = 20;
  showMoreBeers:boolean = false;
  brewery:any;
  page:number = 1;
  pageURL:string;

  constructor(public model: ModelService, 
              public meta:Meta,
              public router:Router,
              public route:ActivatedRoute,
              public common:CommonService) {
    //this.getMeta();

    this.route.params.subscribe(params=>{
      this.showLoader = true;
      console.log('paramId',params['breweryId']);
      this.getBreweryBeers(params['breweryId']);
      this.pageURL = this.common.getAbsoluteUrl(this.router);
    });    

  }

  getBreweryBeers(breweryId) {

    this.model.get('/api/brewery_beers/'+breweryId).subscribe(beers=>{
      console.log('beers',beers);

      this.breweryDdBeers = beers.data;
    
      if (this.breweryDdBeers.length > this.limit) {
        this.showMoreBeers = true;

        for (let i=0; i < this.limit; i++ )
          this.breweryBeers.push(this.breweryDdBeers[i]);

      } else {
        this.showMoreBeers = false;
        this.breweryBeers = this.breweryDdBeers;
      }

      this.model.get('/api/brewery_detail/'+breweryId).subscribe(brewery => {
        console.log('brewery',brewery);
        this.brewery = brewery.data;
        this.showLoader = false;
      },error=>{
        console.log(error);
      });

    },error=>{
      console.log(error);
    });
    /*
    this.beerAPI.loadBreweryBeers(breweryId).subscribe(beers=>{
      console.log('beers',beers);
      //this.breweryBeers = beers.data;

      this.breweryDdBeers = beers.data;
    
      if (this.breweryDdBeers.length > this.limit) {
        this.showMoreBeers = true;

        for (let i=0; i < this.limit; i++ )
          this.breweryBeers.push(this.breweryDdBeers[i]);

      } else {
        this.showMoreBeers = false;
        this.breweryBeers = this.breweryDdBeers;
      }
       

      this.beerAPI.loadBreweryById(breweryId).subscribe(brewery=>{
        console.log('brewery',brewery);
        this.brewery = brewery.data;
        this.showBeers = true;
      },error=>{
        console.log(error);
      });      
    },error=>{
      console.log(error);
    });
    */
  }

  getMoreBeers() {
    this.page++;
    let offset = this.page * this.limit;
    let beerLimit;

    if ( (this.breweryDdBeers.length - offset) < this.limit ) {
      this.showMoreBeers = false;
      beerLimit = this.breweryDdBeers.length;
    } else {
      beerLimit = this.limit + offset;
    }

    console.log('beer limit',beerLimit);
    console.log('offset',offset);
    console.log('beer len',this.breweryDdBeers.length);

    for (var i = offset; i < beerLimit; i++) {
      this.breweryBeers.push(this.breweryDdBeers[i]);
    }
    
  }  

  getMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = `Frequently Asked Questions | ${this.common.getAppName()}`;
    
    this.meta.setTitle(pageTitle);
    metaTags.push({name:'author', content:this.common.getAuthor()});
    metaTags.push(
      {
        name:'description', 
        content:`All common questions and answers regarding our beer application.`
      }
    );

    metaTags.push({
      name:'keywords', content:`faq, frequently asked quetions, brew search quetions`
    });

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

}
