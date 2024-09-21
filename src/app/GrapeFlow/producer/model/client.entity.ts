export class Client {
  id: number;
  nombre: string;
  apellido: string;
  negocio: string;
  telefono: string;

  constructor(client: {
    id?: number,
    nombre: string,
    apellido: string,
    negocio?: string,
    telefono: string
  }) {
    this.id = client.id || 0;
    this.nombre = client.nombre || '';
    this.apellido = client.apellido || '';
    this.negocio = client.negocio || '';
    this.telefono = client.telefono || '';
  }
}
