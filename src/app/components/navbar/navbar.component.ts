import {Component, OnInit} from '@angular/core';
import * as anime from './navbar.animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: anime.animation
})
export class NavbarComponent implements OnInit {
  showMenu = false;
  state = 'collapsed';
  classChanger = false;

  constructor() {
  }

  ngOnInit() {
  }

  /* function is checking if menu is collapsed or expanded. She change
   * value of showMenu which triggers change of animation.
   * Event ensures that collapsing occurs faster
   * than removing a CSS class show.
   */

  onAnimate(event: any) {
    if (event && event.toState === 'collapsed') {
      this.showMenu = false;
      return;
    }

    if (this.showMenu === false) {
      this.state = 'expanded';
      this.showMenu = true;
      return;
    }

    if (this.showMenu === true && !event) {
      this.state = 'collapsed';
      return;
    }

  }

}
