import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import { CommonModule } from '@angular/common';
import { Product } from "../../model/product.entity";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogContent, MatDialogActions],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  lotes$: Observable<any[]>; // Observable para los lotes

  constructor(
      public dialogRef: MatDialogRef<ProductDetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Product,
      private http: HttpClient
  ) {
    // Carga los lotes desde el JSON
    this.lotes$ = this.http.get<any>('assets/db.json').pipe(
        map((response) => response.lotes), // Extrae solo los lotes
        catchError(error => {
          console.error('Error cargando lotes', error);
          return of([]); // Retorna un array vacío en caso de error
        })
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
