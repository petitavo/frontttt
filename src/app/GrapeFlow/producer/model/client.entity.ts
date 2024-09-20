export class Client {
nombre: string;
apellido: string;
telefono: string;

constructor(client: {nombre: string, apellido: string, telefono: string}) {
  this.nombre = client.nombre || '';
  this.apellido = client.apellido || '';
  this.telefono = client.telefono || '';
}
}
