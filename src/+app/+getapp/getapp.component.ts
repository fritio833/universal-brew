import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Meta } from '../../angular2-meta';
import { CommonService } from '../shared/common.service';

import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'getapp',
  styleUrls: [ './getapp.component.css' ],
  templateUrl: './getapp.component.html'
})
export class GetappComponent {
  data: any = {};
  constructor(public model: ModelService, public meta:Meta, public common:CommonService) {
    this.getMeta();
  }

  getMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = `We have a Beer App! | ${this.common.getAppName()}`;
    
    this.meta.setTitle(pageTitle);
    metaTags.push({name:'author', content:this.common.getAuthor()});
    metaTags.push(
      {
        name:'description', 
        content:`Brew Search will be available soon for Apple iOS and Android mobile devices and phones.`
      }
    );

    metaTags.push({
      name:'keywords', content:`beer app, brewery app, brew app, drinking app, beer search app, pub app`
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
