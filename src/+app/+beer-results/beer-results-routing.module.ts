import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BeerResultsComponent } from './beer-results.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'beers', component: BeerResultsComponent }
    ])
  ]
})
export class BeerResultsRoutingModule { }
