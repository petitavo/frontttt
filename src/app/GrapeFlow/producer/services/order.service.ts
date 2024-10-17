// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from "../model/order.entity";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = '/api/orders'; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  // Método para obtener todos los pedidos
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Método para agregar un nuevo pedido
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  // Método para actualizar un pedido
  updateOrder(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
  }

  // Método para eliminar un pedido
  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
