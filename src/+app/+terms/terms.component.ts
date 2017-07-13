import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'terms',
  styleUrls: [ './terms.component.css' ],
  templateUrl: './terms.component.html'
})
export class TermsComponent {
  data: any = {};
  constructor(public model: ModelService) {

  }

}
