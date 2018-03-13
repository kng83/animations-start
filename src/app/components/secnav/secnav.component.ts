import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-secnav',
  templateUrl: './secnav.component.html',
  styleUrls: ['./secnav.component.scss']
})
export class SecnavComponent implements OnInit {
  showElement = false;
  classChanger = false;
  showSecond = false;
  showTestMenu = false;


  constructor() {
  }

  ngOnInit() {
  }

  onDone(value) {
    console.log('animation end', value);
    console.log(this.classChanger);
  }

}
