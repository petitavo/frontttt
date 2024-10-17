export class Wine {
  id: string;
  nombre: string;
  descripcion: string; // Asegúrate de que el nombre de esta propiedad sea 'descripcion'
  tipo: string;
  region: string;
  pais: string;
  anio: number;
  uvas: string[];
  alcohol: number;
  certificacion: string;
  calificacion: number;
  estado: string;
  productor_id: string;
  lote_id: string;
  link: string;

  constructor(wine: Partial<Wine> = {}) {
    this.id = wine.id || '';
    this.nombre = wine.nombre || '';
    this.descripcion = wine.descripcion || ''; // Aquí debe estar correctamente definido
    this.tipo = wine.tipo || '';
    this.region = wine.region || '';
    this.pais = wine.pais || '';
    this.anio = wine.anio || 0;
    this.uvas = wine.uvas || [];
    this.alcohol = wine.alcohol || 0;
    this.certificacion = wine.certificacion || '';
    this.calificacion = wine.calificacion || 0;
    this.estado = wine.estado || '';
    this.productor_id = wine.productor_id || '';
    this.lote_id = wine.lote_id || '';
    this.link = wine.link || '';
  }
}
