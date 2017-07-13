import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Meta } from '../../angular2-meta';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(@Inject('req') req: any,meta:Meta) {
    // console.log('req',  req)
    meta.setTitle('About Brew Search');
    meta.addTags([
      {
        name:'author', content:'Ryan Fried'
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
