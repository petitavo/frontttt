export class Inventory {
  id: number;
  name: string;
  type: string;
  unit: string;
  expirationDate: string; // renamed from 'caducidad'
  supplier: string; // renamed from 'proveedor'
  unitCost: number; // renamed from 'costoU'
  quantity: number; // renamed from 'cantidad'

  constructor(inventory: {
    id?: number;
    name: string;
    type: string;
    unit: string;
    expirationDate: string;
    supplier: string;
    unitCost: number;
    quantity: number;
  }) {
    this.id = inventory.id || 0;
    this.name = inventory.name;
    this.type = inventory.type;
    this.unit = inventory.unit;
    this.expirationDate = inventory.expirationDate;
    this.supplier = inventory.supplier;
    this.unitCost = inventory.unitCost;
    this.quantity = inventory.quantity;
  }
}
