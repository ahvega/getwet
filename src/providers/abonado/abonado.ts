import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase }
  from "angularfire2/database";

@Injectable()
export class AbonadoProvider {

  constructor(
    public http: Http,
    private db: AngularFireDatabase) { }

    getAbonados(batch, lastKey?) {
      let query = {
        orderByKey: true,
        limitToFirst: batch,
      };

      if (lastKey) query['startAt'] = lastKey;

      return this.db.list('/abonados', {
        query
      })
    }

}
