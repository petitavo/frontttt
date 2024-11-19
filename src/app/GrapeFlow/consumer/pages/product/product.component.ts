import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Wine} from "../../../producer/model/wine.entity";
import { WineService} from "../../../producer/services/wine.service";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { ProductDetailsComponent } from "../../components/product-details/product-details.component";
import { LoteService } from "../../../producer/services/lote.service";
import { LoteDetailsComponent } from "../../../producer/components/lote-details/lote-details.component";
import { OrderService } from '../../../producer/services/order.service';
import { Order } from "../../../producer/model/order.entity";
import { TranslateModule } from "@ngx-translate/core";
import { BuyWineDialogComponent } from "../../components/buy-wine-dialog/buy-wine-dialog.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    RouterLink,
    TranslateModule,
    MatSnackBarModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  wines: Wine[] = [];
  filteredWines: Wine[] = [];
  filterValue: string = '';
  selectedFilter: string = 'nombre';

  tipos: string[] = [];
  uvas: string[] = [];
  filterOptions: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private wineService: WineService,
    private loteService: LoteService,
    private dialog: MatDialog,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllWines();
  }

  ngAfterViewInit(): void {}

  private getAllWines(): void {
    this.wineService.getAll().subscribe(
      (wines: Wine[]) => {
        this.wines = wines;
        this.filteredWines = wines;

        this.tipos = [...new Set(wines.map(wine => wine.type))];
        this.uvas = [...new Set(wines.map(wine => wine.grapes))]; // Si grapes es un string, esto solo tendrá valores únicos.
      },
      error => {
        console.error('Error fetching wines:', error);
        this.showErrorMessage('Error fetching wines. Please try again.');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredWines = this.wines.filter(wine => {
      if (this.selectedFilter === 'nombre') {
        return wine.name.toLowerCase().includes(filterValue);
      } else if (this.selectedFilter === 'tipo') {
        return wine.type.toLowerCase().includes(filterValue);
      } else if (this.selectedFilter === 'uvas') {
        // Cambié la lógica aquí para trabajar con wine.grapes como un string
        return wine.grapes.toLowerCase().includes(filterValue); // Usamos includes en lugar de some
      }
      return true;
    });
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.filterValue = '';

    if (filter === 'tipo') {
      this.filterOptions = ['Todos', ...this.tipos];
    } else if (filter === 'uvas') {
      this.filterOptions = ['Todos', ...this.uvas];
    } else {
      this.filterOptions = [];
    }
  }

  onSelectOption(option: string): void {
    if (option === 'Todos') {
      this.filteredWines = this.wines;
    } else {
      this.filteredWines = this.wines.filter(wine => {
        if (this.selectedFilter === 'tipo') {
          return wine.type.toLowerCase() === option.toLowerCase();
        } else if (this.selectedFilter === 'uvas') {
          // Si 'uvas' es un string, simplemente verifica si la opción seleccionada está en el string
          return wine.grapes.toLowerCase().includes(option.toLowerCase());
        }
        return true;
      });
    }
  }

  onViewDetails(wine: Wine): void {
    this.dialog.open(ProductDetailsComponent, {
      width: '600px',
      data: wine
    });
  }

  onViewLot(wine: Wine): void {
    if (wine.batchId) {
      this.loteService.getById(wine.batchId).subscribe({
        next: (lote) => {
          this.dialog.open(LoteDetailsComponent, {
            width: '600px',
            data: lote
          });
        },
        error: (error) => {
          console.error('Error fetching lot details:', error);
          this.showErrorMessage('Error fetching lot details. Please try again.');
        }
      });
    } else {
      console.error('No lot associated with this wine');
      this.showErrorMessage('No lot associated with this wine.');
    }
  }

  onBuyWine(event: Event, wine: Wine): void {
    event.stopPropagation(); // Prevent event bubbling

    const dialogRef = this.dialog.open(BuyWineDialogComponent, {
      width: '400px',
      data: { wine: wine }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Create a new order object with the wine type included
        const newOrder: Order = {
          ...result.order,
          id: this.generateOrderId(),
          tipo: wine.type // Include the wine type in the order
        };

        this.orderService.addOrder(newOrder).subscribe(
          (createdOrder: Order) => {
            console.log('Order placed successfully:', createdOrder);
            this.showSuccessMessage(`Order placed successfully. Order ID: ${createdOrder.id}, Wine Type: ${createdOrder.tipo}`);
          },
          error => {
            console.error('Error placing order:', error);
            this.showErrorMessage('Error placing order. Please try again.');
          }
        );
      }
    });
  }

  private generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
