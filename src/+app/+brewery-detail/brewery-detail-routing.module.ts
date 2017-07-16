import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreweryDetailComponent } from './brewery-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'brewery/:id', component: BreweryDetailComponent },
      { path: 'brewery/:SEO/:id', component: BreweryDetailComponent }
    ])
  ]
})
export class BreweryDetailRoutingModule { }
