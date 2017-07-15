import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'terms',
  styleUrls: [ './beer-detail.component.css' ],
  templateUrl: './beer-detail.component.html'
})
export class BeerDetailComponent {
  data: any = {};
  constructor(public model: ModelService) {

  }

}
