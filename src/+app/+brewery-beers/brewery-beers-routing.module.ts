import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreweryBeersComponent } from './brewery-beers.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'beer-list/:breweryId/:SEO/beers', component: BreweryBeersComponent }
    ])
  ]
})
export class BreweryBeersRoutingModule { }
