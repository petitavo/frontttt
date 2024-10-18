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
import { MatDialog } from "@angular/material/dialog";
import { InventoryEditComponent } from "../../components/inventory-edit/inventory-edit.component";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from '@ngx-translate/core';

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
    MatSortModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  protected inventoryData: Inventory;
  protected columnsToDisplay: string[] = ['nombre', 'tipo', 'unidad', 'caducidad', 'costoU', 'cantidad', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected dataSource: MatTableDataSource<Inventory>;
  private inventoryService: InventoryService = inject(InventoryService);

  constructor(private dialog: MatDialog) {
    this.inventoryData = new Inventory({
      nombre: '', tipo: '', unidad: '', caducidad: '', costoU: 0, cantidad: 0
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(InventoryEditComponent, {
      width: '400px',
      data: new Inventory({
        nombre: '', tipo: '', unidad: '', caducidad: '', costoU: 0, cantidad: 0
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.create(result).subscribe(
          (newItem) => {
            this.dataSource.data = [...this.dataSource.data, newItem];
          },
          (error) => console.error('Error adding inventory item', error)
        );
      }
      // If result is undefined (cancel was clicked), do nothing
    });
  }

  onEdit(item: Inventory): void {
    const dialogRef = this.dialog.open(InventoryEditComponent, {
      width: '400px',
      data: {...item}  // Create a copy of the item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.update(result.id, result).subscribe(() => {
          this.getAllInventory(); // Refresh the inventory list
        });
      }
      // If result is undefined (cancel was clicked), do nothing
    });
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
