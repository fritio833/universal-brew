import { OnInit, HostListener, Directive, ElementRef, Input, Renderer } from '@angular/core';

// Directive decorator
@Directive({ 
    selector: '[active]',
})



// Directive class
export class ActiveDirective implements OnInit {

    @Input() active:boolean;

    /*
    @HostListener('click') click() {
      console.log('hello world');
      this.renderer.setElementClass(this.el.nativeElement, 'active', true);
    }
    */
    constructor(public el: ElementRef, public renderer: Renderer) {
      // Use renderer to render the element with styles
    }

    ngOnInit() {
      //console.log('el',this.el.nativeElement);
      //console.log('isActive',this.active);
      if (this.active)
        this.renderer.setElementClass(this.el.nativeElement, 'active', true);        

    }

}