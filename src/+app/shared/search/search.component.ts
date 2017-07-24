import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer  } from '@angular/core';
import { isBrowser } from 'angular2-universal';

import { ActivatedRoute, Params, Router } from '@angular/router';

//import * as $ from 'jquery';

import { GoogleService} from '../google.service';
import { ModelService } from '../model/model.service';
import { CommonService } from '../common.service';
import { SearchCacheService } from '../search-cache.service';
import { CacheService } from '../cache.service';


//declare var $:any;


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,  
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public qBeerSearch:string;
  public qBarSearch:string;
  public qBrewerySearch:string;
  public msg:string = "";
  public barPlaceHolder = "Enter Bar Name";
  public barOption:string;
  public breweryOption:string;
  public breweryPlaceHolder = "Enter Brewery Name";
  public beerStorage:any;
  public cityPredictions = [];
  public barNamePredictions = [];
  public geoBrewery:any;
  public geoBar:any;
  public qName = "";
  public tabActive:boolean;
  public lastSearch:string;
  public beerStore:any;
  public breweryStore:any;
  public barStore:any;
  public breweryBtnDisabled:boolean = true;
  public beerBtnDisabled:boolean = true;
  public barBtnDisabled:boolean = true;

  //public page:string;
  @Input() showTabs: string;
  @Input() page:string;
  public showBoxShadow:boolean = false;

  constructor(public router:Router,
              public geo:GoogleService,
              public com:CommonService,
              public route:ActivatedRoute,
              public el: ElementRef, 
              public renderer: Renderer,
              public cache: SearchCacheService,
              public model:ModelService) {}

  ngOnInit() {

    this.setSearchOptions('bar','city');
    this.setSearchOptions('brewery','city');

    
    this.beerStore =  this.cache.getBeer();
    this.breweryStore = this.cache.getBrewery();
    this.barStore = this.cache.getBar();

    // Override defaults if use searched 
    if (this.beerStore != null) {
      this.qBeerSearch = this.beerStore.q;
      if (this.qBeerSearch!=null)
        this.beerBtnDisabled = false;
    }

    if (this.breweryStore != null) {
      this.qBrewerySearch= this.breweryStore.q;
      this.breweryOption = this.breweryStore.opt;
      this.geoBrewery = this.breweryStore.geo;
      
      if (this.geoBrewery!=null && this.breweryOption=='city')
        this.breweryBtnDisabled = false;

      if (this.qBrewerySearch!=null && this.breweryOption=='name')
        this.breweryBtnDisabled = false;        
    }

    if (this.barStore != null) {
      this.qBarSearch= this.barStore.q;
      this.barOption = this.barStore.opt;
      this.geoBar = this.barStore.geo;  

      if (this.geoBar!=null && this.barOption=='city')
        this.barBtnDisabled = false;

      if (this.qBarSearch!=null && this.barOption=='name')
        this.barBtnDisabled = false;          
    }

    this.lastSearch = this.cache.getLastSearch();

    this.setView();

    // User either opened a new tab or back link
    // We populate the query and option
    if (this.lastSearch == null && this.page!='home')
      this.setInputQuery();
    
  }

  setInputQuery() {
    let page = this.com.getBasePage(this.router);
    //console.log('wut',page);
    switch(page){
      case 'breweries':
        //console.log('route',this.route);
        if ("locationKey" in this.route.snapshot.params) {
          this.breweryOption = "city";
          this.qBrewerySearch = this.com.revertSEOParam(this.route.snapshot.params['locationKey']);
        }  
        if ("q" in this.route.snapshot.queryParams) {
          this.breweryOption = "name";
          this.qBrewerySearch =  this.route.snapshot.queryParams['q'];
        }
      break;

      case 'beers':
        this.qBeerSearch = this.route.snapshot.queryParams['q'];
      break;

      case 'bars':

      break;
    }
  }
  

  setView() {

    let page = this.com.getBasePage(this.router);
    
    switch(page) {
      case '':
      case 'home':
          this.page = 'home';
          break;
      case 'beer':
      case 'beers':
          this.page = 'beer';
          break;
      case 'b':
      case 'brewery':
      case 'breweries':
          this.page = 'brewery';
          break;
      case 'bar':
      case 'bars':     
          this.page = 'bar';
          break;
          default: this.page = 'notfound'; console.log('page not caught');

    }

  }

  isActive(currentPage) {
    
    //this.page = 'home';
    //console.log('last search',this.lastSearch);
    
    if (this.lastSearch!=null)
      return ( currentPage == this.lastSearch);
    
    if (this.page == currentPage)
      return true;
    else if (this.page == 'home' && currentPage == 'beer')
      return true;
    else
      return false;
  }

  doBeerSearch() {
    if (this.qBeerSearch.length) {
      // console.log('lawlz',this.qBeerSearch);
      //this.cache.set('_beerSearch',_beerSearch);
      this.cache.setBeer(this.qBeerSearch);
      this.router.navigate(['beers'],{queryParams:{q:encodeURI(this.qBeerSearch)}});
    }
  }

  setSearhLabel(placeType,option) {

    if (option == 'city') {
      return 'City, State';
    }

    if (placeType == 'brewery' && option =='name') {
      return 'Brewery Name';
    }

    if (placeType == 'bar' && option =='name') {
      return 'Bar Name';
    }
    return '';
  }

  doBarSearch() {
    
    if (this.qBarSearch.length) {

      if (this.barOption === 'name') {

        this.router.navigate(['bar/'+this.com.paramSEOFriendly(this.geoBar.name),this.geoBar.place_id]);
        //console.log('geo name',this.geoBar);
        this.cache.setBar(this.geoBar.name,this.barOption,this.geoBar);
      }
      if (this.barOption === 'city') {
        let query = this.geoBar.terms[0].value+' '+this.geoBar.terms[1].value;
        this.router.navigate(['bars/'+this.com.paramSEOFriendly(query)]);
        this.cache.setBar(query,this.barOption,this.geoBar);
      }
    }
  }

  doBrewerySearch() {

    if (this.qBrewerySearch.length) {

      if (this.breweryOption == 'name') {
        this.router.navigate(['breweries'],{
          queryParams:{
            q:encodeURI(this.qBrewerySearch),
            search:this.breweryOption
          }
        });
        this.cache.setBrewery(this.qBrewerySearch,this.breweryOption);
      }

      if (this.breweryOption == 'city') {
        let query = '';
        if (this.geoBrewery!=null)
          query = this.geoBrewery.terms[0].value+' '+this.geoBrewery.terms[1].value;
        else {
          query = this.qBrewerySearch;
        }
        this.router.navigate(['breweries/'+this.com.paramSEOFriendly(query)]);        
        this.cache.setBrewery(query,this.breweryOption,this.geoBrewery);
        this.cityPredictions = [];
      }
    }    
  }

  setGeoData(geo,searchType) {
    
 
    if (searchType == 'brewery') {
      this.geoBrewery = geo;
      this.qBrewerySearch = this.geoBrewery.description;
      this.breweryBtnDisabled = false;
      this.cityPredictions = [];
    }
    
    if (searchType == 'bar-name') {
      this.geoBar = geo;
      this.qBarSearch = this.geoBar.name;
      this.barBtnDisabled = false;
      this.barNamePredictions = [];      
    }

    if (searchType == 'bar-city') {
      this.geoBar = geo;
      this.qBarSearch = this.geoBar.description;
      this.barBtnDisabled = false;
      this.cityPredictions = [];      
    }    
    //console.log(this.geoBrewery);
  }

  getBarSearchInput(inputVal){

    // console.log('inputval',inputVal);

    if (this.barOption === "name") {

      if (navigator.geolocation) {
        //console.log('geo');
        
        navigator.geolocation.getCurrentPosition(resp=>{

          //console.log('geo',resp);
          
          this.model.get('/google/bar_auto/'+inputVal+'/'+resp.coords.latitude+'/'+resp.coords.longitude)
            .subscribe(resp=>{
            //console.log('resp',resp);
            this.barNamePredictions = resp.results;
            //console.log('resp lat lng',resp.results);
          },error=>{
            console.log('error',error);
          });

        },error=>{
          console.log(error);
        });
        
      } else {

        console.log('no geo');
      
      /*
        this.geo.placesAutocomplete(inputVal).subscribe(resp=>{
          
          this.barNamePredictions = resp.results;
          console.log('resp',resp);
        },error=>{
          console.log('error',error);
        });
        */
      }
    }

    if (this.barOption === "city") {
      //console.log('city serch');
      
      this.model.get('/google/city_auto/'+inputVal).subscribe(resp=>{
        //console.log('resp',resp);
        this.cityPredictions = resp.predictions;
      },error=>{
        console.log(error);
      });
      
    }    
  }

  getBeerSearchInput(inputVal) {
    if (inputVal.length > 1)
      this.beerBtnDisabled = false;
    else
      this.beerBtnDisabled = true;
  }

  getBrewerySearchInput(inputVal) {

    if (this.breweryOption == "city" && inputVal.length > 1) {

      this.model.get('/google/city_auto/'+inputVal).subscribe(resp=>{
        console.log('resp',resp);
        this.cityPredictions = resp.predictions;
      },error=>{
        console.log(error);
      });
    }

    if (this.breweryOption == "name") {
      if (inputVal.length > 2)
        this.breweryBtnDisabled = false;
      else
        this.breweryBtnDisabled = true;
    }


  }

  clearStuff (tabName?) {

    if (this.cityPredictions.length) {
      this.cityPredictions = [];
    }

    switch(tabName) {
      case 'brewery': this.qBrewerySearch = null;
            this.breweryBtnDisabled = true;  
            break;
      case 'bar':this.qBarSearch = null;
            break;
      case 'beer':this.qBeerSearch = null;
            this.beerBtnDisabled = true; 
            break;
    }
  }

  setSearchOptions(searchType,option,setDisable?) {

    //this.searchOption = option;
    if (this.cityPredictions.length)
      this.cityPredictions = [];

    if (searchType === 'brewery') {
      this.qBrewerySearch = '';
      switch(option) {
        case 'city': 
          this.breweryPlaceHolder = 'Enter City to begin your search';
          //if (this.qBrewerySearch != null )
          //  this.getBrewerySearchInput(this.qBrewerySearch);         
          break;
        case 'name':
          this.breweryPlaceHolder = 'Enter Brewery Name'; 
          break;
        default: break;
      }
      console.log('setDisabled',setDisable);
      if (setDisable)
        this.breweryBtnDisabled = true;      
      this.breweryOption = option;
    }

    if (searchType === 'bar') {
      this.qBarSearch = '';
      this.barNamePredictions = [];
      switch(option) {
        case 'city': 
          this.barPlaceHolder = 'Enter City to begin your search'; 
          break;
        case 'name': 
          this.barPlaceHolder = 'Enter Bar Name'; 
          break;
        default: break;
      }
      this.barOption = option;
      if (setDisable)
        this.barBtnDisabled = true;       
    }
  }  
}
