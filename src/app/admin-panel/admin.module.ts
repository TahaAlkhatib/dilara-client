import { NgModule } from '@angular/core';
import { MembershipModule, PageNavigationLink } from '@upupa/membership';
import { DynamicFormModule, FormDesign, hiddenField, selectField, switchField, textField } from '@upupa/dynamic-form';
import { LanguageService, TranslationModule } from '@upupa/language';
import { ActivatedRoute } from '@angular/router';
import { ClientDataSource, DataAdapter, ServerDataSource } from '@upupa/data';
import { DataTableModule } from '@upupa/table';
import { MaterialModulesModule } from '../app-material.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdminRouterModule } from './admin-routing.module';
import { DashboardPage } from './dashboard/dashboard-page';
import { FormsModule } from '@angular/forms';
import { NotificationsFormComponent } from './notifications/notifications-form.component';
import { AdminPermissionsComponent } from './permissions/admin-permissions/admin-permissions.component';


@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        TranslationModule,
        DataTableModule, AdminRouterModule, MaterialModulesModule,DynamicFormModule
    ],
    providers: [

    ],
    declarations: [DashboardPage,NotificationsFormComponent,AdminPermissionsComponent],
    exports: []
})
export class AdminModule { }
