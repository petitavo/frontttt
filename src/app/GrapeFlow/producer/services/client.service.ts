import { Injectable } from '@angular/core';
import { BaseService } from "../../../shared/services/base.service";
import { Client } from "../model/client.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<Client> {
  constructor() {
    super();
    this.resourceEndPoint = '/clients';
  }
  //nuevo
  getById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // The delete method is already inherited from BaseService,
  // so we don't need to define it here again.
}
