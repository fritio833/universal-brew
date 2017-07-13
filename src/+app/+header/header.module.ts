import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header.component';
//import { AboutRoutingModule } from './about-routing.module';



@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent
  ]
})
export class HeaderModule { }
