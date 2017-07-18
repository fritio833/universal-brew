import {Component,  EventEmitter, Input, Output, OnInit} from '@angular/core';
import { CommonService } from '../common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'static-map',
  templateUrl: './static-map.component.html',
  styleUrls: ['./static-map.component.css']  
})

export class StaticMapComponent implements OnInit {


    @Input() lat: number;
    @Input() lng: number;
    @Input() width: number;
    @Input() height: number;
    @Input() zoom:number;

    currentLat:number;
    currentLng:number;
    currentWidth:number;
    currentHeight:number;
    currentZoom:number;    

    constructor(public common:CommonService) {

    }

  getStaticMap() {
    let _width = 400;
    let _height = 400;
    let _zoom = 18;

    if(this.currentWidth!=null)
      _width = this.currentWidth;

    if(this.currentHeight!=null)
      _height = this.currentHeight;

    if(this.currentZoom!=null)
      _zoom = this.currentZoom;        

    return "https://maps.googleapis.com/maps/api/staticmap?zoom="
            +_zoom
            +"&size="
            +_width+"x"+_height
            +"&maptype=roadmap&markers=color:red%7C"+
            this.currentLat+","
            +this.currentLng
            +"&key="
            +environment.google.googleStaticMapAPIKey;
  }    

    ngOnInit() {
        this.currentLat = this.lat;
        this.currentLng = this.lng;
        this.currentWidth = this.width;
        this.currentHeight = this.height;
        this.currentZoom = this.zoom;           
    }
}