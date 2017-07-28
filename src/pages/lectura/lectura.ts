import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable } from "angularfire2/database";
import { FirebaseService } from "../../providers/firebase-service/firebase-service";

@Component({
  selector: 'page-lectura',
  templateUrl: 'lectura.html'
})
export class LecturaPage {
  lecturas: FirebaseListObservable<any[]>;

  constructor(public alertCtrl: AlertController,
              public firebaseService: FirebaseService) {
    this.lecturas = this.firebaseService.getLecturas();
  }

  addLectura():void {

    let prompt = this.alertCtrl.create({
      title: 'Agregando Lectura',
      message: 'Ingrese la Información',
      inputs: [
        {
          name: 'fecha',
          placeholder: 'Fecha'
        },
        {
          name: 'lectura_anterior',
          placeholder: 'Lectura Anterior'
        },
        {
          name: 'lectura_actual',
          placeholder: 'Lectura Actual'
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("cancelado");
          }
        },
        {
          text: "Guardar",
          handler: data => {
            this.lecturas.push({
              fecha: data.fecha,
              lectura_anterior: data.lectura_anterior,
              lectura_actual: data.lectura_actual
            });
          }
        }
      ]
    });

    prompt.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LecturaPage');
  }

}
