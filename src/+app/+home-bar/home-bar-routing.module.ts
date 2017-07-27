import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeBarComponent } from './home-bar.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'find-bars', component: HomeBarComponent }
    ])
  ]
})
export class HomeBarRoutingModule { }
