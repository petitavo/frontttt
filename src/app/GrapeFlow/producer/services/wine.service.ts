import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wine } from '../model/wine.entity';
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class WineService extends BaseService<Wine> {
  constructor() {
    super();
    this.resourceEndPoint = '/wines';
  }

  getPopularWines(): Observable<Wine[]> {
    return this.getAll();
  }
}
