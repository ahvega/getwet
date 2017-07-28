import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseService {

  constructor(public root: AngularFireDatabase) {
  }

  getAbonados() {
    return this.root.list('/abonados/')
  }

  addAbonado(data) {
    this.root.list('/abonados/').push(data);
  }

  removeAbonado(id) {
    this.root.list('/abonados/').remove(id);
  }

  getLecturas() {
    return this.root.list('/lecturas/')
  }

  addLectura(data) {
    this.root.list('/lecturas/').push(data);
  }

  removeLectura(id) {
    this.root.list('/lecturas/').remove(id);
  }

}
