import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaceComponent } from './place.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'bar/:SEO/:id', component: PlaceComponent },
      { path: 'bar/:id', component: PlaceComponent }
    ])
  ]
})
export class PlaceRoutingModule { }
