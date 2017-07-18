import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreweryLocationComponent } from './brewery-location.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'b/:id', component: BreweryLocationComponent },
      { path: 'b/:SEO/:id', component: BreweryLocationComponent }
    ])
  ]
})
export class BreweryLocationRoutingModule { }
