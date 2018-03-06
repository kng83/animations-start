import {
  animate, group, keyframes, state, style, transition, trigger,
  AnimationTriggerMetadata, AnimationMetadata, AnimationMetadataType
} from '@angular/animations';



// first rectangle

export class MyAnime implements AnimationTriggerMetadata {
  type: AnimationMetadataType;
  options = null;
  name = 'divState'; // default value

  definitions: AnimationMetadata [] = [
    // stan poczatkowy
    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0)'
    })),
    state('highlighted', style({
      'background-color': 'blue',
      transform: 'translateX(100px)'
    })),
    transition('normal <=> highlighted', animate(300)),
    // transition('highlighted => normal', animate(800)) // wersja z pojedyncza strzalka
  ];

  public static trigger(name: string): AnimationTriggerMetadata {

    const newTrigger = new MyAnime();
    newTrigger.name = name;
    console.log(newTrigger.createTrigger());
    return newTrigger.createTrigger();
  }

  private createTrigger() {
    return trigger(this.name, this.definitions);
  }

}

//
// const rectangle = trigger('divState', [
//   // stan poczatkowy
//   state('normal', style({
//     'background-color': 'red',
//     transform: 'translateX(0)'
//   })),
//   state('highlighted', style({
//     'background-color': 'blue',
//     transform: 'translateX(100px)'
//   })),
//   transition('normal <=> highlighted', animate(300)),
//   // transition('highlighted => normal', animate(800)) // wersja z pojedyncza strzalka
// ]);


// const second rectangle
const secondRectangle =  trigger('wildState', [
  // stan poczatkowy
  state('normal', style({
    backgroundColor: 'red',
    transform: 'translateX(0) scale(1)'
  })),
  state('highlighted', style({
    backgroundColor: 'blue',
    transform: 'translateX(100px) scale(1)'
  })),
  state('shrunken', style({
    backgroundColor: 'green',
    transform: 'translateX(0) scale(0.5)'
  })),

  transition('normal => highlighted', animate(300)),
  transition('highlighted => normal', animate(800)),
  // transition('shrunken <=> *', animate(500, style({
  //   borderRadius: '50px'
  // }))) // zmiana shrunken to any state
  transition('shrunken <=> *', [
    style({
      backgroundColor: 'orange'
    }),
    animate(1000, style({
      borderRadius: '50px'
    })),
    animate(500)
  ])
]);


const list1 =   trigger('list1', [
  // stan poczatkowy
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(-100px)'
    }),
    animate(300)] ), // void jest dla elementu ktory jest add to dom (np *ngFor)
  transition('* => void', [
    animate(300, style({
      transform: 'translateX(100px)',
      opacity: 0
    }))] ), // void jest dla elementu ktory jest add to dom (np *ngFor)
]);


const list2 = trigger('list2', [
  // stan poczatkowy
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    animate(1000, keyframes([ // bez offsetu kazdy krok czas jest dzielony na ilosc elementow
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
        offset: 0

      }),
      style({
        transform: 'translateX(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateX(-20px)',
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateX(0px)',
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition('* => void', [ // metoda group sprawia ze animacje jada wszystkie na raz
    group([
      animate(300, style({
        color: 'red'
      })),
      animate(800, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ])
]);


export const animation: AnimationTriggerMetadata [] = [MyAnime.trigger('divState'), secondRectangle, list1, list2];

