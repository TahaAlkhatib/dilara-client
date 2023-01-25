import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { Storage } from '@ionic/storage';

@Component({
  selector: "admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls:["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
    appPages = [
        {
          title: 'Schedule',
          url: '/admin/tabs/schedule',
          icon: 'calendar'
        },
        {
          title: 'Speakers',
          url: '/admin/tabs/speakers',
          icon: 'people'
        },
        {
          title: 'Map',
          url: '/admin/tabs/map',
          icon: 'map'
        },
        {
          title: 'About',
          url: '/admin/tabs/about',
          icon: 'information-circle'
        }
      ];
      loggedIn = false;
      dark = false;
    
      constructor(
        private menu: MenuController,
        private platform: Platform,
        private router: Router,
        private storage: Storage,
        private swUpdate: SwUpdate,
        private toastCtrl: ToastController,
      ) {
        this.initializeApp();
      }
    
      async ngOnInit() {
        this.checkLoginStatus();
        this.listenForLoginEvents();
    
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
      }
    
      initializeApp() {
        this.platform.ready().then(() => {
          if (this.platform.is('hybrid')) {
            StatusBar.hide();
            SplashScreen.hide();
          }
        });
      }
    
      checkLoginStatus() {
      
      }
    
      updateLoggedInStatus(loggedIn: boolean) {
        setTimeout(() => {
          this.loggedIn = loggedIn;
        }, 300);
      }
    
      listenForLoginEvents() {
        window.addEventListener('user:login', () => {
          this.updateLoggedInStatus(true);
        });
    
        window.addEventListener('user:signup', () => {
          this.updateLoggedInStatus(true);
        });
    
        window.addEventListener('user:logout', () => {
          this.updateLoggedInStatus(false);
        });
      }
    
      logout() {
       
      }
    
      openTutorial() {
        this.menu.enable(false);
        this.storage.set('ion_did_tutorial', false);
        this.router.navigateByUrl('/tutorial');
      }
}
