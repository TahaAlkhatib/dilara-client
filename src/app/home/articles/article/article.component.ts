import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Article } from "src/app/model";


@Component({
    selector: 'article',
    templateUrl: 'article.component.html',
    styleUrls: ['article.component.scss']
})
export class ArticleComponent {

    artical: Article

    articals: Article[] = [
        { name: 'test1', text: 'article1 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '1', date: new Date() },
        { name: 'test2', text: 'article2 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '2', date: new Date() },
        { name: 'test3', text: 'article3 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '3', date: new Date() },
        { name: 'test5', text: 'article5 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '4', date: new Date() },
        { name: 'test6', text: 'article6 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '5', date: new Date() },
        { name: 'test7', text: 'article7 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '9', date: new Date() },
        { name: 'test8', text: 'article8 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '7', date: new Date() },
        { name: 'test9', text: 'article9 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '8', date: new Date() },
        { name: 'test10', text: 'article10 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '9', date: new Date() },
        { name: 'test11', text: 'article11 text demo, this text has been writen wide to test card with', img: '/assets/img/logo.png', _id: '10', date: new Date() },

    ]
    constructor(private route: ActivatedRoute) { }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.artical = this.articals.find(a => a._id = id)
    }

}