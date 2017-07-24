import { HostListener, HostBinding, Directive, ElementRef, Input, Renderer } from '@angular/core';
import { ActiveListenerDirective } from './active-listener.directive';
// Directive decorator
@Directive({ 
    selector: '[activeTrigger]',
})



// Directive class
export class ActiveTriggerDirective {

    @Input('activeTrigger') id:string;
    @Input() tabActive = false;

    
    @HostListener('click') click() {
      //this.renderer.setElementClass(this.el.nativeElement, 'active', true);
      this.tabContainer.show(this.id);
    }

    /*
    @HostBinding ('class.active') get selected() {
      return this.tabActive;
    }
    */

    constructor(public el: ElementRef, public renderer: Renderer,private tabContainer:ActiveListenerDirective) {
      // Use renderer to render the element with styles
      this.tabContainer.add(this);
    }


    /*
    ngOnInit() {
      
      //console.log('el',this.el.nativeElement);
      //console.log('isActive',this.active);
      //if (this.t-active)
      //this.renderer.setElementClass(this.el.nativeElement, 'active', true);        

    }
    */

}