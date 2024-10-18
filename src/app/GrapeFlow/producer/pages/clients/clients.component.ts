import {AfterViewInit, Component, inject, NO_ERRORS_SCHEMA, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Client } from "../../model/client.entity";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { ClientService } from "../../services/client.service";
import { Router } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatPaginatorModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    TranslateModule
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ClientsComponent implements OnInit, AfterViewInit {
  protected clientsData!: Client;
  protected columnsToDisplay: string[] = ['nombre', 'apellido', 'telefono', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected datasource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  private clientService: ClientService = inject(ClientService);

  constructor(private router: Router) {
    this.clientsData = new Client({ nombre: '', apellido: '', telefono: '' });
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  private getAllClients(): void {
    this.clientService.getAll().subscribe((clients: Client[]) => {
      this.datasource.data = clients;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    // Si tienes paginación, asegúrate de que se muestra correctamente después de aplicar el filtro
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  onDetails(client: Client): void {
    this.router.navigate(['/producer/detailClients', client.id]);
  }

  onEdit(client: Client): void {
    this.router.navigate(['/producer/editClients', client.id]);
  }

  onDelete(client: Client): void {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${client.nombre} ${client.apellido}?`)) {
      this.clientService.delete(client.id).subscribe(
        () => {
          // Actualizar la tabla eliminando al cliente borrado
          this.datasource.data = this.datasource.data.filter(c => c.id !== client.id);
          this.datasource._updateChangeSubscription(); // Forzar la actualización de la tabla
          console.log('Cliente eliminado con éxito');
        },
        (error) => {
          console.error('Error al eliminar el cliente', error);
        }
      );
    }
  }
}
