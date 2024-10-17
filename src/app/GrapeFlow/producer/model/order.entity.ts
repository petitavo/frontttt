export class Order {
  id: string;
  numeroPedido: string;
  nombre: string;
  nombreProductor: string;
  correoProductor: string;
  correo: string;
  productos: string[]; // Arreglo de productos
  condicionTransporte: string;
  metodoPago: string;
  telefonoProductor: string;
  telefono: string;
  terminosPago: string;
  fecha: string;
  fechaEntrega: string;
  tipo: string;
  estado: string;

  constructor(order: Partial<Order> = {}) {
    this.id = order.id || '';
    this.numeroPedido = order.numeroPedido || '';
    this.nombre = order.nombre || '';
    this.nombreProductor = order.nombreProductor || '';
    this.correoProductor = order.correoProductor || '';
    this.correo = order.correo || '';
    this.productos = order.productos || [];
    this.condicionTransporte = order.condicionTransporte || '';
    this.metodoPago = order.metodoPago || '';
    this.telefonoProductor = order.telefonoProductor || '';
    this.telefono = order.telefono || '';
    this.terminosPago = order.terminosPago || '';
    this.fecha = order.fecha || new Date().toISOString(); // Asigna la fecha actual por defecto
    this.fechaEntrega = order.fechaEntrega || '';
    this.tipo = order.tipo || '';
    this.estado = order.estado || 'En Proceso';
  }
}
