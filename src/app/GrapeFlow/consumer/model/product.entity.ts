export class Product {
  id: string; // Añadir id
  nombre: string;
  descripcion: string;
  tipo: string;
  region: string;
  anio: number;
  uvas: string[]; // Cambiado a array de strings
  pais: string;
  alcohol: number;
  certificacion: string | number; // Puede ser string o número
  calificacion: number; // Cambiado a número
  estado: string;
  productor_id: string;
  lote_id: string;
  lote: string;
  link: string; // Añadido el campo link

  constructor(product: Partial<Product> = {}) {
    this.id = product.id || ''; // Inicializar id
    this.nombre = product.nombre || '';
    this.descripcion = product.descripcion || '';
    this.tipo = product.tipo || '';
    this.region = product.region || '';
    this.anio = product.anio || 0;
    this.pais = product.pais || '';
    this.uvas = product.uvas || []; // Cambiado a array vacío por defecto
    this.alcohol = product.alcohol || 0;
    this.certificacion = product.certificacion || ''; // Puede ser string o número
    this.estado = product.estado || '';
    this.calificacion = product.calificacion || 0; // Inicializar como 0
    this.productor_id = product.productor_id || '';
    this.lote_id = product.lote_id || '';
    this.lote = product.lote || '';
    this.link = product.link || ''; // Inicializar link como string vacío
  }
}
