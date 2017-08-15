import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import { AlertController } from "ionic-angular";
import { FirebaseListObservable } from "angularfire2/database";
import { FirebaseService } from "../../providers/firebase-service/firebase-service";

@Component({
  selector: 'page-abonados-list',
  templateUrl: 'abonados-list.html',
})
export class AbonadosListPage implements OnInit {

  abonados: FirebaseListObservable<any[]>;
  abonadosList = new BehaviorSubject([]);

  batch = 10;       // tamaño de cada query
  lastKey = '';     // key desde donde offset la nueva query
  finished = false; // boolean cuando se alcance el final de los datos

  constructor(public alertCtrl: AlertController,
              public firebaseService: FirebaseService) {
    this.abonados = this.firebaseService.getAbonados();

  }

  ngOnInit() {
    this.getAbonados()
  }

  doInfiniteScroll(infiniteScroll) {
    this.getAbonados();
    infiniteScroll.complete();
  }

  addAbonado(): void {
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
            console.log("cancelado " + data);
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

  updateAbonado(abonado): void {
    let prompt = this.alertCtrl.create({
      title: 'Actualizar Abonado',
      message: 'Edite la información',
      inputs: [
        {
          name: 'correlativo',
          placeholder: abonado.correlativo,
          value: abonado.correlativo
        },
        {
          name: 'nombre',
          placeholder: abonado.nombre,
          value: abonado.nombre
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
            console.log("cancelado " + data);
          }
        },
        {
          text: "Guardar",
          handler: data => {
            let newCorrelativo: Number = (data.correlativo != '') ? data.correlativo : abonado.correlativo;
            let newNombre: String = (data.nombre != '') ? data.nombre : abonado.nombre;
            let newCodigo: Number = (data.codigo != '') ? data.codigo : abonado.codigo;
            let newDireccion: String = (data.direccion != '') ? data.direccion : abonado.direccion;
            let newMedidor: Number = (data.medidor != '') ? data.medidor : abonado.medidor;
            this.abonados.update(abonado.$key, {
              correlativo: newCorrelativo,
              nombre: newNombre,
              codigo: newCodigo,
              direccion: newDireccion,
              medidor: newMedidor
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removeAbonado(abonado): void {
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
            console.log("cancelado " + data);
          }
        },
        {
          text: 'Eliminar',
          handler: data => {
            console.log(data);
            this.firebaseService.removeAbonado(abonado.$key);
          }
        }
      ]
    });
    prompt.present();
  }

  private getAbonados(key?) {
    console.log('Parametro: ' + key);
    if (this.finished) return;

    this.firebaseService
      .getAbonadosBatch(this.batch + 1, this.lastKey)
      .do(abonados => {
        // setear lastKey en preparacion para la próxima query
        this.lastKey = _.last(abonados)['$key'];
        const newAbonados = _.slice(abonados, 0, this.batch);
        // Si la data es identica, parar de hacer queries
        if (this.lastKey == _.last(newAbonados)['$key']) {
          this.finished = true
        }
        // obtener los primeros abonados en el BehaviorSubject
        const currentAbonados = this.abonadosList.getValue();
        // Concatenar nuevos abonados con abonados actuales
        this.abonadosList.next(_.concat(currentAbonados, newAbonados))
      })
      .take(1)
      .subscribe()
  }
}
