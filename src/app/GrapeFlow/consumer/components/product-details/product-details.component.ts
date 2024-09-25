import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { CommonModule } from '@angular/common';
import { Product } from "../../model/product.entity";
import { MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] // Cambiado a styleUrls
})
export class ProductDetailsComponent {
  constructor(
      public dialogRef: MatDialogRef<ProductDetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
