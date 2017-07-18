import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BreweryBeersComponent } from './brewery-beers.component';
import { BreweryBeersRoutingModule } from './brewery-beers-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BreweryBeersRoutingModule
  ],
  declarations: [
    BreweryBeersComponent
  ]
})
export class BreweryBeersModule { }
