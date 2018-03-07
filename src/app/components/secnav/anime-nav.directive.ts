import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';
import {animate, AnimationBuilder, AnimationMetadata, style} from '@angular/animations';

/*Function which generates animation using builder
* Step 1: add Show class to element
* Step 2: call animation to expand menu
* Step 3: destroy element
* Step 4: call animation to collapse menu
* Step 5: remove class Show from element
* */

@Directive({
  selector: '[appAnimeNav]',
  inputs: ['appAnimeNav']
})
export class AnimeNavDirective implements OnChanges {

  appAnimeNav: boolean;

  // starting class and styles
  className = 'show';
  styleExpanded = [{'height': '*'}, {opacity: 1}];
  styleCollapsed = [{'height': '0px'}, {opacity: 0}];

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private _builder: AnimationBuilder) {

  }

  makeAnimation(element: any, anime: AnimationMetadata[], checkToggleState: boolean) {

    if (checkToggleState) {
      this.renderer.addClass(this.el.nativeElement, this.className);
    }

    /* Making builder after class is added */
    const builder = this._builder.build(anime).create(element);
    builder.play();

    /* Removing show class and clean builder*/
    builder.onDone(() => {
      if (!checkToggleState) {
        this.renderer.removeClass(this.el.nativeElement, this.className);
      }
      builder.destroy();

    });

  }

  /*ngOnChanges is called when toggle trigger is changing*/
  ngOnChanges() {

    if (this.appAnimeNav) {
      this.makeAnimation(this.el.nativeElement, [
        style(this.styleCollapsed),
        animate('200ms ease-in', style(this.styleExpanded))
      ], true);
    }
    if (!this.appAnimeNav) {
      this.makeAnimation(this.el.nativeElement, [
        style(this.styleExpanded),
        animate('200ms ease-out', style(this.styleCollapsed))
      ], false);
    }
  }

}
