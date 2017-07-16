import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BreweryDetailComponent } from './brewery-detail.component';
import { BreweryDetailRoutingModule } from './brewery-detail-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BreweryDetailRoutingModule
  ],
  declarations: [
    BreweryDetailComponent
  ]
})
export class BreweryDetailModule { }
