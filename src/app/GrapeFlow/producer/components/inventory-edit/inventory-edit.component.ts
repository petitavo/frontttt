import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inventory } from "../../model/inventory.entity";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-inventory-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent {
  constructor(
    public dialogRef: MatDialogRef<InventoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public inventoryData: Inventory
  ) {}

  onSave(): void {
    this.dialogRef.close(this.inventoryData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
