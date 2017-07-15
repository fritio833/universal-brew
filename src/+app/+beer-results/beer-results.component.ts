import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';

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

  constructor(public model: ModelService,
              public router:Router,
              public common:CommonService,
              private route:ActivatedRoute) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    
    this.subscription = this.route.queryParams.subscribe((queryParam:any)=>{
      this.qBeer = queryParam['q'];
      
      
      if (queryParam['p'] == null)
        this.currentPage = 1;
      else
        this.currentPage = queryParam['p'];

      this.getBeers(this.qBeer,this.currentPage);
      
    });    
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
      }
    });
  }

}
