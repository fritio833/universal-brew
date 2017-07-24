import { Component, OnInit } from '@angular/core';
import { isBrowser } from 'angular2-universal';

//import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  ngOnInit() {

    /*  
    if (isBrowser) {
      $('.navbar-nav>a').on('click', function(){
          $('.navbar-collapse').collapse("hide");
      });

      $('.navbar-brand').on('click', function(){
          $('.navbar-collapse').collapse("hide");
      });      

    }
    */
    
  } 
}