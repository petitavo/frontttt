import { Component } from '@angular/core';
import { Client } from "../../model/client.entity";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatInput, MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {
  newClient: Client = new Client({firstName: '', lastName: '', phone: '', address: '', city: '', country: '', dni: '', email: ''});

  constructor(private clientService: ClientService, private router: Router) {}
  private nextId = 13;
  onAdd(): void {

    this.newClient.id = this.nextId.toString();
    this.nextId++;

    this.clientService.create(this.newClient).subscribe(() => {
      this.router.navigate(['/producer/clients']);
    });
  }

  goBack(): void {
    this.router.navigate(['/producer/clients']);
  }
}
