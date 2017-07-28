import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  abonados: FirebaseListObservable<any[]>;
  nombre = '';
  codigoBanco = '';
  direccion = '';
  numeroMedidor = '';
  lecturaAnterior = '';
  lecturaActual = '';
  data = {};

  constructor(public navCtrl: NavController,
              public firebaseService: FirebaseService) {
    this.abonados = this.firebaseService.getAbonados();
  }
  addAbonado() {
    this.data = {
      nombre : this.nombre,
      codigo_banco : this.codigoBanco,
      direccion : this.direccion,
      numero_medidor : this.numeroMedidor,
      lectura_anterior : this.lecturaAnterior,
      lectura_actual : this.lecturaActual
    };

    this.firebaseService.addAbonado(this.data);

    this.nombre = '';
    this.codigoBanco = '';
    this.direccion = '';
    this.numeroMedidor = '';
    this.lecturaAnterior = '';
    this.lecturaActual = '';
    this.data = {};
  }

  removeAbonado(id) {
    this.firebaseService.removeAbonado(id);
  }

}
