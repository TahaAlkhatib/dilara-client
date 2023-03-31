import { Component, Input } from "@angular/core";
import { ArticleCard } from "src/app/model";

@Component({
    selector:'article-card',
    templateUrl:"article-card.component.html",
    styleUrls:['article-card.component.scss']
})
export class ArticleCardComponent{
@Input() articleCard:ArticleCard

}