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
//  abonadosLst = [];

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
          name: 'nombre',
          placeholder: 'Nombre'
        },
        {
          name: 'codigo_banco',
          placeholder: 'Código Banco'
        },
        {
          name: 'direccion',
          placeholder: 'Dirección'
        },
        {
          name: 'numero_medidor',
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
              nombre: data.nombre,
              codigo_banco: data.codigo_banco,
              direccion: data.direccion,
              numero_medidor: data.numero_medidor
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
          name: 'nombre',
          placeholder: abonado.nombre
        },
        {
          name: 'codigo_banco',
          placeholder: abonado.codigo_banco
        },
        {
          name: 'direccion',
          placeholder: abonado.direccion
        },
        {
          name: 'numero_medidor',
          placeholder: abonado.numero_medidor
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
            let newNombre:String = (data.nombre != '') ? data.nombre : abonado.nombre;
            let newCodigo_banco:Number = (data.codigo_banco!='') ? data.codigo_banco : abonado.codigo_banco;
            let newDireccion:String = (data.direccion != '') ? data.direccion : abonado.direccion;
            let newNumero_medidor:Number = (data.numero_medidor != '') ? data.numero_medidor : abonado.numero_medidor;

            this.abonados.update(abonado.$key, {
              nombre: newNombre,
              codigo_banco: newCodigo_banco,
              direccion: newDireccion,
              numero_medidor: newNumero_medidor
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
