import { Directive, ElementRef, Renderer2, Output, EventEmitter, Input, OnInit } from '@angular/core';


/* @Directive to drop down menu */
@Directive({
  selector: '[dropToggle]'
})
export class DropDownDirective implements OnInit {
  @Input('dropToggle') set dropToggle(value: boolean) {
    if (value) {
      this.renderer.addClass(this.el.nativeElement, this.className);
      this.saveState = true;
    }
    if (!value) {
      this.renderer.removeClass(this.el.nativeElement, this.className);
    }
  }

  @Output() dropToggleChange = new EventEmitter<boolean>()

  // dropToggle: boolean;
  saveState = false;
  // starting class and styles
  className = 'show';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.listen('document', 'click', () => {
      if (this.saveState == false) {
        this.dropToggleChange.emit(false);
      }
      this.saveState = false;

    })
  }
}
