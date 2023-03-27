// import { Component } from '@angular/core';
// import { AppService } from '../../providers/app.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@upupa/auth';
import { ActionDescriptor, ActionEvent, ConfirmOptions, ConfirmService, EventBus } from '@upupa/common';
import { ClientDataSource, DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { CollectStyle, FormDesign, selectField } from '@upupa/dynamic-form';
import {FileUploadService} from "@upupa/dynamic-form-material-theme"
import { LanguageService } from '@upupa/language';
import { PageNavigationLink } from '@upupa/membership';
import { ColumnsDescriptor } from '@upupa/table';
// import { EChartsOption } from 'echarts';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { AppService } from '../../providers/app.service';

@Component({
    templateUrl: 'dashboard-page.html',
    styleUrls: ['dashboard-page.scss']
})
export class DashboardPage {

    loading = new ReplaySubject<boolean>(1);
    // @ViewChild('statu') statu: ElementRef;
    @Input()
    //  ngClass: string | string[] | Set<string> | { [klass: string]: any; }
    @Input() model: { email: string, username: string, password: string } & any = {} as any;
    form: any
    user: User
    requestType: any;

    order: PaymentRequest
    todos = [];
    // chartOption: EChartsOption
    //  table: string[] = ["data-status"]
    isCreated: boolean = false;
    isApprouved: boolean = false;
    isRejected: boolean = false;
    isManag: boolean = false;
    isAccountant: boolean = false;

    arrayReq = [];


    submitBtn: ActionDescriptor = { variant: 'raised', name: 'submit', text: 'search', color: 'primary' };
    formStyle: CollectStyle = 'linear';
    initialValueFactory: any;
    nextBtn: ActionDescriptor = { variant: 'flat', name: 'next', text: 'next', color: '' };
    prevBtn: ActionDescriptor = { variant: 'flat', name: 'prev', text: 'prev', color: '' };
    design: FormDesign = {
        verticalAlignment: 'center',
        horizontalAlignment: 'center'
    } as FormDesign;

    formOptions = {
        formDesign: { questionColor: '#fff', answerColor: '#eee' } as FormDesign,
        formFields: [

            selectField('employeeId', 'Employee', new DataAdapter(new ServerDataSource(this.ds, 'user', ['_id', 'name']), '_id', 'name')),

            // selectField('status', 'Status', new DataAdapter(new ClientDataSource(FormStatusArray))),

        ],
        formStyle: 'linear',
        successHandler: {
            onSuccess: (auth, router) => {
                return router.navigateByUrl('/')
            }
        },
        links: (languageService: LanguageService, route: ActivatedRoute) => {
            return [{ label: 'signin-label', text: 'signin-text', url: `/${languageService.language}/account/signin` } as PageNavigationLink]
        }
    }
    private myChart: any = null;

    // PIE ECHART 
    // piechart() {
    //     this.chartOption = {
    //         tooltip: {
    //             trigger: 'item'
    //         },
    //         legend: {
    //             top: '4%',
    //             bottom: 'right',
    //             // orient: 'vertical',
    //         },
    //         series: [
    //             {
    //                 name: 'Access From',
    //                 type: 'pie',
    //                 radius: ['40%', '70%'],
    //                 avoidLabelOverlap: false,
    //                 itemStyle: {
    //                     borderRadius: 10,
    //                     borderColor: '#fff',
    //                     borderWidth: 2
    //                 },
    //                 label: {
    //                     show: false,
    //                     position: 'center'
    //                 },
    //                 emphasis: {
    //                     label: {
    //                         show: true,
    //                         fontSize: '40',
    //                         fontWeight: 'bold'
    //                     }
    //                 },
    //                 labelLine: {
    //                     show: false
    //                 },
    //                 data: this.todos
    //             }
    //         ]
    //     };

    // }


    // BAR ECHARTS

   


    // // ds: DataService;

    constructor(private ds: DataService, public bus: EventBus, private appService: AppService, private auth: AuthService,
        private confirmService: ConfirmService, public router: Router, private activatedRoute: ActivatedRoute, public fileupload: FileUploadService) {

        this.form = this.formOptions.formFields;



    }

    collection: string;
  
    async ngOnInit() {
    

        this.appService.title.next('Dashboard')


        // this.piechart();

    }

}
