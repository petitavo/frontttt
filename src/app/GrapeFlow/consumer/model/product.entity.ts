export class Product {
  id: string; // Añadir id
  nombre: string;
  descripcion: string;
  tipo: string;
  region: string;
  anio: number;
  uvas: string;
  pais: string;
  alcohol: number;
  certificacion: number;
  calificacion: string;
  estado: string;
  productor_id: string;
  lote_id: string;
  lote: string;

  constructor(product: Partial<Product> = {}) {
    this.id = product.id || ''; // Inicializar id
    this.nombre = product.nombre || '';
    this.descripcion = product.descripcion || '';
    this.tipo = product.tipo || '';
    this.region = product.region || '';
    this.anio = product.anio || 0;
    this.pais = product.pais || '';
    this.uvas = product.uvas || '';
    this.alcohol = product.alcohol || 0;
    this.certificacion = product.certificacion || 0;
    this.estado = product.estado || '';
    this.calificacion = product.calificacion || '';
    this.productor_id = product.productor_id || '';
    this.lote_id = product.lote_id || '';
    this.lote = product.lote || '';

  }
}
