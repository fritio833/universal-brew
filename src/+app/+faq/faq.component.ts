import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'faq',
  styleUrls: [ './faq.component.css' ],
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  data: any = {};
  constructor(public model: ModelService) {

  }

}
