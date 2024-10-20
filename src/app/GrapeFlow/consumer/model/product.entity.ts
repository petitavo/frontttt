export class Product {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  region: string;
  anio: number;
  uvas: string[];
  pais: string;
  alcohol: number;
  certificacion: string | number;
  calificacion: number;
  estado: string;
  producer_id: string;
  lote_id: string;
  lote: string;
  link: string;

  constructor(product: Partial<Product> = {}) {
    this.id = product.id || '';
    this.nombre = product.nombre || '';
    this.descripcion = product.descripcion || '';
    this.tipo = product.tipo || '';
    this.region = product.region || '';
    this.anio = product.anio || 0;
    this.pais = product.pais || '';
    this.uvas = product.uvas || [];
    this.alcohol = product.alcohol || 0;
    this.certificacion = product.certificacion || '';
    this.estado = product.estado || '';
    this.calificacion = product.calificacion || 0;
    this.producer_id = product.producer_id || '';
    this.lote_id = product.lote_id || '';
    this.lote = product.lote || '';
    this.link = product.link || '';
  }
}
