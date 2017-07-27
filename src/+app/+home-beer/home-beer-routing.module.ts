import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBeerComponent } from './home-beer.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'find-beers', component: HomeBeerComponent }
    ])
  ]
})
export class HomeBeerRoutingModule { }
