import {animate, state, style, transition, trigger, AnimationTriggerMetadata} from '@angular/animations';


// const second rectangle
const secondRectangle = trigger('divState', [    // stan poczatkowy
  state('normal',
    style({
      'background-color': '#002881',
      transform: 'translateX(0)'
    })),
  state('highlighted',
    style({
      'background-color': 'violet',
      transform: 'translateX(100px)'
    })),
  transition('normal <=> highlighted', animate(300))
]);

export const animation: AnimationTriggerMetadata [] = [secondRectangle];

