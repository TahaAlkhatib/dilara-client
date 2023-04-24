import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { ColumnsDescriptor } from '@upupa/table';
import { Payment } from '../../../../app/model';
import { AppService } from '../../../../app/providers/app.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

    constructor(private ds: DataService, public bus: EventBus, private appService: AppService,
        private confirmService: ConfirmService, public router: Router, private activatedRoute: ActivatedRoute) { }
    collection: string;
    item: Payment
    selection: Payment[]
    adapter: DataAdapter
    columns: ColumnsDescriptor = {
        patientId: 1, amount: 1, dueDate: 1, payDate: 1, status: 1
    }
    actions: ActionDescriptor[] = [
        { variant: 'icon', name: 'preview', icon: 'preview', menu: false },
        { variant: 'icon', name: 'edit', icon: 'edit', menu: true },
        { position: 'menu', name: 'delete', icon: 'delete_outline', text: 'Delete', menu: true },
        { position: 'bulk', name: 'delete', icon: 'delete_outline', text: 'Delete', bulk: true },
        { position: 'header', name: 'create', icon: 'add_circle_outline', text: 'Create', bulk: true }
    ]
    ngOnInit(): void {
        let source = new ServerDataSource(this.ds, '/payment', ['_id', 'patientId', 'amount', 'dueDate', 'payDate', 'status'])
        this.adapter = new DataAdapter(source, '_id', 'patientId')

    }

    ngAfterViewInit() {

        this.activatedRoute.params.subscribe(async res => {
            this.appService.title.next('Payment')
            await this.refresh()
        })
    }

    async refresh() {
        await this.ds.refreshCache('/payment')
        this.adapter.refresh()
    }
    async onAction(x: ActionEvent) {

        switch (x.action.name) {
            case 'preview':
                this.router.navigateByUrl(`en/admin/payment/view/${x.data[0]._id}`)
                break;
            case 'create':
                this.router.navigateByUrl('en/admin/payment/add')
                break;
            case 'edit': this.router.navigateByUrl(`en/admin/payment/edit/${x.data[0]._id}`); break;
            case 'delete':
                const dialogData = { maxWidth: '320px', title: 'Delete', confirmText: 'Permanently' } as ConfirmOptions
                if (await this.confirmService.openWarning(dialogData)) {
                    for (const item of x.data)
                        await this.ds.delete(`payment/${item._id}`)
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
