import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BeerResultsComponent } from './beer-results.component';
import { BeerResultsRoutingModule } from './beer-results-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BeerResultsRoutingModule
  ],
  declarations: [
    BeerResultsComponent
  ]
})
export class BeerResultsModule { }
