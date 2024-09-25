import {Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { Order } from '../../model/order.entity';

@Component({
  selector: 'app-orders-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './orders-details.component.html',
  styleUrl: './orders-details.component.css'
})
export class OrdersDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<OrdersDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
