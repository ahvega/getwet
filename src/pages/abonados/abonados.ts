import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable } from "angularfire2/database";
import { FirebaseService } from "../../providers/firebase-service/firebase-service";

@Component({
  selector: 'page-abonados',
  templateUrl: 'abonados.html',
})
export class AbonadosPage {
  abonados: FirebaseListObservable<any[]>;

  constructor(public firebaseService: FirebaseService,
              public alertCtrl: AlertController) {
    this.abonados = this.firebaseService.getAbonados();
  }

  addAbonado():void {

    let prompt = this.alertCtrl.create({
      title: 'Agregando Abonado',
      message: 'Ingrese la información',
      inputs: [
        {
          name: 'correlativo',
          placeholder: 'Correlativo'
        },
        {
          name: 'nombre',
          placeholder: 'Nombre'
        },
        {
          name: 'codigo',
          placeholder: 'Código Banco'
        },
        {
          name: 'direccion',
          placeholder: 'Dirección'
        },
        {
          name: 'medidor',
          placeholder: 'Número Medidor'
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
            this.abonados.push({
              correlativo: data.correlativo,
              nombre: data.nombre,
              codigo: data.codigo,
              direccion: data.direccion,
              medidor: data.medidor
            })
          }
        }
      ]
    });

    prompt.present();

  }

  updateAbonado(abonado):void {

    let prompt = this.alertCtrl.create({
      title: 'Actualizar Abonado',
      message: 'Edite la información',
      inputs: [
        {
          name: 'correlativo',
          placeholder: abonado.correlativo
        },
        {
          name: 'nombre',
          placeholder: abonado.nombre
        },
        {
          name: 'codigo',
          placeholder: abonado.codigo
        },
        {
          name: 'direccion',
          placeholder: abonado.direccion
        },
        {
          name: 'medidor',
          placeholder: abonado.medidor
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
            let newCorrelativo:Number = (data.correlativo != '') ? data.correlativo: abonado.correlativo;
            let newNombre:String = (data.nombre != '') ? data.nombre : abonado.nombre;
            let newCodigo:Number = (data.codigo!='') ? data.codigo : abonado.codigo;
            let newDireccion:String = (data.direccion != '') ? data.direccion : abonado.direccion;
            let newMedidor:Number = (data.medidor != '') ? data.medidor : abonado.medidor;

            this.abonados.update(abonado.$key, {
              correlativo: newCorrelativo,
              nombre: newNombre,
              codigo: newCodigo,
              direccion: newDireccion,
              medidor: newMedidor
            })
          }
        }
      ]
    });

    prompt.present();

  }

  removeAbonado(abonado):void {

    let prompt = this.alertCtrl.create({
      title: 'Eliminar Abonado',
      inputs: [
        {
          name: "nombre",
          placeholder: abonado.nombre,
          disabled: true
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
          text: 'Eliminar',
          handler: data => {
            this.firebaseService.removeAbonado(abonado.$key);
          }
        }
      ]
    });

    prompt.present();

  }

}
