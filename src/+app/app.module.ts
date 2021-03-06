import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { HomeModule } from './+home/home.module';
import { HomeBeerModule } from './+home-beer/home-beer.module';
import { HomeBreweryModule } from './+home-brewery/home-brewery.module';
import { HomeBarModule } from './+home-bar/home-bar.module';
import { AboutModule } from './+about/about.module';
import { TodoModule } from './+todo/todo.module';
import { GetappModule } from './+getapp/getapp.module';
import { FaqModule } from './+faq/faq.module';
import { PrivacyModule } from './+privacy/privacy.module';
import { TermsModule } from './+terms/terms.module';
import { ContactModule } from './+contact/contact.module';
import { BeerResultsModule } from './+beer-results/beer-results.module';
import { BeerDetailModule } from './+beer-detail/beer-detail.module';
import { BreweryResultsModule } from './+brewery-results/brewery-results.module';
import { BreweryDetailModule } from './+brewery-detail/brewery-detail.module';
import { BreweryLocationModule } from './+brewery-location/brewery-location.module';
import { BreweryBeersModule } from './+brewery-beers/brewery-beers.module';
import { FeedsModule } from './+feeds/feeds.module';
import { CheckinModule } from './+checkin/checkin.module';
import { PlaceResultsModule } from './+place-results/place-results.module';
import { PlaceModule } from './+place/place.module';

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
    HomeBeerModule,
    HomeBarModule,
    HomeBreweryModule,
    AboutModule,
    TodoModule,
    AppRoutingModule,
    GetappModule,
    FaqModule,
    PrivacyModule,
    TermsModule,
    ContactModule,
    BeerResultsModule,
    BeerDetailModule,
    BreweryResultsModule,
    BreweryDetailModule,
    BreweryLocationModule,
    BreweryBeersModule,
    FeedsModule,
    CheckinModule,
    PlaceResultsModule,
    PlaceModule
  ]
})

export class AppModule {
}

export { AppComponent } from './app.component';
