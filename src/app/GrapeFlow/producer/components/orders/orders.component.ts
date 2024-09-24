import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormField, MatInput, MatInputModule} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {Order} from "../../model/order.entity";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import { MatSortModule } from '@angular/material/sort';
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatButtonModule,
    MatCell,
    MatTable,
    MatInputModule,
    MatFormField,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatRowDef,
    MatTableModule,
    MatSortModule,
    MatHeaderRowDef,
    MatIcon,
    DatePipe,
    MatOption,
    MatSelect
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit, AfterViewInit{
  datasource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  columnsToDisplay: string[] = ['numeroPedido', 'fecha', 'tipo', 'estado', 'actions'];
  filteredValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  private getAllOrders(): void {
    this.orderService.getAll().subscribe((orders: Order[]) => {
      console.log('Pedidos recibidos:', orders);
      this.datasource.data = orders;
    }, (error) => {
      console.error('Error al obtener pedidos:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  onViewDetails(order: Order) {
    console.log('Detalles del pedido:', order);
    // Navegar a detalles del pedido
  }

  onChangeStatus(order: Order) {
    console.log('Cambiar estado del pedido:', order);
    // Lógica para cambiar el estado del pedido
  }

  onDelete(order: Order) {
    if (confirm(`¿Estás seguro de que quieres eliminar el pedido ${order.numeroPedido}?`)) {
      this.orderService.delete(order.id).subscribe(
        () => {
          console.log('Pedido eliminado:', order);
          // Actualiza la fuente de datos para reflejar el cambio
          this.datasource.data = this.datasource.data.filter(o => o.id !== order.id);
        },
        (error) => {
          console.error('Error al eliminar el pedido:', error);
        }
      );
    }
  }

  onAddOrder() {
    console.log('Agregar nuevo pedido');
    // Navegar a agregar un nuevo pedido
  }
}
