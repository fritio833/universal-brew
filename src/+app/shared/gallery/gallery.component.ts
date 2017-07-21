import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  @Input() photos = [];
  _photos = [];
  locationPhotoThumbs = [];
  photoCount:number = 0;
  photosToLoad = [];
  showPhotoLoader:boolean = false;
  hidePhotos:boolean = false;  

  constructor(private elementRef: ElementRef, public com:CommonService) { }

  ngOnInit() {
    this._photos = this.photos;
    //console.log('refKes',this._photos); 

    for (var i=0; i < this._photos.length;i++) {

      this.locationPhotoThumbs.push(this._photos[i].photo_reference);          
    }

    this.photoCount = this._photos.length;       
  }

  loadSinglePhoto() {
    //this.showPhotoLoader = true;
    this.photosToLoad.push(this.com.getGoogleImg(this.locationPhotoThumbs.pop()));
  }

  toggleHidePhotos() {
    if (!this.hidePhotos)
      this.hidePhotos = true;
    else
      this.hidePhotos = false;
  }  

}
