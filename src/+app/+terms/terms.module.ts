import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TermsRoutingModule
  ],
  declarations: [
    TermsComponent
  ]
})
export class TermsModule { }
