import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeBeerComponent } from './home-beer.component';
import { HomeBeerRoutingModule } from './home-beer-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HomeBeerRoutingModule
  ],
  declarations: [
    HomeBeerComponent
  ]
})
export class HomeBeerModule { }
