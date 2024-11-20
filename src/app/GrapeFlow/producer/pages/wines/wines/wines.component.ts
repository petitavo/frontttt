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
import {WineService} from "../../../services/wine.service";
import {Wine} from "../../../model/wine.entity";

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
  protected columnsToDisplay: string[] = ['name', 'type', 'year', 'region', 'actions']; // Cambié los nombres
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected dataSource: MatTableDataSource<Wine>; // Cambié de Product a Wine
  private wineService: WineService = inject(WineService); // Cambié de ProductService a WineService
  private loteService: LoteService = inject(LoteService);
  private dialog: MatDialog = inject(MatDialog);

  // Variables para los filtros
  selectedFilter: string = 'name'; // Cambié de 'nombre' a 'name'
  filterOptions: string[] = [];
  protected filteredWines: Wine[] = []; // Cambié de Product a Wine

  constructor() {
    this.dataSource = new MatTableDataSource<Wine>(); // Cambié de Product a Wine
  }

  ngOnInit(): void {
    this.getAllWines();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllWines(): void {
    this.wineService.getAll().subscribe({
      next: (wines: Wine[]) => { // Cambié de Product a Wine
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
      if (this.selectedFilter === 'name') { // Cambié de 'nombre' a 'name'
        return wine.name.toLowerCase().includes(filterValue); // Cambié de 'nombre' a 'name'
      } else if (this.selectedFilter === 'type') {
        return wine.type.toLowerCase().includes(filterValue);
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
    if (this.selectedFilter === 'type') { // Cambié de 'tipo' a 'type'
      return [...new Set(this.dataSource.data.map(wine => wine.type))]; // Cambié de 'tipo' a 'type'
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
    if (option === 'All') { // Cambié de 'Todos' a 'All'
      this.filteredWines = this.dataSource.data;
    } else {
      this.filteredWines = this.dataSource.data.filter(wine => {
        if (this.selectedFilter === 'type') { // Cambié de 'tipo' a 'type'
          return wine.type === option; // Cambié de 'tipo' a 'type'
        } else if (this.selectedFilter === 'region') {
          return wine.region === option;
        }
        return true;
      });
    }
  }

  onDelete(wine: Wine): void { // Cambié de Product a Wine
    if (confirm(`Are you sure you want to delete the wine ${wine.name}?`)) { // Cambié de 'nombre' a 'name'
      this.wineService.delete(wine.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(w => w.id !== wine.id);
          this.dataSource._updateChangeSubscription();
        },
        error: (error) => console.error('Error deleting wine', error)
      });
    }
  }

  onViewDetails(wine: Wine): void { // Cambié de Product a Wine
    this.dialog.open(WineDetailsComponent, {
      width: '600px',
      data: wine
    });
  }

  onViewLot(wine: Wine): void { // Cambié de Product a Wine
    if (wine.batchId) { // Cambié de 'lote_id' a 'batchId'
      this.loteService.getById(wine.batchId) // Cambié de 'lote_id' a 'batchId'
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

  openAddWineDialog(): void { // Cambié de openAddProductDialog a openAddWineDialog
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

  openEditWineDialog(wine: Wine): void { // Cambié de openEditProductDialog a openEditWineDialog
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
