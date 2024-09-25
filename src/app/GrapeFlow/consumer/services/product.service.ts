import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../model/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000'; // Asegúrate de que esta URL sea correcta
  private resourceEndPoint = '/wines';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}${this.resourceEndPoint}`).pipe(
      tap(products => console.log('Productos recibidos:', products)),
      catchError(this.handleError<Product[]>('getAll', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable(subscriber => subscriber.next(result as T));
    };
  }
}
