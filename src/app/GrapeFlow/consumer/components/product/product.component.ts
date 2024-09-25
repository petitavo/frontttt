import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Product } from '../../model/product.entity';
import { ProductService } from '../../services/product.service';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  protected columnsToDisplay: string[] = ['nombre', 'tipo', 'descripcion', 'uvas', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected dataSource: MatTableDataSource<Product>;

  constructor(private productService: ProductService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllProduct(): void {
    console.log('Fetching products...');
    this.productService.getAll().subscribe(
      (products: Product[]) => {
        console.log('Products received:', products);
        this.dataSource.data = products;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(product: Product): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el Producto ${product.nombre}?`)) {
      // Implementar lógica de eliminación aquí
    }
  }

  onViewDetails(product: Product): void {
    console.log('Viewing details for product:', product);
    // Implementar lógica para ver detalles aquí
  }
}
