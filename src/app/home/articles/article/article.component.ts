import { Component } from "@angular/core";

export type Article = {
    _id:string
    img:string
    name:string
    text:string
    date:Date
    auther?:string 
}
@Component({
    selector:'article',
    templateUrl:'article.component.html',
    styleUrls:['article.component.scss']
})
export class ArticleComponent {
    artical:Article
    
}