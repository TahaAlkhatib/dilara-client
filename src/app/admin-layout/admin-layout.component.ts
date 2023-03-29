import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { Storage } from '@ionic/storage';
import { AppService } from "../providers/app.service";
import { AuthService } from "@upupa/auth";
import { LanguageService } from "@upupa/language";

@Component({
    selector: "admin-layout",
    templateUrl: "./admin-layout.component.html",
    styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
    appPages = [
        {
            title: 'Appointments',
            url: 'appointment',
            prefix: 'admin',
            icon: 'calendar',
            open: false,
            children: [
                {
                    title: 'New Appointment',
                    url: 'add',
                    icon: 'document'
                },
                {
                    title: 'Appointments List',
                    url: 'list',
                    icon: 'document'
                }
            ]
        },
        {
            title: 'Patients',
            url: 'patient',
            prefix: 'admin',
            icon: 'people',
            open: false,
            children: [
                {
                    title: 'New Patient',
                    url: 'add',
                    icon: 'document'
                },
                {
                    title: 'Patients List',
                    url: 'list',
                    icon: 'document'
                }
            ]
        },
        {
            title: 'Payments',
            url: 'payment',
            prefix: 'admin',
            icon: 'people',
            open: false,
            children: [
                {
                    title: 'New Patient',
                    url: 'add',
                    icon: 'document'
                },
                {
                    title: 'Patients List',
                    url: 'list',
                    icon: 'document'
                }
            ]
        },
        {
            title: 'Account',
            url: 'account',
            prefix: '/',
            icon: 'person',
            open: false,
            children: [
                {
                    title: 'Users',
                    url: 'user-list',
                    icon: 'document'
                },
                {
                    title: 'Roles',
                    url: 'role/role-list',
                    icon: 'document'
                }
            ]
        },
        {
            title: 'Settings',
            url: 'settings',
            prefix: 'admin',
            icon: 'map',
            open: false,
            children: [
                {
                    title: 'Permissions',
                    url: 'permissions',
                    icon: 'document'
                }
            ]
        }
    ];

    websitePages = [
        {
            title: 'Fixed Content',
            url: 'website',
            prefix: 'admin',
            icon: 'calendar',
            open: false,
            children: [
                {
                    title: 'Home',
                    url: 'home',
                    icon: 'document'
                },
                {
                    title: 'About',
                    url: 'about',
                    icon: 'document'
                }
            ]
        }, {
            title: 'Articles',
            url: 'article',
            prefix: 'admin',
            icon: 'people',
            open: false,
            children: [
                {
                    title: 'New Article',
                    url: 'form',
                    icon: 'document'
                },
                {
                    title: 'Articles List',
                    url: 'list',
                    icon: 'document'
                }
            ]
        },
        {
            title: 'Settings',
            url: 'settings',
            prefix: 'admin',
            icon: 'map',
            open: false,
            children: [
                {
                    title: 'Camp',
                    url: 'camp/camp-list',
                    icon: 'document'
                }
            ]
        }
    ];


    dark = false;
    user;

    title: string

    constructor(
        private menu: MenuController,
        private platform: Platform,
        private router: Router,
        private storage: Storage,
        private swUpdate: SwUpdate,
        private toastCtrl: ToastController,
        private appService: AppService,
        private auth: AuthService,
        private langService: LanguageService
    ) {
        this.initializeApp();
    }

    async ngOnInit() {


        this.swUpdate.available.subscribe(async res => {
            const toast = await this.toastCtrl.create({
                message: 'Update available!',
                position: 'bottom',
                buttons: [
                    {
                        role: 'cancel',
                        text: 'Reload'
                    }
                ]
            });

            await toast.present();

            toast
                .onDidDismiss()
                .then(() => this.swUpdate.activateUpdate())
                .then(() => window.location.reload());
        });

        this.auth.user$.subscribe(async u => {
            await this.appService.initEmployeeInfo()
            this.user = u
            console.log('user :', this.user)
        })

        this.appService.title.subscribe(res => this.title = res)
    }

    initializeApp() {
        this.appService.appModules.next(this.appPages);
        this.platform.ready().then(() => {
            if (this.platform.is('hybrid')) {
                StatusBar.hide();
                SplashScreen.hide();
            }
        });
    }

    navigate(p, sub) {
        if (sub)
            this.router.navigateByUrl(`en/${p.prefix}/${p.url}/${sub.url}`)
        else {
            if (!p.children?.length)
                this.router.navigateByUrl(`en/${p.prefix}/${p.url}`)
        }
    }




    logout() {
        this.auth.signout();
    }


    openTutorial() {
        this.menu.enable(false);
        this.storage.set('ion_did_tutorial', false);
        this.router.navigateByUrl('/tutorial');
    }
}
