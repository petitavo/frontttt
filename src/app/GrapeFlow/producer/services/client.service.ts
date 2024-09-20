import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Client} from "../model/client.entity";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<Client>{

  constructor() {
    super();
    this.resourceEndPoint = '/clients';


  }
}
