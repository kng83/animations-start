import {Component, OnInit} from '@angular/core';
import {MyAnime} from './rect.animation';

@Component({
  selector: 'app-rect',
  templateUrl: './rect.component.html',
  animations: [MyAnime.trigger('divState')]
})
export class RectComponent {
  state = 'normal';

  onAnimate() {
    this.state === 'normal'
      ? this.state = 'highlighted'
      : this.state = 'normal';
  }

  animationStarted(event: Event) {
    console.log(event);
  }

  animationEnded(event: Event) {
    console.log(event);
  }

}
