import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Client } from "../../model/client.entity";
import { ClientService } from "../../services/client.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-clients',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {
  client!: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');

    if (clientId) {
      this.clientService.getById(clientId).subscribe((client: Client) => {
        this.client = client;
      });
    } else {
      console.error('Client ID is null');
      this.router.navigate(['/producer/clients']);
    }
  }

  onSave() {
    if (this.client && this.client.id) {
      this.clientService.update(this.client.id, this.client).subscribe(() => {
        console.log('Cliente actualizado con éxito');
        this.router.navigate(['/producer/clients']);
      });
    } else {
      console.error('Client or client ID is undefined');
    }
  }

  onCancel() {
    this.router.navigate(['/producer/clients']);
  }
}
