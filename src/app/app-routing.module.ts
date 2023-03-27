import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/en/home',
    pathMatch: 'full'
  },
  {
    path: ':lang/account',
    component: AdminLayoutComponent,
    loadChildren: () => import('./account/account.module').then(m => m.AccountsModule)
  },
  {
    path: ':lang/admin',
    component:AdminLayoutComponent,
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: ':lang/home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
