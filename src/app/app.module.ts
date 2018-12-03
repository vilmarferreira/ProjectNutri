import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DicasPage } from '../pages/dicas/dicas';
import { PerfilPage } from '../pages/perfil/perfil';
import {RegisterPage} from '../pages/register/register';
import {PostPage} from '../pages/post/post';
import {TabsPage} from '../pages/tabs/tabs';
import { RecuperarPage } from '../pages/recuperar/recuperar';
import {AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule } from 'angularfire2/auth';

import {WordpressService} from '../SERVICE/wordpress.service';
import {HttpModule} from '@angular/http';
const firebaseAuth = {
    apiKey: "AIzaSyC0n6m16Gud_ao7Qp-8RrZ719sv2j5flCs",
    authDomain: "nutri-ee32d.firebaseapp.com",
    databaseURL: "https://nutri-ee32d.firebaseio.com",
    projectId: "nutri-ee32d",
    storageBucket: "nutri-ee32d.appspot.com",
    messagingSenderId: "126903980574"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DicasPage,
    RegisterPage,
    RecuperarPage,
    PerfilPage,
    PostPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseAuth),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DicasPage,
    RegisterPage,
    RecuperarPage,
    PerfilPage,
    PostPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WordpressService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
