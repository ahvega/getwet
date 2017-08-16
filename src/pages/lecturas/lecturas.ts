import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable } from "angularfire2/database";
import { FirebaseService } from "../../providers/firebase-service/firebase-service";

@Component({
  selector: 'page-lecturas',
  templateUrl: 'lecturas.html'
})
export class LecturasPage {
  lecturas: FirebaseListObservable<any[]>;

  constructor(public alertCtrl: AlertController,
              public firebaseService: FirebaseService) {
    this.lecturas = this.firebaseService.getLecturas();
  }

  addLectura(): void {

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
            console.log("cancelado" + data);
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

  updateLectura(lectura): void {
    let prompt = this.alertCtrl.create({
      title: 'Actualizar Lectura',
      message: 'Edite la Información',
      inputs: [
        {
          name: 'fecha',
          placeholder: lectura.fecha
        },
        {
          name: 'lectura_anterior',
          placeholder: lectura.lectura_anterior
        },
        {
          name: 'lectura_actual',
          placeholder: lectura.lectura_actual
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("cancelado " + data);
          }
        },
        {
          text: "Guardar",
          handler: data => {
            let newFecha: String = (data.fecha != '') ? data.fecha : lectura.fecha;
            let newLecturaAnterior = (data.lectura_anterior != '') ? data.lectura_anterior : lectura.lectura_anterior;
            let newLecturaActual = (data.lectura_actual != '') ? data.lectura_actual : lectura.lectura_actual;

            this.lecturas.update(lectura.$key, {
              fecha: newFecha,
              lectura_anterior: newLecturaAnterior,
              lectura_actual: newLecturaActual
            });
          }
        }
      ]
    });

    prompt.present();

  }

  removeLectura(lectura): void {
    let prompt = this.alertCtrl.create({
      title: 'Eliminar Lectura',
      inputs: [
        {
          name: 'fecha',
          placeholder: lectura.fecha,
          disabled: true
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log("cancelado " + data)
          }
        },
        {
          text: 'Eliminar',
          handler: data => {
            console.log(data);
            this.firebaseService.removeLectura(lectura.$key)
          }
        }
      ]
    });
    prompt.present();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LecturaPage');
  // }

}
