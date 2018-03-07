import {
  animate, state, style, transition, trigger,
  AnimationTriggerMetadata, AnimationMetadata, AnimationMetadataType
} from '@angular/animations';


export class MyAnime implements AnimationTriggerMetadata {
  type: AnimationMetadataType;
  options = null;
  name = 'divState'; // default value

  definitions: AnimationMetadata [] = [

    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0)'
    })),
    state('highlighted', style({
      'background-color': 'blue',
      transform: 'translateX(100px)'
    })),
    transition('normal <=> highlighted', animate(300)),
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

// mozna tak
// export const animation: AnimationTriggerMetadata [] = [MyAnime.trigger('divState')];

