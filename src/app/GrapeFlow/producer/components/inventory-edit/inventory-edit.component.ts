import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inventory } from "../../model/inventory.entity";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { NgForOf } from "@angular/common";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import { MatNativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-inventory-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgForOf,
    MatOption,
    MatSelect,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },  // Cambiar a NativeDateAdapter
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ],
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent {
  unitOptions = ['kg', 'liters', 'grams', 'pieces']; // Opciones para las unidades

  constructor(
    public dialogRef: MatDialogRef<InventoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public inventoryData: Inventory
  ) {
    // Formatea expirationDate al cargar el componente (sin la parte de la hora)
    if (this.inventoryData.expirationDate) {
      const date = new Date(this.inventoryData.expirationDate);
      this.inventoryData.expirationDate = date.toISOString().split('T')[0]; // Solo la fecha (yyyy-MM-dd)
    } else {
      this.inventoryData.expirationDate = ''; // Asigna un valor vacío si no existe
    }
  }

  onSave(): void {
    // Asegúrate de que expirationDate esté formateada correctamente antes de guardar
    const date = new Date(this.inventoryData.expirationDate);
    this.inventoryData.expirationDate = date.toISOString().split('T')[0]; // Solo la fecha (yyyy-MM-dd)
    this.dialogRef.close(this.inventoryData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
