export class Order {
  id: string;
  numeroPedido: string;
  productos: string[];
  condicionTransporte: string;
  metodoPago: string;
  terminosPago: string;
  fecha: string;
  fechaEntrega: string;
  tipo: string;
  estado: string;
  producer_id: string;
  consumer_id: string;

  constructor(order: Partial<Order> = {}) {
    this.id = order.id || '';
    this.numeroPedido = order.numeroPedido || '';
    this.productos = order.productos || [];
    this.condicionTransporte = order.condicionTransporte || '';
    this.metodoPago = order.metodoPago || '';
    this.terminosPago = order.terminosPago || '';
    this.fecha = order.fecha || new Date().toISOString();
    this.fechaEntrega = order.fechaEntrega || '';
    this.tipo = order.tipo || '';
    this.estado = order.estado || 'En Proceso';
    this.producer_id = order.producer_id || '';
    this.consumer_id = order.consumer_id || '';
  }
}
