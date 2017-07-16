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

  constructor(public model: ModelService,
              public router:Router,
              public common:CommonService,
              public meta:Meta,
              private route:ActivatedRoute) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    
    this.subscription = this.route.queryParams.subscribe((queryParam:any)=>{
      this.qBrewery = queryParam['q'];
      
      this.showLoader = true;
      this.msg = null;
      if (queryParam['p'] == null) {
        this.currentPage = 1;
        this.isLocationSearch = false;
      } else
        this.currentPage = queryParam['p'];

      this.getBreweries(this.qBrewery,this.currentPage);
      
    });    
  }

  setMeta() {
    let metaTags = [];
    let metaTagsWithFB = [];
    let keywords = [];
    let pageTitle = `Beers matching ${this.qBrewery} | ${this.common.getAppName()}`;
    let pageDescription = '';
    
    this.meta.setTitle(pageTitle);
    metaTags.push({name:'author', content:this.common.getAuthor()});
    metaTags.push(
      {
        name:'description', 
        content:`Use our custom search to find new craft beers using our web and mobile app. At Brew Search, you can share beers, breweries, and bars socially. Brews and craft beers that match '${this.qBrewery}'.`
      }
    );    


    metaTags.push({
      name:'keywords', content:`${this.qBrewery},brews, craft beers, best beers, local beers, import beers`
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

  getBreweries(breweryName,page?) {

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
