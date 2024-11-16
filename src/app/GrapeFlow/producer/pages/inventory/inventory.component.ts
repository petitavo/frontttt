import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatIconModule,
    TranslateModule,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardActions
  ],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  protected inventoryData: Inventory[] = [];
  protected columnsToDisplay: string[] = ['name', 'type', 'unit', 'expirationDate', 'unitCost', 'quantity', 'actions'];
  selectedFilter: string = 'name'; // Valor por defecto del filtro
  searchValue: string = ''; // Valor de búsqueda
  filteredData: Inventory[] = []; // Datos filtrados

  private inventoryService: InventoryService = inject(InventoryService);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllInventory();
  }

  private getAllInventory(): void {
    this.inventoryService.getAll().subscribe((inventory: Inventory[]) => {
      this.inventoryData = inventory;
      this.applyFilter(); // Aplicar filtro cuando se obtienen los datos
    });
  }

  // Aplicar el filtro basándose en el valor de búsqueda y el filtro seleccionado
  applyFilter(): void {
    const filterValue = this.searchValue.trim().toLowerCase();
    if (!filterValue) {
      this.filteredData = [...this.inventoryData];
      return;
    }

    this.filteredData = this.inventoryData.filter(item => {
      switch (this.selectedFilter) {
        case 'name':
          return item.name.toLowerCase().includes(filterValue);
        case 'type':
          return item.type.toLowerCase().includes(filterValue);
        case 'supplier':
          return item.supplier.toLowerCase().includes(filterValue);
        default:
          return false;
      }
    });
  }

  // Actualiza el filtro seleccionado
  onFilterChange(): void {
    this.applyFilter();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(InventoryEditComponent, {
      width: '400px',
      data: new Inventory({
        name: '',
        type: '',
        unit: '',
        expirationDate: '',
        unitCost: 0,
        quantity: 0,
        supplier: ''
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.create(result).subscribe(
          (newItem) => {
            this.inventoryData = [...this.inventoryData, newItem];
            this.applyFilter(); // Aplicar el filtro después de agregar un nuevo ítem
          },
          (error) => console.error('Error adding inventory item', error)
        );
      }
    });
  }

  onEdit(item: Inventory): void {
    const dialogRef = this.dialog.open(InventoryEditComponent, {
      width: '400px',
      data: { ...item }
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
          this.inventoryData = this.inventoryData.filter(i => i.id !== item.id);
          this.applyFilter(); // Aplicar el filtro después de eliminar un ítem
        },
        (error) => console.error('Error deleting inventory item', error)
      );
    }
  }
}
