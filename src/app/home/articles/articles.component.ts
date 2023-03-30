import { Component } from "@angular/core";
import { Router } from "@angular/router";
 export type ArticleCard = {
    _id:string
    img:string
    name:string
    text:string
 }

@Component({
    selector:'articles',
    templateUrl:'articles.component.html',
    styleUrls:['articles.component.scss']
})
export class ArticlesComponent {
    articals:ArticleCard[] = [
        {name:'test1', text: 'article1 text',img:'/assets/img/logo.png',_id:''},
        {name:'test2', text: 'article2 text',img:'/assets/img/logo.png',_id:''},
        {name:'test3', text: 'article3 text',img:'/assets/img/logo.png',_id:''},
        {name:'test5', text: 'article5 text',img:'/assets/img/logo.png',_id:''},
        {name:'test6', text: 'article6 text',img:'/assets/img/logo.png',_id:''},
        {name:'test7', text: 'article7 text',img:'/assets/img/logo.png',_id:''},
        {name:'test8', text: 'article8 text',img:'/assets/img/logo.png',_id:''},
        {name:'test9', text: 'article9 text',img:'/assets/img/logo.png',_id:''},
        {name:'test10', text: 'article10 text',img:'/assets/img/logo.png',_id:''},
        {name:'test11', text: 'article11 text',img:'/assets/img/logo.png',_id:''},

      ]
    constructor(private router:Router){

    }
    goToArticle(id:string){
this.router.navigate(['articles',id])
    }
}