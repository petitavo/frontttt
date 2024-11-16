import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Inventory } from '../model/inventory.entity';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends BaseService<Inventory> {
  constructor() {
    super();
    this.resourceEndPoint = '/inventories';
  }
}
