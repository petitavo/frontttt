import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Order } from '../../../producer/model/order.entity';
import { Wine} from "../../../producer/model/wine.entity";

@Component({
  selector: 'app-buy-wine-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './buy-wine-dialog.component.html',
  styleUrls: ['./buy-wine-dialog.component.css']
})
export class BuyWineDialogComponent {
  order: Order;

  constructor(
    public dialogRef: MatDialogRef<BuyWineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { wine: Wine }
  ) {
    this.order = new Order({
      id: this.generateOrderId(),
      productos: [data.wine.nombre],
      estado: 'En Proceso',
      fecha: new Date().toISOString().split('T')[0]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({ order: this.order, wineType: this.data.wine.tipo });
  }

  private generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
