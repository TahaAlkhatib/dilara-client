import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '@upupa/common';
import { DataService } from '@upupa/data';
import { firstValueFrom } from 'rxjs';
import { Payment } from '../../../../app/model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-payment-preview',
    templateUrl: './payment-preview.component.html',
    styleUrls: ['./payment-preview.component.css']
})
export class PaymentPreviewComponent implements OnInit {
    serverUrl = environment.server_base_url
    payment: Payment
    constructor(private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    async ngOnInit() {
        const paymentId = this.route.snapshot.paramMap.get('id')
        if (paymentId) {
            this.payment = await firstValueFrom(this.ds.get<Payment>(`payment/${paymentId}`))
        }
    }

}
