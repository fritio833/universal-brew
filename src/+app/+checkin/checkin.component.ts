import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ModelService } from '../shared/model/model.service';
import { CommonService } from '../shared/common.service';
import { Meta } from '../../angular2-meta';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'checkin',
  styleUrls: [ './checkin.component.css' ],
  templateUrl: './checkin.component.html'
})
export class CheckinComponent {

  checkin:any;
  nextToken:string;
  showLoader:boolean = true;
  user:any;
  pageURL:string;

  constructor(public model: ModelService,
              public router:Router,
              public route:ActivatedRoute,
              public meta:Meta,
              public common:CommonService) {

    this.route.params.subscribe(params=>{
      this.showLoader = true;
      this.getCheckin(params['checkId']);
      this.pageURL = this.common.getAbsoluteUrl(this.router);
    });

  }


  getCheckin(checkId) {
    this.model
      .get('/firebase/checkin/'+checkId)
      .subscribe(check => {
        //console.log('checkin',check);
        this.checkin = check;

        this.model
          .get('/firebase/user/'+this.checkin.uid)
          .subscribe(resp=>{
            this.user = resp;
            this.showLoader = false;
            //console.log('user',resp);
            this.setMeta();
          });
    });    
  }


  setMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = "";
    let pageDescription = null;
    
    metaTags.push({name:'author', content:this.common.getAuthor()});
    keywords.push(this.checkin.beerName);

    if ("name" in this.checkin) {
      keywords.push(this.checkin.name);
      keywords.push(this.checkin.name + ' '+this.checkin.beerName);
      keywords.push(this.checkin.name + ' '+this.checkin.city+ ' '+this.checkin.state);
      pageTitle = "Checked in " + this.checkin.beerName + " at " + this.checkin.name;
      pageDescription = 'Come out and try ' + this.checkin.beerName +' brewed by '+this.checkin.breweryName+'. '+this.checkin.name+' currently serves this beer located in '+this.checkin.city+', '+this.checkin.state+'.';
    } else {
      pageTitle = "Checked in " + this.checkin.beerName;
      pageDescription = 'Try this wonderful beer ' + this.checkin.beerName +' brewed by '+this.checkin.breweryName;
    }

    if ("breweryName" in this.checkin)
      keywords.push(this.checkin.breweryName);

    if ("beerStyleName" in this.checkin)
      keywords.push(this.checkin.beerStyleName);

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
    metaTags.push({name:'fb:app_id', content:this.common.getFBAppId()});
    metaTags.push({name:'og:site_name', content:this.common.getSiteName()});
    metaTags.push({name:'og:type', content:"website"});
    metaTags.push({name:'og:title', content:pageTitle});
    metaTags.push({name:'og:description', content:pageDescription});
    metaTags.push({name:'og:url', content:this.pageURL});

    if ("img" in this.checkin) {
      metaTags.push({name:'og:image', content:this.checkin.img});
    } else if ("beerLabels" in this.checkin) {
      metaTags.push({name:'og:image', content:this.checkin.beerLabels.large});
    } else if ("photo" in this.checkin) {
      metaTags.push({name:'og:image', content:this.checkin.photo});
    } else if ("breweryImages" in this.checkin) {
      metaTags.push({name:'og:image', content:this.checkin.breweryImages.squareLarge});
    } else
      metaTags.push({name:'og:image', content:this.common.getDefaultNoImage()});


    this.meta.addTags(metaTags);
  
  }

}
