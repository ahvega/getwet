import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseService {

  constructor(public db: AngularFireDatabase) {
  }

  getAbonados() {
    return this.db.list('/abonados/')
  }

  getAbonadosBatch(batch, lastKey?) {
    let query = {
      orderByKey: true,
      limitToFirst: batch,
    };

    if (lastKey) query['startAt'] = lastKey;

    return this.db.list('/abonados', {
      query
    })
  }

  addAbonado(data) {
    this.db.list('/abonados/').push(data);
  }

  removeAbonado(id) {
    this.db.list('/abonados/').remove(id);
  }

  getLecturas() {
    return this.db.list('/lecturas/')
  }

  // addLectura(data) {
  //   this.db.list('/lecturas/').push(data);
  // }

  removeLectura(id) {
    this.db.list('/lecturas/').remove(id);
  }

}
