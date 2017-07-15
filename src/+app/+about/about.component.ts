import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Meta } from '../../angular2-meta';

import { CommonService } from '../shared/common.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(@Inject('req') req: any,meta:Meta, comm:CommonService) {
    // console.log('req',  req)
    meta.setTitle('About Us | ' + comm.getAppName());
    meta.addTags([
      {
        name:'author', content:comm.getAuthor()
      },
      {
        name:'keywords', content:'About Us, About Brewery Search'
      },
      {
        name:'description', content:'We are here to help you find beers, bars, breweries, and beer festivals'
      }
    ])     

  }
}
