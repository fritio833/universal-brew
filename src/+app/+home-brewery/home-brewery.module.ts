import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeBreweryComponent } from './home-brewery.component';
import { HomeBreweryRoutingModule } from './home-brewery-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HomeBreweryRoutingModule
  ],
  declarations: [
    HomeBreweryComponent
  ]
})
export class HomeBreweryModule { }
