import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@upupa/auth';
import { ActionDescriptor, SnackBarService } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { CollectStyle, fileField, FormDesign, selectField, textAreaField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { Payment } from '../../../../app/model';

@Component({
    selector: 'app-payment-form',
    templateUrl: './payment-form.component.html',
    styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
    loading = new ReplaySubject<boolean>(1);


    model: Payment

    formFields = {
        '_id': { type: 'field', input: 'hidden', name: '_id', ui: { inputs: { label: 'Email', placeholder: 'Use a valid email' } } },
        'patientId': selectField('patientId', 'Patient', new DataAdapter(new ServerDataSource(this.ds, 'patient', ['_id', 'name']), '_id', 'name', '_id'), 'Patient', null, 'outline', null, [{ name: 'required' }]),
        'amount': { type: 'field', input: 'number', name: 'amount', ui: { inputs: { label: 'Amount', placeholder: 'Amount' } }, validations: [{ name: 'required' }] },
        'dueDate': { type: 'field', input: 'date', name: 'dueDate', ui: { inputs: { label: 'Due Date', placeholder: 'Due Date' } } },
        'payDate': { type: 'field', input: 'date', name: 'payDate', ui: { inputs: { label: 'Pay Date', placeholder: 'Pay Date' } } },
        'status': selectField('status', 'Status', new DataAdapter(new ClientDataSource(['payed', 'waiting', 'canceled'])), 'Status', null, 'outline', 1, [{ name: 'required' }]),
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
        const paymentId = this.route.snapshot.paramMap.get('id')
        if (paymentId) {
            this.model = await firstValueFrom(this.ds.get<Payment>(`payment/${paymentId}`))
        }
    }
    async submit() {
        if (this.model._id) {
            const res = await this.ds.put(`payment/${this.model._id}`, this.model)
        }
        else {
            const res = await this.ds.post('payment', this.model)
        }
        this.snack.openSuccess()
        this.router.navigateByUrl('en/admin/payment/list')
    }

    goBack() {
        window.history.back()
    }
}
