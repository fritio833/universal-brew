import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation  } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import * as $ from 'jquery';

import { Router } from '@angular/router';
import { GoogleService} from '../google.service';
import { ModelService } from '../model/model.service';
import { CommonService } from '../common.service';


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
  public barOption:string = "name";
  public breweryOption:string = "name";
  public searchOption:string = "name";
  public breweryPlaceHolder = "Enter Brewery Name";
  public beerStorage:any;
  public cityPredictions = [];
  public barNamePredictions = [];
  public geoBrewery:any;
  public geoBar:any;
  public qName = "";
  public tabActive:boolean;

  constructor(public router:Router,
              public geo:GoogleService,
              public com:CommonService,
              public model:ModelService) {}

  ngOnInit() {

     // TODO Capture query and store to search.service.ts
    if (isBrowser) {
      $(document).on('click', '.nav-item a', function (e) {
          $(".nav").find(".active").removeClass("active");
          $(this).parent().addClass('active');
      });
    }
  }

  doBeerSearch() {
    if (this.qBeerSearch.length) {
      console.log('lawlz',this.qBeerSearch);
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
        console.log('geo name',this.geoBar);
      }
      if (this.barOption === 'city') {
        console.log('geo',this.geoBar);
        this.router.navigate(['bars/'+this.com.paramSEOFriendly(this.geoBar.terms[0].value+' '+this.geoBar.terms[1].value)]);
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
      }

      if (this.breweryOption == 'city') {
        this.router.navigate(['breweries/'+this.com.paramSEOFriendly(this.geoBrewery.terms[0].value+' '+this.geoBrewery.terms[1].value)]);        
      }
    }    
  }

  setGeoData(geo,searchType) {
    
 
    if (searchType == 'brewery') {
      this.geoBrewery = geo;
      this.qBrewerySearch = this.geoBrewery.description;
      this.cityPredictions = [];
    }
    
    if (searchType == 'bar-name') {
      this.geoBar = geo;
      this.qBarSearch = this.geoBar.name;
      this.barNamePredictions = [];      
    }

    if (searchType == 'bar-city') {
      this.geoBar = geo;
      this.qBarSearch = this.geoBar.description;
      this.cityPredictions = [];      
    }    
    //console.log(this.geoBrewery);
  }

  getBarSearchInput(inputVal){

    console.log('inputval',inputVal);

    if (this.searchOption === "name") {

      if (navigator.geolocation) {
        //console.log('geo');
        
        navigator.geolocation.getCurrentPosition(resp=>{

          console.log('geo',resp);
          
          this.model.get('/google/bar_auto/'+inputVal+'/'+resp.coords.latitude+'/'+resp.coords.longitude)
            .subscribe(resp=>{
            console.log('resp',resp);
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

    if (this.searchOption === "city") {
      console.log('city serch');
      
      this.model.get('/google/city_auto/'+inputVal).subscribe(resp=>{
        console.log('resp',resp);
        this.cityPredictions = resp.predictions;
      },error=>{
        console.log(error);
      });
      
    }    
  }

  getBrewerySearchInput(inputVal) {

    if (this.searchOption == "city" && inputVal.length > 2) {

      this.model.get('/google/city_auto/'+inputVal).subscribe(resp=>{
        console.log('resp',resp);
        this.cityPredictions = resp.predictions;
      },error=>{
        console.log(error);
      });
      /*
      this.geo.cityAutoComplete(inputVal).subscribe(resp=>{
        
        this.cityPredictions = resp.predictions;
        console.log('resp',resp);
      },error=>{
        console.log('error',error);
      });
      */
    }
  }

  setSearchOptions(searchType,option) {

    this.searchOption = option;

    if (searchType === 'brewery') {
      this.qBrewerySearch = '';
      switch(option) {
        case 'city': 
          this.breweryPlaceHolder = 'Enter City to begin your search';
          if (this.qBrewerySearch != null )
            this.getBrewerySearchInput(this.qBrewerySearch);          
          break;
        case 'name': 
          this.breweryPlaceHolder = 'Enter Brewery Name'; 
          break;
        default: break;
      }
      this.breweryOption = option;
    }

    if (searchType === 'bar') {
      this.qBarSearch = '';
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
    }
  }  
}
