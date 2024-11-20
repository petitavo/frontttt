import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Lote } from '../model/lote.entity';
import { BaseService } from "../../../shared/services/base.service";
import {Order} from "../model/order.entity";

@Injectable({
  providedIn: 'root'
})
export class LoteService extends BaseService<Lote> {
  constructor() {
    super();
    this.resourceEndPoint = '/batches';
  }

  getById(id: string): Observable<Lote> {
    return this.getAll().pipe(
      map(lotes => {
        const foundLote = lotes.find(lote => lote.id.toString() === id);
        if (foundLote) {
          return foundLote;
        } else {
          throw new Error(`Lote with id ${id} not found`);
        }
      })
    );
  }

  override getAll(): Observable<Lote[]> {
    return super.getAll();
  }
}
