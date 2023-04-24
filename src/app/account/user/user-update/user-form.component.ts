import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@upupa/auth';
import { SnackBarService } from '@upupa/common';
import { DataAdapter, DataService, ServerDataSource } from '@upupa/data';
import { hiddenField, selectField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { AppService } from '../../../providers/app.service';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    constructor(
        private ds: DataService,
        public snack: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        private ls: LanguageService,
        public auth: AuthService,
        private appService: AppService) {

    }

    loading = new ReplaySubject<boolean>(1);

    model: User



    formFields = {
        '_id': hiddenField('_id'),
        'name': textField('name', 'Name', undefined, undefined, 'outline', [{ name: 'required' }]),
        'email': { type: 'field', input: 'email', name: 'email', ui: { inputs: { label: 'Email', placeholder: 'Use a valid email' } }, validations: [{ name: 'required' }] },
        'password': { type: 'field', input: 'text', name: 'password', ui: { inputs: { label: 'Password', type: 'password', placeholder: 'Password', passwordStrength: null } }, validations: [{ name: 'required' }] },
        'roles': selectField('roles', 'Roles', new DataAdapter(new ServerDataSource(this.ds, 'role', ['_id', 'name']), 'name', 'name', 'name'), null, null, 'outline', 5, [{ name: 'required' }])
    }

    async ngOnInit() {
        const userId = this.route.snapshot.paramMap.get('id')
        if (userId) {
            this.model = await firstValueFrom(this.ds.get<User>(`user/${userId}`))
        }
    }





    formchange() {
        console.log('changeed////');

    }


    async signup() {
        const model = this.model
        const roles = model.roles?.slice()
        delete this.model.roles
        try {
            if (model._id) {
                delete model.password
                delete model.confirmPassword
                const res = await this.ds.put(`user/${model._id}`, model)
            }
            else {
                this.model = model;

                this.loading.next(true)
                if (!this.model.username) this.model.username = this.model.email; //auto save email as username if not provided

                const user: any = { ...this.model, language: this.ls.language };
                delete user.password;
                delete user.confirmPassword;
                let value = user;

                let res = await this.auth.signup(value, this.model.password);
                // let res2 = await this.auth.signin({ email: user.email, password: this.model.password });

                this.model._id = res._id


            }

            let res = await this.appService.addUserToRoles(roles, this.model)
            this.model.roles = roles
            this.router.navigateByUrl('en/account/user-list')
        }
        catch (error) {
            console.error(error)
            if (error.status == 500) {
                const e = error.json ? error.json() : error.body;

                if (e?.message && e?.message.indexOf("duplicate key") > -1) {
                    if (e.message.indexOf("index: email") > -1) this.snack.openFailed('duplicate-email');
                    else if (e.message.indexOf("index: username") > -1) this.snack.openFailed('duplicate-username');
                    else if (e.message.indexOf("index: phone") > -1) this.snack.openFailed('duplicate-phone');
                    else this.snack.openFailed('not-saved');
                }
            }
            else this.snack.openFailed('not-saved');

        }
        finally {
            this.loading.next(false);
            this.router.navigateByUrl('en/account/user-list')

        }


    }

    goBack() {
        window.history.back()
    }
}
