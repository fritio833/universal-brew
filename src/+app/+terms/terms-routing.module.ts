import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TermsComponent } from './terms.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'terms', component: TermsComponent }
    ])
  ]
})
export class TermsRoutingModule { }
