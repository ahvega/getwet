import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MedidorPage } from '../pages/medidor/medidor';
import { LecturasPage } from '../pages/lecturas/lecturas';
import { LecturaPage } from '../pages/lectura/lectura';
import { AbonadosPage } from '../pages/abonados/abonados';
import { AbonadosListPage } from "../pages/abonados-list/abonados-list";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = AbonadosListPage;

  // rootPage:any = AbonadosPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToAbonados(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(AbonadosPage);
  }

  goToAbonadosList(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(AbonadosListPage)
  }

  goToMedidor(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(MedidorPage);
  }

  goToLecturas(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(LecturasPage);
  }

  goToLectura(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(LecturaPage);
  }
}
