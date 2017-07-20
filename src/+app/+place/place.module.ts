import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlaceComponent } from './place.component';
import { PlaceRoutingModule } from './place-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PlaceRoutingModule
  ],
  declarations: [
    PlaceComponent
  ]
})
export class PlaceModule { }
