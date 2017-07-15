import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BeerDetailComponent } from './beer-detail.component';
import { BeerDetailRoutingModule } from './beer-detail-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BeerDetailRoutingModule
  ],
  declarations: [
    BeerDetailComponent
  ]
})
export class BeerDetailModule { }
