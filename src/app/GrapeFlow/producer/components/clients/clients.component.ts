import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
export interface Client {
  nombre: string;
  apellido: string;
  negocio: string;
  telefono: string;
}
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{
  displayedColumns: string[] = ['nombre', 'apellido', 'negocio', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Client>();
  searchText = '';
  selectedFilter = 'nombre';
  ngOnInit() {
    // Aquí cargarías los datos de tu API
    this.dataSource.data = [
      {nombre: 'Carlos', apellido: 'Martinez', negocio: 'Vinos del Valle', telefono: '999 999 999'},
      {nombre: 'Laura', apellido: 'Gómez', negocio: 'Distribuidora Gómez', telefono: '999 999 999'},
      {nombre: 'Eduardo', apellido: 'Rodriguez', negocio: 'Viñedos Rodriguez', telefono: '999 999 999'},
      {nombre: 'Ana', apellido: 'Fernández', negocio: 'Bodegas Fernández', telefono: '999 999 999'},
      {nombre: 'José', apellido: 'Pérez', negocio: 'El Buen Vino', telefono: '999 999 999'},
    ];
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  onPageChange(event: PageEvent) {
    // Aquí manejarías la paginación, posiblemente haciendo una nueva llamada a la API
    console.log(event);
  }

  onDetails(client: Client) {
    console.log('Detalles de', client.nombre);
  }

  onEdit(client: Client) {
    console.log('Editar', client.nombre);
  }

  onDelete(client: Client) {
    console.log('Eliminar', client.nombre);
  }

  onAddClient() {
    console.log('Agregar nuevo cliente');
  }

}
