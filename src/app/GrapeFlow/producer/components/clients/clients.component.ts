  import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { MatInputModule } from '@angular/material/input';
  import { MatSelectModule } from '@angular/material/select';
  import { MatButtonModule } from '@angular/material/button';
  import { MatPaginatorModule } from '@angular/material/paginator';
  import { FormsModule } from '@angular/forms';
  import {Client} from "../../model/client.entity";
  import {MatPaginator} from "@angular/material/paginator";
  import {MatSort, MatSortHeader} from "@angular/material/sort";
  import {ClientService} from "../../services/client.service";

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
      MatPaginator,
      FormsModule,
      MatSort,
      MatSortHeader
    ],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.css'
  })
  export class ClientsComponent implements OnInit, AfterViewInit {
    //#region Attributes

    protected clientsData!: Client;
    protected columnsToDisplay: string[] = ['id', 'nombre', 'apellido', 'telefono'];
    @ViewChild(MatPaginator, {static: false})
    protected paginator!: MatPaginator;
    @ViewChild(MatSort)
    protected sort!: MatSort;
    protected editMode: boolean = false;
    protected datasource!: MatTableDataSource<any>;
    private clientService: ClientService = inject(ClientService);

    //#endregion

    constructor() {
      this.editMode = false;
      this.clientsData = new Client({nombre: '', apellido: '', telefono: ''});
      this.datasource = new MatTableDataSource();
      console.log(this.clientsData);
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
  }
