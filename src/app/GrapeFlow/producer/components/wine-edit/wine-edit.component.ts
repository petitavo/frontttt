import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Wine } from "../../model/wine.entity";
import { WineService } from "../../services/wine.service";

@Component({
  selector: 'app-wine-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './wine-edit.component.html',
  styleUrls: ['./wine-edit.component.css']
})
export class WineEditComponent {
  wine: Wine;

  constructor(
    public dialogRef: MatDialogRef<WineEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Wine,
    private productService: WineService
  ) {
    this.wine = { ...data };
  }

  onSave(): void {
    this.productService.update(this.wine.id, this.wine).subscribe({
      next: (updatedWine) => {
        this.dialogRef.close(updatedWine);
      },
      error: (error) => console.error('Error updating wine', error)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
