import { Component, Input } from "@angular/core";
import { ArticleCard } from "../articles.component";

@Component({
    selector:'article-card',
    templateUrl:"article-card.component.html",
    styleUrls:['article-card.component.scss']
})
export class ArticleCardComponent{
@Input() articleCard:ArticleCard

}