import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeComponentPage } from './home-page/home.component';
import { FooterComponent } from './footer/footer.component';
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';
import { PagesDropdownComponent } from './pages-dropdown/pages-dropdown.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleCardComponent } from './articles/article-card/article-card.component';
import { ArticleComponent } from './articles/article/article.component';
import { LandingComponent } from './home-page/landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomeComponentPage,
    FooterComponent,
    AuthNavbarComponent,
    PagesDropdownComponent,
    ArticlesComponent,
    ArticleCardComponent,
    ArticleComponent,
    LandingComponent
  ]
})
export class HomeModule { }
