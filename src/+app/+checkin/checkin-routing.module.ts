import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CheckinComponent } from './checkin.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'checkin/:checkId', component: CheckinComponent }
    ])
  ]
})
export class CheckinRoutingModule { }
