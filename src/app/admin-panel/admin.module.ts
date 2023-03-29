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
import { PatientComponent } from './patients/patient-list/patient.component';
import { PatientFormComponent } from './patients/patient-form/patient-form.component';
import { PatientPreviewComponent } from './patients/patient-preview/patient-preview.component';
import { AppointmentComponent } from './appointments/appointment-list/appointment.component';
import { AppointmentFormComponent } from './appointments/appointment-form/appointment-form.component';
import { AppointmentPreviewComponent } from './appointments/appointment-preview/patient-preview.component';
import { PaymentComponent } from './payments/payment-list/payment.component';
import { PaymentFormComponent } from './payments/payment-form/payment-form.component';
import { PaymentPreviewComponent } from './payments/payment-preview/payment-preview.component';
import { DynamicFormNativeThemeModule } from '@upupa/dynamic-form-native-theme';


@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        TranslationModule,
        DataTableModule, AdminRouterModule, MaterialModulesModule, DynamicFormModule,DynamicFormNativeThemeModule
    ],
    providers: [

    ],
    declarations: [
        DashboardPage,NotificationsFormComponent,AdminPermissionsComponent,
        PatientComponent,PatientFormComponent,PatientPreviewComponent,
        AppointmentComponent,AppointmentFormComponent,AppointmentPreviewComponent,
        PaymentComponent,PaymentFormComponent,PaymentPreviewComponent
    ],
    exports: []
})
export class AdminModule { }
