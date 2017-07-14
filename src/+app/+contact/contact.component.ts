import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'contact',
  styleUrls: [ './contact.component.css' ],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  data: any = {};
  constructor(public model: ModelService) {

  }

}
