import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';
import { CommonService } from '../shared/common.service';
import { Meta } from '../../angular2-meta';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'feeds',
  styleUrls: [ './feeds.component.css' ],
  templateUrl: './feeds.component.html'
})
export class FeedsComponent {

  feeds = [];
  nextToken:string;
  showLoader:boolean = true;
  pageURL:string;

  constructor(public model: ModelService,public common:CommonService,public meta:Meta) {
    this.getFeeds();
    this.pageURL = this.common.getBaseUrl() + '/feeds';
  }


  getFeeds() {
    this.model
      .get('/firebase/feeds/'+0)
      .subscribe(feed => {
        this.feeds = feed.data;
        this.nextToken = feed.nextToken; 
        this.showLoader = false;
        this.setMeta();
    });    
  }

  setMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = "Brew Search Feeds";
    let pageDescription = "Come see what beers the locals are drinking, popular local breweries, and discover places to drink your favorite brews.";
    
    metaTags.push({name:'author', content:this.common.getAuthor()});
    keywords.push('beers');
    keywords.push('craft beers');
    keywords.push('local beers');
    keywords.push('local brews');
    keywords.push('bars');
    keywords.push('beer feed');

    pageTitle += ' | ' + this.common.getAppName();
    this.meta.setTitle(pageTitle);

    metaTags.push(
      {
        name:'description', 
        content:pageDescription
      }
    );

    metaTags.push({
      name:'keywords', content:keywords.join(", ")
    });

    // Facebook Tags
    let defaultFB = this.common.defaultOGMetaTags();

    metaTags.push({name:'fb:app_id', content:this.common.getFBAppId()});
    metaTags.push({name:'og:site_name', content:this.common.getSiteName()});
    metaTags.push({name:'og:type', content:"website"});
    metaTags.push({name:'og:title', content:pageTitle});
    metaTags.push({name:'og:description', content:pageDescription});
    metaTags.push({name:'og:url', content:this.pageURL});
    metaTags.push({name:'og:image', content:defaultFB.image});



    this.meta.addTags(metaTags);
  
  }

  getMoreFeeds() {
    this.showLoader = true;
    this.model
      .get('/firebase/feeds/'+this.nextToken)
      .subscribe(feed => {
        console.log('feed',feed);

        for (var i =0; i < feed.data.length; i++) {
          this.feeds.push(feed.data[i]);
        }
        this.nextToken = feed.nextToken;
        this.showLoader = false; 
    });
  }

}
