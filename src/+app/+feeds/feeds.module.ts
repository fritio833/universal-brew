import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FeedsComponent } from './feeds.component';
import { FeedsRoutingModule } from './feeds-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FeedsRoutingModule
  ],
  declarations: [
    FeedsComponent
  ]
})
export class FeedsModule { }
