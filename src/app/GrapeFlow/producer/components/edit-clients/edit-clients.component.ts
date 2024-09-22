import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Client} from "../../model/client.entity";
import {ClientService} from "../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-clients',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './edit-clients.component.html',
  styleUrl: './edit-clients.component.css'
})
export class EditClientsComponent {
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
      this.router.navigate(['/clients']); // Redirigir si no hay ID
    }
  }

  onSave() {
    this.clientService.update(this.client.id, this.client).subscribe(() => {
      console.log('Cliente actualizado con éxito');
      this.router.navigate(['/clients']);
    });
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
}
