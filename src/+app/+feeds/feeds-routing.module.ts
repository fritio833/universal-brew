import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeedsComponent } from './feeds.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'feeds', component: FeedsComponent }
    ])
  ]
})
export class FeedsRoutingModule { }
