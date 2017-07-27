import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeBarComponent } from './home-bar.component';
import { HomeBarRoutingModule } from './home-bar-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HomeBarRoutingModule
  ],
  declarations: [
    HomeBarComponent
  ]
})
export class HomeBarModule { }
