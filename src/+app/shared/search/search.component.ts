import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleService} from '../google.service';
import { ModelService } from '../model/model.service';

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

  constructor(public router:Router,public geo:GoogleService,public model:ModelService) {}

  ngOnInit() {
     // TODO Capture query and store to search.service.ts
  }

  doBeerSearch() {
    if (this.qBeerSearch.length) {
      console.log('lawlz',this.qBeerSearch);
      this.router.navigate(['beers'],{queryParams:{q:encodeURI(this.qBeerSearch)}});
    }
  }

  doBarSearch() {
    
    if (this.qBarSearch.length) {

      if (this.barOption === 'name')
        this.router.navigate(['bar/'+this.geoBar.place_id]);

      if (this.barOption === 'city') {
        console.log('geo',this.geoBar);
        this.router.navigate(['bars/'+this.geoBar.terms[0].value+'/'+this.geoBar.terms[1].value]);
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
        this.router.navigate(['breweries/'+this.geoBrewery.terms[0].value+'-'+this.geoBrewery.terms[1].value]);        
      }
      
      /*
      if (this.breweryOption == 'city') {
        this.router.navigate(['breweries/'
                             +this.geoBrewery.terms[0].value
                             +'/'+this.geoBrewery.terms[1].value
                             +'/'+this.geoBrewery.place_id]);
        
      }
      */
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
        navigator.geolocation.getCurrentPosition(resp=>{

        console.log('geo',resp);

        this.geo.placesAutocomplete(inputVal,resp.coords.latitude,resp.coords.longitude).subscribe(resp=>{
          
          this.barNamePredictions = resp.results;
          //console.log('resp lat lng',resp.results);
        },error=>{
          console.log('error',error);
        });

        },error=>{
          console.log(error);
        });
      } else {
      
        this.geo.placesAutocomplete(inputVal).subscribe(resp=>{
          
          this.barNamePredictions = resp.results;
          console.log('resp',resp);
        },error=>{
          console.log('error',error);
        });
      
      }
    }

    if (this.searchOption === "city") {
      console.log('city serch');
      
      this.geo.cityAutoComplete(inputVal).subscribe(resp=>{
        
        this.cityPredictions = resp.predictions;
        console.log('resp',resp);
      },error=>{
        console.log('error',error);
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
