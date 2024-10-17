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
import {LoteDetailsComponent} from "../lote-details/lote-details.component";
import {MatDialog} from "@angular/material/dialog";
import {OrdersDetailsComponent} from "../orders-details/orders-details.component";

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
export class OrdersComponent implements OnInit, AfterViewInit {
  datasource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  columnsToDisplay: string[] = ['numeroPedido', 'fecha', 'tipo', 'estado', 'actions'];
  filteredValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private dialog: MatDialog = inject(MatDialog);

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

  onViewDetails(order: Order): void {
    this.dialog.open(OrdersDetailsComponent, {
      width: '600px',
      data: order
    });
  }

  onChangeStatus(order: Order): void {
    console.log('Estado actual:', order.estado); // Verificar estado actual
    const newStatus = order.estado === 'En Proceso' ? 'Terminado' : 'En Proceso';
    console.log('Nuevo estado:', newStatus); // Verificar nuevo estado

    // Ajustar el llamado al método correcto
    this.orderService.updateOrder(order.id, { ...order, estado: newStatus }).subscribe(
      (updatedOrder) => {
        const index = this.datasource.data.findIndex(o => o.id === updatedOrder.id);
        if (index !== -1) {
          this.datasource.data[index] = updatedOrder;
          this.datasource._updateChangeSubscription();
        }
      },
      (error) => console.error('Error updating order status', error)
    );
  }

  onDelete(order: Order) {
    if (confirm(`¿Estás seguro de que quieres eliminar el pedido ${order.numeroPedido}?`)) {
      // Ajustar el llamado al método correcto
      this.orderService.deleteOrder(order.id).subscribe(
        () => {
          console.log('Pedido eliminado:', order);
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
