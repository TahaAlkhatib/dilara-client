import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { Appointment } from '../../../../app/model';
import { AppService } from '../../../../app/providers/app.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

    constructor(private ds: DataService, public bus: EventBus, private appService: AppService,
        private confirmService: ConfirmService, public router: Router, private activatedRoute: ActivatedRoute) { }
    collection: string;
    item: Appointment
    selection: Appointment[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        name: 1, lat:1,long:1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'preview', icon: 'preview', menu: false },
        { variant: 'icon', name: 'edit', icon: 'edit', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true }
    ]
    ngOnInit(): void {
        let source = new ServerDataSource(this.ds, '/appointment', ['_id', 'name','lat','long'])
        this.adapter = new DataAdapter(source, '_id', 'name')

    }

    ngAfterViewInit() {

        this.activatedRoute.params.subscribe(async res => {
            this.appService.title.next('Appointment')
            await this.refresh()
        })
    }

    async refresh() {
        await this.ds.refreshCache('/appointment')
        this.adapter.refresh()
    }
    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'preview':
                this.router.navigateByUrl(`en/admin/appointment/view/${x.data[0]._id}`)
                break;
            case 'create':
                this.router.navigateByUrl('en/admin/appointment/add')
                break;
            case 'edit': this.router.navigateByUrl(`en/admin/appointment/edit/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`appointment/${item._id}`)
                        await this.refresh()
                }
                break;
            default:
                this.bus.emit(`${this.collection}_${x.action.name}`, {
                    msg: `${this.collection}_${x.action.name}`,
                    ...x
                }, this)
                break;
        }


    }
}
