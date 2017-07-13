import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeModule } from './+home/home.module';
import { AboutModule } from './+about/about.module';
import { TodoModule } from './+todo/todo.module';
import { GetappModule } from './+getapp/getapp.module';
import { FaqModule } from './+faq/faq.module';
import { PrivacyModule } from './+privacy/privacy.module';
import { TermsModule } from './+terms/terms.module';

import { HeaderComponent } from './+header/header.component';
import { FooterComponent} from './+footer/footer.component';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, XLargeDirective } from './app.component';


@NgModule({
  declarations: [ 
    AppComponent, 
    XLargeDirective,
    HeaderComponent,
    FooterComponent 
  ],
  imports: [
    SharedModule,
    HomeModule,
    AboutModule,
    TodoModule,
    AppRoutingModule,
    GetappModule,
    FaqModule,
    PrivacyModule,
    TermsModule
  ]
})
/*
@NgModule({
  declarations: [ 
    AppComponent, 
    XLargeDirective,
    HeaderComponent,
    FooterComponent 
  ],
  imports: [
    SharedModule,
    HomeModule,
    AboutModule,
    TodoModule,
    AppRoutingModule,
    GetappModule,
    FaqModule,
    PrivacyModule,
    TermsModule
  ]
})
*/
export class AppModule {
}

export { AppComponent } from './app.component';
