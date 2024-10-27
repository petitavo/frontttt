import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Product} from "../../../consumer/model/product.entity";
import { ProductService} from "../../../consumer/services/product.service";
import { LoteService } from '../../services/lote.service';
import { CommonModule } from '@angular/common';

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
  wine: Product;
  lotes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<WineEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private loteService: LoteService
  ) {
    this.wine = { ...data };
    this.loadLotes();
  }

  loadLotes(): void {
    this.loteService.getAll().subscribe({
      next: (lotes) => this.lotes = lotes,
      error: (error) => console.error('Error loading lotes', error)
    });
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
