import {Component,  EventEmitter, Input, Output, OnInit} from '@angular/core';
import { CommonService } from '../common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'beer-block',
  templateUrl: './beer-block.component.html',
  styleUrls: ['./beer-block.component.css']  
})

export class BeerBlockComponent implements OnInit {


    @Input() beer: any;
    @Input() brewery: any;
    @Input() showBreweryName: boolean = true;
    @Input() showDescription: boolean = true;

    _beer:any;
    _brewery:any;
    _showBreweryName:boolean;
    _showDescription:boolean;

    constructor(public common:CommonService) {

    }  

    ngOnInit() {
        this._beer = this.beer;
        this._brewery = this.brewery;
        this._showBreweryName = this.showBreweryName;
        this._showDescription = this.showDescription;
    }
}