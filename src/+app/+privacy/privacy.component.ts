import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';
import { Meta } from '../../angular2-meta';
import { CommonService } from '../shared/common.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'privacy',
  styleUrls: [ './privacy.component.css' ],
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent {
  data: any = {};
  constructor(public model: ModelService,public meta:Meta, public common:CommonService) {
    this.getMeta();
  }

  getMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = `Privacy Policy | ${this.common.getAppName()}`;
    
    this.meta.setTitle(pageTitle);
    metaTags.push({name:'author', content:this.common.getAuthor()});
    metaTags.push(
      {
        name:'description', 
        content:`You have to read our Privacy Policy to use our app.`
      }
    );

    metaTags.push({
      name:'keywords', content:`brew search privacy policy, brew search policy, privacy policy`
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
