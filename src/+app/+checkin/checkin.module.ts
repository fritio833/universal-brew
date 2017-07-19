import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CheckinComponent } from './checkin.component';
import { CheckinRoutingModule } from './checkin-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CheckinRoutingModule
  ],
  declarations: [
    CheckinComponent
  ]
})
export class CheckinModule { }
