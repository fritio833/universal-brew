import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AgmCoreModule } from '@agm/core';

import { ApiService } from './api.service';
import { ModelService } from './model/model.service';
import { GoogleService } from './google.service';
import { CommonService } from './common.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FacebookComponent } from './facebook/facebook.component';
import { LoaderComponent } from './loader/loader.component';
import { RatingComponent } from './rating/rating.component';
import { StaticMapComponent } from './static-map/static-map.component';

const MODULES = [
  // Do NOT include UniversalModule, HttpModule, or JsonpModule here
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
  /*,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyAKs0BGHgtV5I--IvIwsGkD3c_EFV0yXtY'
  })
  */   
];

const PIPES = [
  // put pipes here
];

const COMPONENTS = [
  // put shared components here
  FooterComponent,
  HeaderComponent,
  SearchComponent,
  PaginationComponent,
  ReadMoreComponent,
  FacebookComponent,
  LoaderComponent,
  RatingComponent,
  StaticMapComponent
];

const PROVIDERS = [
  ModelService,
  ApiService,
  GoogleService,
  CommonService
]

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
