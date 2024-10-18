import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { Order } from "../../../producer/model/order.entity";
import { MatSort } from "@angular/material/sort";
import { OrderService } from "../../../producer/services/order.service";
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { ConsumerOrderDetailsComponent } from "../../components/consumer-order-details/consumer-order-details.component";
import { MatSelectModule, MatOption } from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-consumer-order',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatPaginator,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './consumer-order.component.html',
  styleUrls: ['./consumer-order.component.css']
})
export class ConsumerOrderComponent implements OnInit, AfterViewInit {
  datasource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  columnsToDisplay: string[] = ['numeroPedido', 'fecha', 'tipo', 'estado', 'actions'];
  filteredValue: string = '';
  selectedFilter: string = 'numeroPedido';

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
      this.datasource.data = orders;
    }, (error) => {
      console.error('Error al obtener pedidos:', error);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.selectedFilter === 'numeroPedido') {
      this.datasource.filterPredicate = (data: Order, filter: string) =>
        data.numeroPedido.toLowerCase().includes(filter);
    } else if (this.selectedFilter === 'tipo') {
      this.datasource.filterPredicate = (data: Order, filter: string) =>
        data.tipo.toLowerCase().includes(filter);
    } else if (this.selectedFilter === 'estado') {
      this.datasource.filterPredicate = (data: Order, filter: string) =>
        data.estado.toLowerCase().includes(filter);
    }
    this.datasource.filter = filterValue;
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.datasource.filter = ''; // Limpiar filtro al cambiar
  }

  onViewDetails(order: Order): void {
    this.dialog.open(ConsumerOrderDetailsComponent, {
      width: '600px',
      data: order
    });
  }

  onChangeStatus(order: Order): void {
    const newStatus = order.estado === 'En Proceso' ? 'Terminado' : 'En Proceso';

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

  onDelete(order: Order): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el pedido ${order.numeroPedido}?`)) {
      this.orderService.deleteOrder(order.id).subscribe(
        () => {
          this.datasource.data = this.datasource.data.filter(o => o.id !== order.id);
        },
        (error: any) => {
          console.error('Error al eliminar el pedido:', error);
        }
      );
    }
  }
}
