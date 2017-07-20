import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaceResultsComponent } from './place-results.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'bars/:locationKey/:token',component: PlaceResultsComponent},
      { path: 'bars/:locationKey',component: PlaceResultsComponent}
    ])
  ]
})
export class PlaceResultsRoutingModule { }
