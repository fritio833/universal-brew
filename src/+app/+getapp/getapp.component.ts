import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'getapp',
  styleUrls: [ './getapp.component.css' ],
  templateUrl: './getapp.component.html'
})
export class GetappComponent {
  data: any = {};
  constructor(public model: ModelService) {

  }

}
