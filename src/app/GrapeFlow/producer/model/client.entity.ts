export class Client {
nombre: string;
apellido: string;
negocio: string;
telefono: string;

constructor(client: {nombre: string, apellido: string, negocio: string, telefono: string}) {
  this.nombre = client.nombre || '';
  this.apellido = client.apellido || '';
  this.negocio = client.negocio || '';
  this.telefono = client.telefono || '';
}
}
