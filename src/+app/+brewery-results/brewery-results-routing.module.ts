import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreweryResultsComponent } from './brewery-results.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'breweries', component: BreweryResultsComponent }
    ])
  ]
})
export class BreweryResultsRoutingModule { }
