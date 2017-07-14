import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeModule } from './+home/home.module';
import { AboutModule } from './+about/about.module';
import { TodoModule } from './+todo/todo.module';
import { GetappModule } from './+getapp/getapp.module';
import { FaqModule } from './+faq/faq.module';
import { PrivacyModule } from './+privacy/privacy.module';
import { TermsModule } from './+terms/terms.module';
import { ContactModule } from './+contact/contact.module';
import { BeerResultsModule } from './+beer-results/beer-results.module';

//import { HeaderComponent } from './+header/header.component';
//import { FooterComponent} from './+footer/footer.component';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, XLargeDirective } from './app.component';


@NgModule({
  declarations: [ 
    AppComponent, 
    XLargeDirective
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
    TermsModule,
    ContactModule,
    BeerResultsModule
  ]
})

export class AppModule {
}

export { AppComponent } from './app.component';
