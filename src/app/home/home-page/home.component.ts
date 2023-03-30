import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '@ionic/angular';
import { ArticleCard } from '../articles/articles.component';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponentPage implements OnInit {
latestArticls:ArticleCard[]=[
  {name:'test1', text: 'article1 text',img:'/assets/img/logo.png',_id:''},
  {name:'test2', text: 'article2 text',img:'/assets/img/logo.png',_id:''},
  {name:'test3', text: 'article3 text',img:'/assets/img/logo.png',_id:''},
  {name:'test4', text: 'article4 text',img:'/assets/img/logo.png',_id:''},
]
  ios: boolean;

  constructor(public config: Config) { 

  }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
  }


}
