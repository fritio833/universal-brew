import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer.component';
//import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FooterComponent
  ]
})
export class FooterModule { }
