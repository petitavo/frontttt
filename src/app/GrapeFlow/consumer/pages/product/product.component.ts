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
import { ProductDetailsComponent } from "../../components/product-details/product-details.component";
import { LoteService } from "../../../producer/services/lote.service";
import { LoteDetailsComponent } from "../../../producer/components/lote-details/lote-details.component";

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
  filterValue: string = '';  // Nueva propiedad para el filtro de búsqueda

  constructor(
    private productService: ProductService,
    private loteService: LoteService,
    private dialog: MatDialog
  ) {
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
    this.productService.getAll().subscribe(
      (products: Product[]) => {
        this.dataSource.data = products;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Método para aplicar el filtro de búsqueda
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (product: Product, filter: string) => {
      const searchText = filter.trim().toLowerCase();

      // Verifica si uvas es un array, de lo contrario, usa una cadena vacía.
      const uvasString = Array.isArray(product.uvas) ? product.uvas.join(', ').toLowerCase() : '';

      const nombre = product.nombre.toLowerCase();
      const tipo = product.tipo.toLowerCase();
      const region = product.region.toLowerCase();

      // Verificar si alguna de las propiedades incluye el texto buscado
      return nombre.includes(searchText) || tipo.includes(searchText) || region.includes(searchText) || uvasString.includes(searchText);
    };

    this.dataSource.filter = filterValue;
  }

  // Método que permite ver detalles del vino
  onViewDetails(product: Product): void {
    this.dialog.open(ProductDetailsComponent, {
      width: '600px',
      data: product
    });
  }

  // Método para manejar la compra de vino
  onBuyWine(event: Event, product: Product): void {
    event.stopPropagation();  // Evitar que el clic en "Comprar" abra los detalles
    console.log(`Has comprado el vino: ${product.nombre}`);
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
