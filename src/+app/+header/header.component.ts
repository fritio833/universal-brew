import { Component } from '@angular/core';
import { isBrowser } from 'angular2-universal';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  ngAfterViewInit(){
    
    if (isBrowser) {
      $('.navbar-nav>a').on('click', function(){
          $('.navbar-collapse').collapse('hide');
      });

      $('.navbar-brand').on('click', function(){
          $('.navbar-collapse').collapse('hide');
      });
    }
  } 
}