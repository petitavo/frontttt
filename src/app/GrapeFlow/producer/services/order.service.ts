import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Order} from "../model/order.entity";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> {

  constructor() {
    super();
    this.resourceEndPoint = '/orders'; // Asegúrate de usar el endpoint correcto
  }
}
