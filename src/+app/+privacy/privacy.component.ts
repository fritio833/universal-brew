import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'privacy',
  styleUrls: [ './privacy.component.css' ],
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent {
  data: any = {};
  constructor(public model: ModelService) {

  }

}
