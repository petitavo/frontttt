import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from "../model/order.entity";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> {
  constructor() {
    super();
    this.resourceEndPoint = '/orders';
  }

  // Método para obtener todos los pedidos
  override getAll(): Observable<Order[]> {
    return super.getAll();
  }

  // Método para agregar un nuevo pedido
  addOrder(order: Order): Observable<Order> {
    return this.create(order);
  }

  // Método para actualizar un pedido
  updateOrder(id: string, order: Order): Observable<Order> {
    return this.update(id, order);
  }

  // Método para eliminar un pedido
  deleteOrder(id: string): Observable<any> {
    return this.delete(id);
  }
}
