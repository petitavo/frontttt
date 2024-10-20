import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { Order } from '../../model/order.entity';
import { Client } from '../../model/client.entity';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-orders-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './orders-details.component.html',
  styleUrl: './orders-details.component.css'
})
export class OrdersDetailsComponent implements OnInit {
  client: Client | null = null;

  constructor(
    public dialogRef: MatDialogRef<OrdersDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData(): void {
    if (this.data.consumer_id) {
      this.clientService.getById(this.data.consumer_id).subscribe(
        (client: Client) => {
          this.client = client;
        },
        (error) => {
          console.error('Error fetching client data:', error);
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
