import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GetappComponent } from './getapp.component';
import { GetappRoutingModule } from './getapp-routing.module';

@NgModule({
  imports: [
    SharedModule,
    GetappRoutingModule
  ],
  declarations: [
    GetappComponent
  ]
})
export class GetappModule { }
