import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DashboardPage } from "./dashboard/dashboard-page";
import { NotificationsFormComponent } from "./notifications/notifications-form.component";
import { AdminPermissionsComponent } from "./permissions/admin-permissions/admin-permissions.component";


const routes: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPage },
    { path: 'notifications', component: NotificationsFormComponent },
    {
        path: 'settings', children: [
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'settings/permissions', component: AdminPermissionsComponent }
        ]
    }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRouterModule {

}