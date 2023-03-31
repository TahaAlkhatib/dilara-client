import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LanguageService } from "@upupa/language";
import { ArticleCard } from "src/app/model";
 

@Component({
    selector:'articles',
    templateUrl:'articles.component.html',
    styleUrls:['articles.component.scss']
})
export class ArticlesComponent {

    articals:ArticleCard[] = [
        {name:'test1', text: 'article1 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'1'},
        {name:'test2', text: 'article2 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'2'},
        {name:'test3', text: 'article3 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'3'},
        {name:'test5', text: 'article5 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'4'},
        {name:'test6', text: 'article6 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'5'},
        {name:'test7', text: 'article7 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'6'},
        {name:'test8', text: 'article8 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'7'},
        {name:'test9', text: 'article9 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'8'},
        {name:'test10', text: 'article10 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'9'},
        {name:'test11', text: 'article11 text demo, this text has been writen wide to test card with',img:'/assets/img/logo.png',_id:'10'},

      ]
    constructor(private router:Router, private lang:LanguageService){

    }
    goToArticle(id:string){
this.router.navigate([this.lang.language??'en','home','articles',id])
    }
}