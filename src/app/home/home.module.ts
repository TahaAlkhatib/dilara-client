import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeComponentPage } from './home-page/home.component';
import { FooterComponent } from './footer/footer.component';
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';
import { PagesDropdownComponent } from './pages-dropdown/pages-dropdown.component';

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
    PagesDropdownComponent
  ]
})
export class HomeModule { }
