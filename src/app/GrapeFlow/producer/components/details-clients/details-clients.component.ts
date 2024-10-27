import { Component, OnInit } from '@angular/core';
import { Client } from "../../model/client.entity";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { MatButtonModule } from "@angular/material/button";
import { NgIf, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-details-clients',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './details-clients.component.html',
  styleUrls: ['./details-clients.component.css']
})
export class DetailsClientsComponent implements OnInit {
  client: Client | undefined;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientService.getById(clientId).subscribe(
        client => {
          this.client = client;
          console.log(this.client);
        },
        error => {
          console.error('Error fetching client details:', error);
          this.goBack();
        }
      );
    } else {
      console.error('Client ID is null');
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigate(['/producer/clients']);
  }

  editClient(): void {
    if (this.client && this.client.id) {
      this.router.navigate(['/producer/editClients', this.client.id]);
    } else {
      console.error('Cannot edit: Client or client ID is undefined');
    }
  }

  deleteClient(): void {
    if (this.client && this.client.id) {
      if (confirm('Are you sure you want to delete this client?')) {
        this.clientService.delete(this.client.id).subscribe(
          () => {
            console.log('Client deleted successfully');
            this.goBack();
          },
          error => {
            console.error('Error deleting client:', error);
          }
        );
      }
    } else {
      console.error('Cannot delete: Client or client ID is undefined');
    }
  }
}
