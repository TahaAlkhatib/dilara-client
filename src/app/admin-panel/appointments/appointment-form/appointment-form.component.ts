import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, selectField, textAreaField, textField } from '@upupa/dynamic-form';
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


    model: Appointment



    formFields = {
        '_id': { type: 'field', input: 'hidden', name: '_id', ui: { inputs: { label: 'Email', placeholder: 'Use a valid email' } } },
        'patientId': selectField('patientId', 'Patient', new DataAdapter(new ServerDataSource(this.ds, 'patient', ['_id', 'name']), '_id', 'name', '_id'), 'Patient', null, 'outline', null, [{ name: 'required' }]),
        'date': { type: 'field', input: 'date', name: 'date', ui: { inputs: { label: 'Date', placeholder: 'Date' } } },
        'status': selectField('status', 'Status', new DataAdapter(new ClientDataSource(['waiting', 'attended', 'canceled', 'skipped'])), 'Status', null, 'outline', 1, [{ name: 'required' }]),
        'notes': textAreaField('notes', 'Notes', 'Notes', null, 'outline', 3, 6),
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
        this.router.navigateByUrl('en/admin/appointment/list')
    }

    goBack() {
        window.history.back()
    }
}
