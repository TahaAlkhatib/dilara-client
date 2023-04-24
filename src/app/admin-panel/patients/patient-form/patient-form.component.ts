import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, selectField, textAreaField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Patient } from '../../../../app/model';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);


    model: Patient

    formFields = {
        '_id': { type: 'field', input: 'hidden', name: '_id', ui: { inputs: { label: 'id', placeholder: 'id' } } },
        'registerDate': { type: 'field', input: 'hidden', name: 'registerDate', ui: { inputs: { label: 'registerDate', placeholder: 'registerDate' } } },
        'name': { type: 'field', input: 'text', name: 'name', ui: { inputs: { label: 'name', placeholder: 'name' } }, validations: [{ name: 'required' }] },
        'fatherName': { type: 'field', input: 'text', name: 'fatherName', ui: { inputs: { label: 'Father Name', placeholder: 'Father Name' } }, validations: [{ name: 'required' }] },
        'motherName': { type: 'field', input: 'text', name: 'motherName', ui: { inputs: { label: 'Mother Name', placeholder: 'Mother Name' } }, validations: [{ name: 'required' }] },
        'dateOfBirth': { type: 'field', input: 'date', name: 'dateOfBirth', ui: { inputs: { label: 'Date Of Birth', placeholder: 'Date Of Birth' } } },
        'notes': textAreaField('notes', 'Notes', 'Notes', null, 'outline', 3, 6),
        'picture': fileField('picture', 'Picture', '/assets/patient/picture', undefined, undefined, 1, 1, false)
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
        const patientId = this.route.snapshot.paramMap.get('id')
        if (patientId) {
            this.model = await firstValueFrom(this.ds.get<Patient>(`patient/${patientId}`))
        }
    }
    async submit() {
        if (this.model._id) {
            const res = await this.ds.put(`patient/${this.model._id}`, this.model)
        }
        else {
            this.model.registerDate = new Date()
            const res = await this.ds.post('patient', this.model)
        }
        this.snack.openSuccess()
        this.router.navigateByUrl('en/admin/patient/list')
    }

    goBack() {
        window.history.back()
    }
}
