import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
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
    FormsModule,
    MatSortModule
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit {
  protected clientsData!: Client;
  protected columnsToDisplay: string[] = ['firstName', 'lastName', 'phone', 'actions']; // Atributos traducidos a inglés
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected datasource: MatTableDataSource<Client>;
  private clientService: ClientService = inject(ClientService);

  constructor(private router: Router) {
    this.clientsData = new Client({ firstName: '', lastName: '', phone: '' }); // Atributos traducidos a inglés
    this.datasource = new MatTableDataSource<Client>();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  onDetails(client: Client) {
    this.router.navigate(['/producer/detailClients', client.id]);
  }

  onEdit(client: Client) {
    this.router.navigate(['/producer/editClients', client.id]);
  }

  onDelete(client: Client) {
    if (confirm(`Are you sure you want to delete ${client.firstName} ${client.lastName}?`)) { // Mensaje de confirmación traducido
      this.clientService.delete(client.id).subscribe(
        () => {
          this.datasource.data = this.datasource.data.filter(c => c.id !== client.id);
          this.datasource._updateChangeSubscription();
          console.log('Client deleted successfully');
        },
        (error) => {
          console.error('Error deleting client', error);
        }
      );
    }
  }
  onCreate() {
    this.router.navigate(['/producer/createClients']);
  }
}
