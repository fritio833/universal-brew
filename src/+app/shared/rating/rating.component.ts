import {Component,  EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']  
})

export class RatingComponent implements OnInit {

    range:number = 5;
    @Input() rate: number;
    rateList = [];
    currentRating:number;

    constructor() {
    }

    ngOnInit() {

        this.currentRating = this.rate;

        var _decimal = (this.currentRating + "").split(".");
        var decimal = 0;
        if (_decimal.length == 2) {
          decimal = parseInt(_decimal[1]);
        }

        for (var i=0; i<this.range;i++) {
          this.rateList[i] = 'empty';
        } 

        for (var i=0; i<this.range;i++) {
                       
            if ((i+1) <= this.currentRating)
                this.rateList[i] ='filled';

            if ((i+1) == Math.floor(this.currentRating) && (decimal > 4 && decimal < 8 )) {
              this.rateList[i+1] = 'half';
            } else if ((i+1) == Math.floor(this.currentRating) && (decimal >= 8 ))
              this.rateList[i+1] = 'filled';
        }      
    }
}