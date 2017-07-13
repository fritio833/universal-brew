import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GetappComponent } from './getapp.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'getapp', component: GetappComponent }
    ])
  ]
})
export class GetappRoutingModule { }
