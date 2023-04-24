import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@upupa/auth';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HomeComponentPage } from './home/home-page/home.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/en/home',
        pathMatch: 'full'
    },
    {
        path: ':lang/account/signin',
        component: SignInComponent
    },
    { path: ':lang/account/register-admin', component: RegisterAdminComponent },
    {
        path: ':lang/account',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./account/account.module').then(m => m.AccountsModule)
    },
    {
        path: ':lang/tabs',
        component: AdminLayoutComponent,
        loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
    },
    {
        path: ':lang/admin',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin-panel/admin.module').then(m => m.AdminModule)
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
export class AppRoutingModule { }
