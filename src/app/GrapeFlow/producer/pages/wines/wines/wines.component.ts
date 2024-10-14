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
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

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
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardHeader,
    MatCard
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
      },
      error: (error) => console.error('Error fetching wines:', error)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
            // Optionally, show a message to the user that the lot was not found
          }
        });
    } else {
      console.error('No lot associated with this wine');
      // Optionally, show a message to the user that there's no lot associated with this wine
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
