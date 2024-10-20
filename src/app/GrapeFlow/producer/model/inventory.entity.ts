export class Inventory {
  id: number;
  nombre: string;
  tipo: string;
  unidad: string;
  caducidad: string;
  costoU: number;
  cantidad: number;
  producer_id: string;

  constructor(inventory: {
    id?: number;
    nombre: string;
    tipo: string;
    unidad: string;
    caducidad: string;
    costoU: number;
    cantidad: number;
    producer_id: string;
  }) {
    this.id = inventory.id || 0;
    this.nombre = inventory.nombre;
    this.tipo = inventory.tipo;
    this.unidad = inventory.unidad;
    this.caducidad = inventory.caducidad;
    this.costoU = inventory.costoU;
    this.cantidad = inventory.cantidad;
    this.producer_id = inventory.producer_id;
  }
}
