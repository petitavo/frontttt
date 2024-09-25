export class Order {
  id: string;
  numeroPedido: string;
  nombre: string; // Nuevo campo
  correo: string; // Nuevo campo
  productos: string[]; // Nuevo campo (array de strings)
  condicionTransporte: string; // Nuevo campo
  metodoPago: string; // Nuevo campo
  telefono: string; // Nuevo campo
  terminosPago: string; // Nuevo campo
  fecha: string;
  fechaEntrega: string; // Nuevo campo
  tipo: string;
  estado: string;

  constructor(order: Partial<Order> ={}) {
    this.id = order.id || '';
    this.numeroPedido = order.numeroPedido || '';
    this.nombre = order.nombre || '';
    this.correo = order.correo || '';
    this.productos = order.productos || [];
    this.condicionTransporte = order.condicionTransporte || '';
    this.metodoPago = order.metodoPago || '';
    this.telefono = order.telefono || '';
    this.terminosPago = order.terminosPago || '';
    this.fecha = order.fecha || '';
    this.fechaEntrega = order.fechaEntrega || '';
    this.tipo = order.tipo || '';
    this.estado = order.estado || 'En Proceso';
  }
}
