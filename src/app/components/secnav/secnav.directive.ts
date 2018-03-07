import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, Output, EventEmitter} from '@angular/core';
import {animate, AnimationBuilder, AnimationMetadata, style} from '@angular/animations';


/*Example usage of directive*/

/*  <div
    [appToggle]= "{toggle:showElement,
    classToggle: ['show','change-back'],
    toggleStyleCollapse: {'backgroundColor':'red'},
    toggleStyleExpand: [{'backgroundColor':'blue'}]
    }" (onExpand)="onDone($event);classChanger=$event"
    class="collapse navbar-collapse"
  >*/

interface InputStyle {
  [key: string]: string | number;
}

interface InputArg {
  toggle: boolean;
  classToggle: string[];
  toggleStyleCollapse: InputStyle[];
  toggleStyleExpand: InputStyle[];

}

@Directive({
  selector: '[appToggle]',
})
export class SecnavDirective implements OnChanges, OnInit {
  @Input() appToggle: InputArg = {
    toggle: false,
    classToggle: [''],
    toggleStyleCollapse: [],
    toggleStyleExpand: []
  };

  @Output() onExpand = new EventEmitter<boolean>();

  // starting class and styles
  className = ['show'];
  styleExpanded: InputStyle[] = [{'height': '*'}, {opacity: 1}];
  styleCollapsed: InputStyle[] = [{'height': '0px'}, {opacity: 0}];


  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private _builder: AnimationBuilder) {

  }

  /* ngOnInit is checking first state of structure which isa attached to
  *  [appToggle] attribute. When some of are no attached the default value
  *  will be picked
  *  Adding style from html context example:
  *  <div
  *  [appToggle]= "{toggle:showElement,
  *  classToggle:'show',
  *  toggleStyleCollapse: {'backgroundColor':'red'},
  *  toggleStyleExpand: [{'backgroundColor':'blue'}]}"
  *  class="collapse navbar-collapse">
  *  */

  ngOnInit() {
    // add new class
    if (this.appToggle.classToggle !== undefined) {
      this.className = [...this.className, ...this.appToggle.classToggle];
    }

    if (this.appToggle.toggleStyleExpand !== undefined &&
      this.appToggle.toggleStyleCollapse !== undefined) {
      this.styleExpanded = [...this.styleExpanded, ...this.appToggle.toggleStyleExpand];
      this.styleCollapsed = [...this.styleCollapsed, ...this.appToggle.toggleStyleCollapse];
    }
  }

  /*Function which generates animation using builder
  * Step 1: add Show class to element
  * Step 2: call animation to expand menu
  * Step 3: destroy element
  * Step 4: call animation to collapse menu
  * Step 5: remove class Show from element
  * */
  makeAnimation(element: any, anime: AnimationMetadata[], checkToggleState: boolean) {

    if (checkToggleState) {
      this.className.forEach((className) => {
        this.renderer.addClass(this.el.nativeElement, className);
      });
    }

    /* Making builder after class is added */
    const builder = this._builder.build(anime).create(element);
    builder.play();

    /* Removing show class and clean builder*/
    builder.onDone(() => {
      if (!checkToggleState) {
        this.className.forEach((className) => {
          this.renderer
            .removeClass(this.el.nativeElement, className);
        });
        // collapsing
        this.onExpand.emit(false);
        builder.destroy();
        return;
      }

      // expand
      this.onExpand.emit(true);
      builder.destroy();

    });

  }

  /*ngOnChanges is called when toggle trigger is changing*/
  ngOnChanges() {

    if (this.appToggle.toggle) {
      this.makeAnimation(this.el.nativeElement, [
        style(this.styleCollapsed),
        animate('200ms ease-in', style(this.styleExpanded))
      ], true);
    }
    if (!this.appToggle.toggle) {
      this.makeAnimation(this.el.nativeElement, [
        style(this.styleExpanded),
        animate('200ms ease-out', style(this.styleCollapsed))
      ], false);
    }
  }

}
