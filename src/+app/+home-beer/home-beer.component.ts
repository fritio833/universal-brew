import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { Meta } from '../../angular2-meta';
import { ModelService } from '../shared/model/model.service';
import { CommonService } from '../shared/common.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'home-beer',
  styleUrls: [ './home-beer.component.css' ],
  templateUrl: './home-beer.component.html'
})
export class HomeBeerComponent {

  featuredBeer:any;
  randomBeers:any;
  showLoader:boolean = true;
  
  constructor(public model: ModelService, public meta: Meta, public common: CommonService) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.setMeta();

    this.model.get('/api/featured').subscribe(featured=>{
      //console.log('featured',featured);

      if ("data" in featured) {
        this.featuredBeer = featured['data'].beer;
      }
      //console.log('beer',this.featuredBeer);

      this.model.get('/api/random_beers').subscribe(random=>{
        //console.log('random',random);
        if ("data" in random) {
          this.randomBeers = random['data'];
        }
        //console.log('random',random);
        this.showLoader = false;        
      },error=>{
        console.log(error);
      });

      
    },error=>{
      console.log(error);
    });
  }

  setMeta() {
    let metaTags = [];
    let metaTagsWithFB = [];
    let keywords = [];
    let pageTitle = `Find Beers | ${this.common.getAppName()}`;
    
    this.meta.setTitle(pageTitle);
    metaTags.push({name:'author', content:this.common.getAuthor()});
    metaTags.push(
      {
        name:'description', 
        content:`Find which pub services your favorite beer, introduce new craft beers, and discover new local breweries with an App that's fun and easy to use.`
      }
    );

    metaTags.push({
      name:'keywords', content:`brews, craft beers, best beers, beer festivals, local beers, import beers, brewery, draft beers, pubs, bars`
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
