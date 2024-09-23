export class Inventory {
  id: number;
  nombre: string;
  tipo: string;
  unidad: string;
  caducidad: string;
  costoU: number;
  ultimaActualizacion: string;
  cantidad: number;

  constructor(inventory: {
    id?: number;
    nombre: string;
    tipo: string;
    unidad: string;
    caducidad: string;
    costoU: number;
    ultimaActualizacion: string;
    cantidad: number;
  }) {
    this.id = inventory.id || 0;
    this.nombre = inventory.nombre;
    this.tipo = inventory.tipo;
    this.unidad = inventory.unidad;
    this.caducidad = inventory.caducidad;
    this.costoU = inventory.costoU;
    this.ultimaActualizacion = inventory.ultimaActualizacion;
    this.cantidad = inventory.cantidad;
  }
}
