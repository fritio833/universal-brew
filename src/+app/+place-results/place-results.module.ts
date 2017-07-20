import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlaceResultsComponent } from './place-results.component';
import { PlaceResultsRoutingModule } from './place-results-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PlaceResultsRoutingModule
  ],
  declarations: [
    PlaceResultsComponent
  ]
})
export class PlaceResultsModule { }
