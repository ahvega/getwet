import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AbonadoProvider } from "../../providers/abonado/abonado";
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

  constructor(private abonadosProvider: AbonadoProvider,
              public alertCtrl: AlertController,
              public firebaseService: FirebaseService) {
    this.abonados = this.firebaseService.getAbonados();

  }

  ngOnInit() {
    this.getAbonados()
  }

  onScroll(infiniteScroll) {
    console.log('scrolled!');
    this.getAbonados();

    infiniteScroll.complete();
  }

  private getAbonados(key?) {
    if (this.finished) return;

    this.abonadosProvider
      .getAbonados(this.batch+1, this.lastKey)
      .do(abonados => {

        // setear lastKey en preparacion par ala próxima query
        this.lastKey = _.last(abonados)['$key'];
        const newAbonados = _.slice(abonados, 0, this.batch);

        // obtener los primeros abonados en el BehaviorSubject
        const currentAbonados = this.abonadosList.getValue();
        console.log(currentAbonados);

        // Si la data es identica, parar de hacer queries
        if (this.lastKey == _.last(newAbonados)['$key']) {
          this.finished = true
        }

        // Concatenar nuevos abonados con abonados actuales
        this.abonadosList.next(_.concat(currentAbonados, newAbonados))

      })
      .take(1)
      .subscribe()
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

}
