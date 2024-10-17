import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Product } from '../../model/product.entity';
import { ProductService } from '../../services/product.service';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { ProductDetailsComponent } from "../../components/product-details/product-details.component";
import { LoteService } from "../../../producer/services/lote.service";
import { LoteDetailsComponent } from "../../../producer/components/lote-details/lote-details.component";
import { OrderDetailsDialogComponent } from '../../components/order-details-dialog/order-details-dialog.component';
import { OrderService } from '../../../producer/services/order.service';
import { Order } from "../../../producer/model/order.entity";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filterValue: string = '';
  selectedFilter: string = 'nombre';

  tipos: string[] = [];
  uvas: string[] = [];
  filterOptions: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private loteService: LoteService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  ngAfterViewInit(): void {}

  private getAllProduct(): void {
    this.productService.getAll().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.filteredProducts = products;

        this.tipos = [...new Set(products.map(product => product.tipo))];
        this.uvas = [...new Set(products.flatMap(product => product.uvas))];
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      if (this.selectedFilter === 'nombre') {
        return product.nombre.toLowerCase().includes(filterValue);
      } else if (this.selectedFilter === 'tipo') {
        return product.tipo.toLowerCase().includes(filterValue);
      } else if (this.selectedFilter === 'uvas') {
        const uvasString = Array.isArray(product.uvas) ? product.uvas.join(', ').toLowerCase() : '';
        return uvasString.includes(filterValue);
      }
      return true;
    });
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.filterValue = '';

    if (filter === 'tipo') {
      this.filterOptions = ['Todos', ...this.tipos];
    } else if (filter === 'uvas') {
      this.filterOptions = ['Todos', ...this.uvas];
    } else {
      this.filterOptions = [];
    }
  }

  onSelectOption(option: string): void {
    if (option === 'Todos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => {
        if (this.selectedFilter === 'tipo') {
          return product.tipo.toLowerCase() === option.toLowerCase();
        } else if (this.selectedFilter === 'uvas') {
          return product.uvas.some(uva => uva.toLowerCase() === option.toLowerCase());
        }
        return true;
      });
    }
  }

  onViewDetails(product: Product): void {
    this.dialog.open(ProductDetailsComponent, {
      width: '600px',
      data: product
    });
  }

  onBuyWine(event: Event, product: Product): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '600px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newOrder = new Order({
          numeroPedido: `P00${Math.floor(Math.random() * 1000)}`,
          fecha: new Date().toISOString().split('T')[0],
          fechaEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nombre: result.nombre,
          correo: result.correo,
          productos: [`${product.nombre} - ${product.descripcion}`],
          condicionTransporte: result.condicionTransporte,
          metodoPago: result.metodoPago,
          telefono: result.telefono,
          terminosPago: result.terminosPago,
          tipo: product.tipo,
          estado: 'En Proceso'
        });

        this.orderService.addOrder(newOrder).subscribe(
          () => {
            console.log('Pedido registrado:', newOrder);
          },
          (error) => {
            console.error('Error al registrar el pedido:', error);
          }
        );
      }
    });
  }

  onViewLot(product: Product): void {
    if (product.lote_id) {
      this.loteService.getById(product.lote_id).subscribe({
        next: (lote) => {
          this.dialog.open(LoteDetailsComponent, {
            width: '600px',
            data: lote
          });
        },
        error: (error) => {
          console.error('Error fetching lot details:', error);
        }
      });
    } else {
      console.error('No lot associated with this product');
    }
  }
}
