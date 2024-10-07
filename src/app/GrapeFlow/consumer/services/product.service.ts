import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product.entity';
import { BaseService} from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {
  constructor() {
    super();
    this.resourceEndPoint = '/wines';
  }

  override getAll(): Observable<Product[]> {
    return super.getAll().pipe(
      tap(products => console.log('Productos recibidos:', products))
    );
  }
}
