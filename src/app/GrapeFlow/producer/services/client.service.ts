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

  getById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
