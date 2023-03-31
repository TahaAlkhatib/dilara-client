import { Component } from "@angular/core";
import { ArticleCard } from "src/app/model";

@Component({
    selector:'landing',
    templateUrl:'landing.component.html',
    styleUrls:['landing.component.scss']

})
export class LandingComponent{
    latestArticls:ArticleCard[]=[
        {name:'test1', text: 'article1 text',img:'/assets/img/logo.png',_id:''},
        {name:'test2', text: 'article2 text',img:'/assets/img/logo.png',_id:''},
        {name:'test3', text: 'article3 text',img:'/assets/img/logo.png',_id:''},
        {name:'test4', text: 'article4 text',img:'/assets/img/logo.png',_id:''},
      ]
}