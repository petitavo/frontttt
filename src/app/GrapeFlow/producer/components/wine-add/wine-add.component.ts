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
  selector: 'app-wine-add',
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
  templateUrl: './wine-add.component.html',
  styleUrls: ['./wine-add.component.css']
})
export class WineAddComponent {
  wine: Product = new Product();
  lotes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<WineAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private loteService: LoteService
  ) {
    this.loadLotes();
  }

  loadLotes(): void {
    this.loteService.getAll().subscribe({
      next: (lotes) => this.lotes = lotes,
      error: (error) => console.error('Error loading lotes', error)
    });
  }

  onSave(): void {
    this.productService.create(this.wine).subscribe({
      next: (newWine) => {
        this.dialogRef.close(newWine);
      },
      error: (error) => console.error('Error creating wine', error)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
