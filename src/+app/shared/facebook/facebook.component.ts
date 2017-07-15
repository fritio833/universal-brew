import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})

export class FacebookComponent implements OnInit {
  @Input() url: string;
  _linkToFB:string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this._linkToFB = this.url;
    
  }

  btnClick() {

    window.open(`https://www.facebook.com/sharer/sharer.php?u=${this._linkToFB}`, '', 
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false;    
    /*
    window.open("https://www.facebook.com/sharer/sharer.php?u=http://brewsearchapp.com&t=BrewSearch", '', 
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false;
    */ 
  }

  /*
  _btnClick() {
    FB.ui({
      method: 'feed',
      display: 'popup',
      link: 'https://brewsearchapp.com',
      caption: 'YOLO!!!!'
    }, function(response){});
  }
  */
}
