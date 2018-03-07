import {animate, state, style, transition, trigger, AnimationTriggerMetadata} from '@angular/animations';


// const second rectangle
const navBar = trigger('navState', [    // stan poczatkowy
  state('collapsed',
    style({
      'height': '0px',
       opacity : 0
    })),
  state('expanded',
    style({
     'height': '*',
      opacity: 1
    })),
  transition('collapsed => expanded', animate('200ms ease-in')),
  transition('expanded => collapsed', animate('200ms ease-out'))
]);

export const animation: AnimationTriggerMetadata [] = [navBar];

