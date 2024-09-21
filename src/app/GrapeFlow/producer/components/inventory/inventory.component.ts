import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../../model/inventory.entity';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule
  ],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  protected inventoryData: Inventory;
  protected columnsToDisplay: string[] = ['nombre', 'tipo', 'unidad', 'caducidad', 'proveedor', 'costoU', 'ultimaActualizacion', 'cantidad', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected dataSource: MatTableDataSource<Inventory>;
  private inventoryService: InventoryService = inject(InventoryService);

  constructor() {
    this.inventoryData = new Inventory({
      nombre: '', tipo: '', unidad: '', caducidad: '', proveedor: '', costoU: 0, ultimaActualizacion: '', cantidad: 0
    });
    this.dataSource = new MatTableDataSource<Inventory>();
  }

  ngOnInit(): void {
    this.getAllInventory();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllInventory(): void {
    this.inventoryService.getAll().subscribe((inventory: Inventory[]) => {
      this.dataSource.data = inventory;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSave(): void {
    this.inventoryService.create(this.inventoryData).subscribe(
      (newItem) => {
        this.dataSource.data = [...this.dataSource.data, newItem];
        this.inventoryData = new Inventory({
          nombre: '', tipo: '', unidad: '', caducidad: '', proveedor: '', costoU: 0, ultimaActualizacion: '', cantidad: 0
        });
      },
      (error) => console.error('Error adding inventory item', error)
    );
  }

  onEdit(item: Inventory): void {
    console.log('Edit', item);
    // Implement edit functionality
  }

  onDelete(item: Inventory): void {
    if (confirm(`¿Estás seguro de que quieres eliminar ${item.nombre}?`)) {
      this.inventoryService.delete(item.id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(i => i.id !== item.id);
        },
        (error) => console.error('Error deleting inventory item', error)
      );
    }
  }
}
