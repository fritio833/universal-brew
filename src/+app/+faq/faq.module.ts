import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FaqRoutingModule
  ],
  declarations: [
    FaqComponent
  ]
})
export class FaqModule { }
