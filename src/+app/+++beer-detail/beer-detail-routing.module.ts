import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeerDetailComponent } from './beer-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'beer/:SEO/:id', component: BeerDetailComponent }
    ])
  ]
})
export class BeerDetailRoutingModule { }
