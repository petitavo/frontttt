export class Lote {
  id: number; // ID del lote
  batchNumber: string; // Número del lote
  grape: string; // Tipo de uva
  starDate: string; // Fecha de inicio
  litersQuantity: string; // Cantidad de litros
  ph: string; // pH
  temperature: string; // Temperatura
  processStatus: string; // Estado del proceso
  producerId: string; // ID del productor

  constructor(lote: Partial<Lote> = {}) {
    this.id = lote.id ||0;
    this.batchNumber = lote.batchNumber || '';
    this.grape = lote.grape || '';
    this.starDate = lote.starDate || '';
    this.litersQuantity = lote.litersQuantity || '';
    this.ph = lote.ph || '';
    this.temperature = lote.temperature || '';
    this.processStatus = lote.processStatus || 'En Proceso';
    this.producerId = lote.producerId || '';
  }
}
