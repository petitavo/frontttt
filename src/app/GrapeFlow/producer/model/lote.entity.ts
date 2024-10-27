export class Lote {
  id: string;
  numeroLote: string;
  uva: string;
  fechaInicio: string;
  cantidadLitros: number;
  pH: number;
  temperatura: number;
  estadoProceso: string;
  producer_id: string;

  constructor(lote: Partial<Lote> = {}) {
    this.id = lote.id || '';
    this.numeroLote = lote.numeroLote || '';
    this.uva = lote.uva || '';
    this.fechaInicio = lote.fechaInicio || '';
    this.cantidadLitros = lote.cantidadLitros || 0;
    this.pH = lote.pH || 0;
    this.temperatura = lote.temperatura || 0;
    this.estadoProceso = lote.estadoProceso || 'En Proceso';
    this.producer_id = lote.producer_id || '';
  }
}
