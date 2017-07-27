import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBreweryComponent } from './home-brewery.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'find-breweries', component: HomeBreweryComponent }
    ])
  ]
})
export class HomeBreweryRoutingModule { }
