import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '@upupa/common';
import { DataService } from '@upupa/data';
import { firstValueFrom } from 'rxjs';
import { Patient } from '../../../../app/model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-patient-preview',
    templateUrl: './patient-preview.component.html',
    styleUrls: ['./patient-preview.component.css']
})
export class PatientPreviewComponent implements OnInit {
    serverUrl = environment.server_base_url
    patient: Patient
    constructor(private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    async ngOnInit() {
        const patientId = this.route.snapshot.paramMap.get('id')
        if (patientId) {
            this.patient = await firstValueFrom(this.ds.get<Patient>(`patient/${patientId}`))
        }
    }

}
