import { HostListener, ContentChildren, Directive, ElementRef, Input, Renderer } from '@angular/core';

import { ActiveTriggerDirective } from './active-trigger.directive';

// Directive decorator
@Directive({ 
    selector: '[activeListener]',
})

// Directive class
export class ActiveListenerDirective {

    @ContentChildren('activeTrigger') items;
    @Input() activeListener:string;
    triggers: ActiveTriggerDirective[] = [];

    constructor(public el: ElementRef, public renderer: Renderer) {}    

    add(trigger:ActiveTriggerDirective) {
      this.triggers.push(trigger);
    }

    show(id:string) {
            
      for (var i = 0; i < this.triggers.length; i++) {

         if (this.triggers[i].id == id) {
           //console.log("YOLO");
           this.renderer.setElementStyle(this.triggers[i].el.nativeElement,'background-color','#ec971f');
         } else {
           this.renderer.setElementStyle(this.triggers[i].el.nativeElement,'background-color','#C81B02');
         }
      }        
    }

    ngOnInit() {        
      if (this.activeListener != 'home')
        this.renderer.setElementStyle(this.el.nativeElement,'background','none');
    }
    

}