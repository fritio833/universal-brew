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
  selector: 'beer-results',
  styleUrls: [ './beer-results.component.css' ],
  templateUrl: './beer-results.component.html'
})

export class BeerResultsComponent {
  qBeer:string;
  data: any = {};
  subscription:Subscription;
  beers = [];
  numPages:number = 0;
  currentPage:number = 1;
  pageSize:number = 50;
  totalResults:number = 0;
  showLoader:boolean = true;
  msg:string;

  constructor(public model: ModelService,
              public router:Router,
              public common:CommonService,
              public meta:Meta,
              private route:ActivatedRoute) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    
    this.subscription = this.route.queryParams.subscribe((queryParam:any)=>{
      this.qBeer = queryParam['q'];
      
      this.showLoader = true;
      this.msg = null;
      if (queryParam['p'] == null)
        this.currentPage = 1;
      else
        this.currentPage = queryParam['p'];

      this.getBeers(this.qBeer,this.currentPage);
      
    });    
  }

  setMeta() {
    let metaTags = [];
    let metaTagsWithFB = [];
    let keywords = [];
    let pageTitle = `Beers matching ${this.qBeer} | ${this.common.getAppName()}`;
    let pageDescription = '';
    
    this.meta.setTitle(pageTitle);
    metaTags.push({name:'author', content:this.common.getAuthor()});
    metaTags.push(
      {
        name:'description', 
        content:`Use our custom search to find new craft beers using our web and mobile app. At Brew Search, you can share beers, breweries, and bars socially. Brews and craft beers that match '${this.qBeer}'.`
      }
    );    


    metaTags.push({
      name:'keywords', content:`${this.qBeer},brews, craft beers, best beers, local beers, import beers`
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

  onNext() {
    console.log('next');
    this.currentPage++;
    
    this.router.navigate(['beers'],{
      queryParams:{q:encodeURI(this.qBeer),p:this.currentPage}
    });
        
  }

  onPrev() {
    console.log('prev');
    this.currentPage--;
    this.router.navigate(['beers'],{
      queryParams:{q:encodeURI(this.qBeer),p:this.currentPage}
    });
  }

  goToPage(page) {
    console.log(page);
    this.currentPage = page;

    this.router.navigate(['beers'],{
      queryParams:{q:encodeURI(this.qBeer),p:this.currentPage}
    });    
  }  

  getBeers(beerName,page?) {
      var _page = '';

      if (page != undefined) {
        _page = '&p='+page; 
      } 

    this.model.get('/api/beers_by_name/?name='+beerName + _page).subscribe(data => {

      if (!data.error) {
        this.beers = data.data;
        //console.log(this.beers);
        this.numPages = data.numberOfPages;
        this.totalResults = data.totalResults;
        this.showLoader = false;

        if (!this.totalResults)
          this.msg = "No beers found with the name '"+this.qBeer+"'.";
      }
      this.setMeta();
      this.showLoader = false;
    });
  }

}
