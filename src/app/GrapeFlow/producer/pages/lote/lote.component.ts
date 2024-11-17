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
import { Lote } from '../../model/lote.entity';
import { LoteService } from '../../services/lote.service';
import { LoteDetailsComponent } from '../../components/lote-details/lote-details.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LoteAddComponent } from '../../components/lote-add/lote-add.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-lote',
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
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.css']
})
export class LoteComponent implements OnInit, AfterViewInit {
  protected columnsToDisplay: string[] = ['batchNumber', 'grape', 'startDate', 'processStatus', 'producerId', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected dataSource: MatTableDataSource<Lote>;
  private loteService: LoteService = inject(LoteService);
  private dialog: MatDialog = inject(MatDialog);

  constructor() {
    this.dataSource = new MatTableDataSource<Lote>();
  }

  ngOnInit(): void {
    this.getAllLotes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllLotes(): void {
    this.loteService.getAll().subscribe(
      (lotes: Lote[]) => {
        console.log(lotes);  // Verifica si los datos contienen starDate correctamente
        this.dataSource.data = lotes;
      },
      (error) => {
        console.error('Error al obtener los lotes', error);
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(lote: Lote): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el lote ${lote.batchNumber}?`)) {
      this.loteService.delete(lote.id).subscribe( // Usar lote.id aquí
        () => {
          this.dataSource.data = this.dataSource.data.filter(l => l.id !== lote.id); // Filtrar por id
          this.dataSource._updateChangeSubscription();
        },
        (error) => console.error('Error deleting lote', error)
      );
    }
  }

  onViewDetails(lote: Lote): void {
    this.dialog.open(LoteDetailsComponent, {
      width: '600px',
      data: lote
    });
  }

  onChangeStatus(lote: Lote): void {
    console.log('Estado actual:', lote.processStatus); // Verificar estado actual
    const newStatus = lote.processStatus === 'En Proceso' ? 'Terminado' : 'En Proceso';
    console.log('Nuevo estado:', newStatus); // Verificar nuevo estado

    this.loteService.update(lote.id, { ...lote, processStatus: newStatus }).subscribe(
      (updatedLote) => {
        const index = this.dataSource.data.findIndex(l => l.id === updatedLote.id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedLote;
          this.dataSource._updateChangeSubscription();
        }
      },
      (error) => console.error('Error updating lote status', error)
    );
  }

  openAddLoteDialog(): void {
    const dialogRef = this.dialog.open(LoteAddComponent, {
      width: '400px',
      data: {} // Pasa los datos que necesites al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllLotes(); // Actualiza la lista después de cerrar el diálogo
      }
    });
  }
}
