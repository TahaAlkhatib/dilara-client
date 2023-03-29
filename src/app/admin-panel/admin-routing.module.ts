import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AppointmentFormComponent } from "./appointments/appointment-form/appointment-form.component";
import { AppointmentComponent } from "./appointments/appointment-list/appointment.component";
import { AppointmentPreviewComponent } from "./appointments/appointment-preview/patient-preview.component";
import { DashboardPage } from "./dashboard/dashboard-page";
import { NotificationsFormComponent } from "./notifications/notifications-form.component";
import { PatientFormComponent } from "./patients/patient-form/patient-form.component";
import { PatientComponent } from "./patients/patient-list/patient.component";
import { PatientPreviewComponent } from "./patients/patient-preview/patient-preview.component";
import { PaymentFormComponent } from "./payments/payment-form/payment-form.component";
import { PaymentComponent } from "./payments/payment-list/payment.component";
import { PaymentPreviewComponent } from "./payments/payment-preview/payment-preview.component";
import { AdminPermissionsComponent } from "./permissions/admin-permissions/admin-permissions.component";


const routes: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPage },
    { path: 'notifications', component: NotificationsFormComponent },

    {
        path: 'patient', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: PatientComponent },
            { path: 'add', component: PatientFormComponent },
            { path: 'edit/:id', component: PatientFormComponent },
            { path: 'view', component: PatientPreviewComponent },
        ]
    },
    {
        path: 'appointment', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: AppointmentComponent },
            { path: 'add', component: AppointmentFormComponent },
            { path: 'edit/:id', component: AppointmentFormComponent },
            { path: 'view', component: AppointmentPreviewComponent },
        ]
    },
    {
        path: 'payment', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: PaymentComponent },
            { path: 'add', component: PaymentFormComponent },
            { path: 'edit/:id', component: PaymentFormComponent },
            { path: 'view', component: PaymentPreviewComponent },
        ]
    },

    {
        path: 'settings', children: [
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'permissions', component: AdminPermissionsComponent }
        ]
    }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRouterModule {

}