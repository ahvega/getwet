import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AbonadosPage } from '../pages/abonados/abonados';
import { LecturasPage } from '../pages/lecturas/lecturas';
import { MedidorPage } from '../pages/medidor/medidor';
import { IngresarPage } from '../pages/ingresar/ingresar';
import { AbonadoPage } from '../pages/abonado/abonado';
import { LecturaPage } from '../pages/lectura/lectura';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from '../providers/firebase-service/firebase-service';

const firebaseConfig = {
  apiKey: "AIzaSyAsBg6DVwLgtcyGdY8-60kSCiu2K6CiQt4",
  authDomain: "getwet-b8c53.firebaseapp.com",
  databaseURL: "https://getwet-b8c53.firebaseio.com",
  projectId: "getwet-b8c53",
  storageBucket: "getwet-b8c53.appspot.com",
  messagingSenderId: "528710624317"
};

@NgModule({
  declarations: [
    MyApp,
    AbonadosPage,
    LecturasPage,
    MedidorPage,
    IngresarPage,
    AbonadoPage,
    LecturaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AbonadosPage,
    LecturasPage,
    MedidorPage,
    IngresarPage,
    AbonadoPage,
    LecturaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
