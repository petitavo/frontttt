import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order.entity';

@Component({
  selector: 'app-home-producer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-producer.component.html',
  styleUrls: ['./home-producer.component.css']
})
export class HomeProducerComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe(
      (data: Order[]) => {
        // Filtrar pedidos que están en estado "En Proceso" y mostrar solo los primeros 3
        this.orders = data.filter(order => order.estado === 'En Proceso').slice(0, 3);
      },
      (error) => {
        console.error('Error loading orders:', error);
      }
    );
  }

  // Redirigir a la ventana de pedidos completos
  goToOrders(): void {
    this.router.navigate(['/orders']);  // Redirige a la ruta de pedidos
  }
}
