import { Component } from '@angular/core';
import * as anime from './animation';
import {MyAnime} from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 animations: anime.animation
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {

    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'higlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event: Event) {
    console.log(event);
  }

  animationEnded(event: Event) {
    console.log(event);
  }
}
