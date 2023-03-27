import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '@upupa/common';
import { DataService } from '@upupa/data';
import { firstValueFrom } from 'rxjs';
import { Appointment } from '../../../../app/model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-appointment-preview',
    templateUrl: './appointment-preview.component.html',
    styleUrls: ['./appointment-preview.component.css']
})
export class AppointmentPreviewComponent implements OnInit {
    serverUrl = environment.server_base_url
    appointment: Appointment
    constructor(private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    async ngOnInit() {
        const appointmentId = this.route.snapshot.paramMap.get('id')
        if (appointmentId) {
            this.appointment = await firstValueFrom(this.ds.get<Appointment>(`appointment/${appointmentId}`))
        }
    }

}
