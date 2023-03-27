import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, selectField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Appointment } from '../../../../app/model';

@Component({
    selector: 'app-appointment-form',
    templateUrl: './appointment-form.component.html',
    styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);


    model:Appointment

    formFields = {
       '_id': { type: 'field', input: 'hidden', name: '_id', ui: { inputs: { label: 'Email', placeholder: 'Use a valid email' } } },
       'name': { type: 'field', input: 'text', name: 'name', ui: { inputs: { label: 'name', placeholder: 'name' } }, validations: [{ name: 'required' }] },
       'address': { type: 'field', input: 'text', name: 'address', ui: { inputs: { label: 'address', placeholder: 'address' } } },
       'location': { type: 'field', input: 'text', name: 'location', ui: { inputs: { label: 'location', placeholder: 'location' } } },
       'lat': { type: 'field', input: 'text', name: 'lat', ui: { inputs: { label: 'lat', placeholder: 'lat' } } },
       'long': { type: 'field', input: 'text', name: 'long', ui: { inputs: { label: 'long', placeholder: 'long' } } },
       'logo':  fileField('logo', 'Image', '/assets/appointment/logo', undefined, undefined, 1, 1, false) 
    }

    constructor(
        private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        private ls: LanguageService,
        public auth: AuthService) {
    }

    async ngOnInit() {
        const appointmentId = this.route.snapshot.paramMap.get('id')
        if (appointmentId) {
             this.model = await firstValueFrom(this.ds.get<Appointment>(`appointment/${appointmentId}`))
        }
    }
    async submit() {
        if (this.model._id) {
            const res = await this.ds.put(`appointment/${this.model._id}`, this.model)
        }
        else {
            const res = await this.ds.post('appointment', this.model)
        }
        this.snack.openSuccess()
        this.router.navigateByUrl('en/admin/settings/appointment/appointment-list')
    }

    goBack(){
        window.history.back()
    }
}
