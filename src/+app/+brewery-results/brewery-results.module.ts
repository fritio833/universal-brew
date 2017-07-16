import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BreweryResultsComponent } from './brewery-results.component';
import { BreweryResultsRoutingModule } from './brewery-results-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BreweryResultsRoutingModule
  ],
  declarations: [
    BreweryResultsComponent
  ]
})
export class BreweryResultsModule { }
