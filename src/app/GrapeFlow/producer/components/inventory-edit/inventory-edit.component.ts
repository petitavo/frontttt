import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inventory} from "../../model/inventory.entity";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-inventory-edit',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.css'
})
export class InventoryEditComponent {
  constructor(
    public dialogRef: MatDialogRef<InventoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public inventoryData: Inventory
  ) {}

  onSave(): void {
    // Emitir la acción de guardar y cerrar el diálogo
    this.dialogRef.close(this.inventoryData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
