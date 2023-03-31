import { Component, ViewChild, OnInit } from '@angular/core';
import { Config } from '@ionic/angular';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponentPage implements OnInit {

  ios: boolean;

  constructor(public config: Config) { 

  }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
  }

}
