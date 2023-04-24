import { HttpClientModule } from '@angular/common/http';
import { NgModule,Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LanguageModule, TranslationModule, LanguageService } from '@upupa/language';
import { AuthModule, DEFAULT_LOGIN, DEFAULT_VERIFY } from '@upupa/auth';
import { ConfirmModule, EventBus, UtilsModule } from '@upupa/common';
import { DataModule } from '@upupa/data';
import { UploadModule } from '@upupa/upload';
import { DynamicFormModule } from '@upupa/dynamic-form';
import { DynamicFormMaterialThemeModule, materialThemeComponentMapper } from '@upupa/dynamic-form-material-theme';
import { HtmlEditorComponent } from '@upupa/html-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { SignInComponent } from './sign-in/sign-in.component';


const signinProvider: Provider = {
    provide: DEFAULT_LOGIN,
    useFactory: (lang: LanguageService) => `/ar/account/signin`,
    deps: [LanguageService],
};
const verifyProvider: Provider = {
    provide: DEFAULT_VERIFY,
    useFactory: (lang: LanguageService) => `/ar/account/verify`,
    deps: [LanguageService],
};

const htmlMapper = {
    ...materialThemeComponentMapper,
    'html': { component: HtmlEditorComponent }
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    UtilsModule,
    ConfirmModule,
    AuthModule.forRoot(`${environment.server_base_url}/auth`,{ default_login_url:signinProvider,default_verify_url:verifyProvider}),
    DataModule.forChild(`${environment.server_base_url}/api`),
    DynamicFormModule.forRoot([],{'material':htmlMapper},'material',{enableLogs:!environment.production}),DynamicFormMaterialThemeModule,
    LanguageModule.forRoot('en', {}, 'lang', '/assets/langs'),
    TranslationModule,
    BrowserAnimationsModule,
    UploadModule.forChild(`${environment.server_base_url}/storage`)
],
  declarations: [AppComponent,AdminLayoutComponent,RegisterAdminComponent,SignInComponent],
  providers: [InAppBrowser],
  bootstrap: [AppComponent]
})
export class AppModule {}
