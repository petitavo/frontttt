export class Client {
  id: number;
  nombre: string;
  apellido: string;
  negocio: string;
  telefono: string;
  direccion: string;
  pais: string;
  ciudad: string;
  dni: string;
  correo: string;

  constructor(client: {
    id?: number,
    nombre: string,
    apellido: string,
    negocio?: string,
    telefono: string,
    direccion?: string,
    pais?: string,
    ciudad?: string,
    dni?: string,
    correo?: string
  }) {
    this.id = client.id || 0;
    this.nombre = client.nombre || '';
    this.apellido = client.apellido || '';
    this.negocio = client.negocio || '';
    this.telefono = client.telefono || '';
    this.direccion = client.direccion || '';
    this.pais = client.pais || '';
    this.ciudad = client.ciudad || '';
    this.dni = client.dni || '';
    this.correo = client.correo || '';
  }
}
