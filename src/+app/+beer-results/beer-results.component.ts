import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ModelService } from '../shared/model/model.service';

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

  constructor(public model: ModelService,public router:Router,private route:ActivatedRoute) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    
    this.subscription = this.route.queryParams.subscribe((queryParam:any)=>{
      this.qBeer = queryParam['q'];
      this.universalInit(queryParam['q']);
      /*
      if (queryParam['p'] == null)
        this.currentPage = 1;
      else
        this.currentPage = queryParam['p'];

      console.log('page',this.currentPage);
      */
      //this.doBeerSearch();
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
    this.router.navigate(['beers'],{
      queryParams:{q:encodeURI(this.qBeer),p:page}
    });    
  }  

  universalInit(beerName) {
    this.model.get('/api/beers_by_name/?name='+beerName).subscribe(data => {
      //this.data = data;
      console.log('get beers',data);
      if (!data.error) {
        this.beers = data.data;
        this.numPages = data.numberOfPages;
        this.totalResults = data.totalResults;        
      }
    });
  }

}
