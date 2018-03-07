import {Component, OnInit} from '@angular/core';
import * as anime from './home.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: anime.animation
})
export class HomeComponent {
  state = 'normal';

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }

  animationStarted(event: Event) {
   // console.log(event);
  }
  animationEnded(event: Event) {
  //  console.log(event);
  }

}
