import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { Order } from "../../../producer/model/order.entity";
import { Client } from "../../../producer/model/client.entity";
import { ClientService } from "../../../producer/services/client.service";

@Component({
  selector: 'app-consumer-order-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './consumer-order-details.component.html',
  styleUrl: './consumer-order-details.component.css'
})
export class ConsumerOrderDetailsComponent implements OnInit {
  producer: Client | null = null;

  constructor(
    public dialogRef: MatDialogRef<ConsumerOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadProducerData();
  }

  loadProducerData(): void {
    if (this.data.producer_id) {
      this.clientService.getById(this.data.producer_id).subscribe(
        (client: Client) => {
          this.producer = client;
        },
        (error) => {
          console.error('Error fetching producer data:', error);
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
