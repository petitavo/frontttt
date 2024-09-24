export class Order {
  id: string;
  numeroPedido: string;
  fecha: string;
  tipo: string;
  estado: string;

  constructor(init?: Partial<Order>) {
    this.id = init?.id || '';
    this.numeroPedido = init?.numeroPedido || '';
    this.fecha = init?.fecha || '';
    this.tipo = init?.tipo || '';
    this.estado = init?.estado || 'Pendiente'; // Valor por defecto
  }
}
