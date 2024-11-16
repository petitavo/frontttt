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
import { InventoryEditComponent } from "../inventory-edit/inventory-edit.component";

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
  protected columnsToDisplay: string[] = ['name', 'type', 'unit', 'expirationDate', 'unitCost', 'quantity', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected dataSource: MatTableDataSource<Inventory>;
  private inventoryService: InventoryService = inject(InventoryService);

  constructor(private InventoryService: InventoryService, private dialog: MatDialog) {
    this.inventoryData = new Inventory({
      name: '', type: '', unit: '', expirationDate: '', unitCost: 0, quantity: 0, supplier: '', lastUpdated: '', producerId: ''
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSave(): void {
    this.inventoryService.create(this.inventoryData).subscribe(
      (newItem) => {
        this.dataSource.data = [...this.dataSource.data, newItem];
        this.inventoryData = new Inventory({
          name: '', type: '', unit: '', expirationDate: '', unitCost: 0, quantity: 0, supplier: '', lastUpdated: '', producerId: ''
        });
      },
      (error) => console.error('Error adding inventory item', error)
    );
  }

  onEdit(item: Inventory): void {
    const dialogRef = this.dialog.open(InventoryEditComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.update(result.id, result).subscribe(() => {
          this.getAllInventory(); // Refresh the inventory list
        });
      }
    });
  }

  onDelete(item: Inventory): void {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      this.inventoryService.delete(item.id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(i => i.id !== item.id);
        },
        (error) => console.error('Error deleting inventory item', error)
      );
    }
  }
}
