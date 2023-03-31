import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './articles/article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponentPage } from './home-page/home.component';
import { LandingComponent } from './home-page/landing/landing.component';


const routes: Routes = [
 
      {
        path: '',
        component: HomeComponentPage,
      },
      {
        path: 'articles',
        component: ArticlesComponent
      },
      {
        path: 'articles/:id',
        component: ArticleComponent
      },


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
