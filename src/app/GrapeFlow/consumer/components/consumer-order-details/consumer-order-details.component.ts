  import {Component, Inject} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Order} from "../../../producer/model/order.entity";

@Component({
  selector: 'app-consumer-order-details',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './consumer-order-details.component.html',
  styleUrl: './consumer-order-details.component.css'
})
export class ConsumerOrderDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<ConsumerOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
