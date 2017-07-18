import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BreweryLocationComponent } from './brewery-location.component';
import { BreweryLocationRoutingModule } from './brewery-location-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BreweryLocationRoutingModule
  ],
  declarations: [
    BreweryLocationComponent
  ]
})
export class BreweryLocationModule { }
