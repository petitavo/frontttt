import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Product } from "../../../../consumer/model/product.entity";
import { ProductService } from "../../../../consumer/services/product.service";
import { WineDetailsComponent } from "../../../components/wine-detail/wine-detail.component";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { WineAddComponent } from "../../../components/wine-add/wine-add.component";
import { WineEditComponent } from "../../../components/wine-edit/wine-edit.component";
import { LoteService } from "../../../services/lote.service";
import { LoteDetailsComponent } from "../../../components/lote-details/lote-details.component";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-wines',
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
    RouterLink,
    TranslateModule
  ],
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.css']
})
export class WinesComponent implements OnInit, AfterViewInit {
  protected columnsToDisplay: string[] = ['nombre', 'tipo', 'anio', 'region', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected dataSource: MatTableDataSource<Product>;
  private productService: ProductService = inject(ProductService);
  private loteService: LoteService = inject(LoteService);
  private dialog: MatDialog = inject(MatDialog);

  // Variables para los filtros
  selectedFilter: string = 'nombre';
  filterOptions: string[] = [];
  protected filteredWines: Product[] = [];

  constructor() {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.getAllWines();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllWines(): void {
    this.productService.getAll().subscribe({
      next: (wines: Product[]) => {
        this.dataSource.data = wines;
        this.filteredWines = wines; // Inicializa la lista filtrada
        this.setFilterOptions();
      },
      error: (error) => console.error('Error fetching wines:', error)
    });
  }

  // Método para aplicar el filtro basado en el tipo seleccionado
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredWines = this.dataSource.data.filter(wine => {
      if (this.selectedFilter === 'nombre') {
        return wine.nombre.toLowerCase().includes(filterValue);
      } else if (this.selectedFilter === 'tipo') {
        return wine.tipo.toLowerCase().includes(filterValue);
      } else if (this.selectedFilter === 'region') {
        return wine.region.toLowerCase().includes(filterValue);
      }
      return true;
    });
  }

  // Cambiar el filtro seleccionado
  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.filterOptions = this.getFilterOptionsForSelectedFilter();
  }

  // Opciones del filtro basadas en el tipo seleccionado
  getFilterOptionsForSelectedFilter(): string[] {
    if (this.selectedFilter === 'tipo') {
      return [...new Set(this.dataSource.data.map(wine => wine.tipo))];
    } else if (this.selectedFilter === 'region') {
      return [...new Set(this.dataSource.data.map(wine => wine.region))];
    } else {
      return [];
    }
  }

  // Método para configurar las opciones del filtro (cuando inician los datos)
  setFilterOptions(): void {
    this.filterOptions = this.getFilterOptionsForSelectedFilter();
  }

  // Seleccionar una opción de filtro
  onSelectOption(option: string): void {
    if (option === 'Todos') {
      this.filteredWines = this.dataSource.data;
    } else {
      this.filteredWines = this.dataSource.data.filter(wine => {
        if (this.selectedFilter === 'tipo') {
          return wine.tipo === option;
        } else if (this.selectedFilter === 'region') {
          return wine.region === option;
        }
        return true;
      });
    }
  }

  // Métodos de acciones
  onDelete(wine: Product): void {
    if (confirm(`Are you sure you want to delete the wine ${wine.nombre}?`)) {
      this.productService.delete(wine.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(w => w.id !== wine.id);
          this.dataSource._updateChangeSubscription();
        },
        error: (error) => console.error('Error deleting wine', error)
      });
    }
  }

  onViewDetails(wine: Product): void {
    this.dialog.open(WineDetailsComponent, {
      width: '600px',
      data: wine
    });
  }

  onViewLot(wine: Product): void {
    if (wine.lote_id) {
      this.loteService.getById(wine.lote_id)
        .pipe(
          catchError(error => {
            console.error('Error fetching lot details:', error);
            return of(null);
          })
        )
        .subscribe(lote => {
          if (lote) {
            this.dialog.open(LoteDetailsComponent, {
              width: '600px',
              data: lote
            });
          } else {
            console.error('Lot not found');
          }
        });
    } else {
      console.error('No lot associated with this wine');
    }
  }

  openAddWineDialog(): void {
    const dialogRef = this.dialog.open(WineAddComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllWines();
      }
    });
  }

  openEditWineDialog(wine: Product): void {
    const dialogRef = this.dialog.open(WineEditComponent, {
      width: '400px',
      data: { ...wine }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllWines();
      }
    });
  }
}
