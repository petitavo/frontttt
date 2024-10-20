export class Client {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  pais: string;
  ciudad: string;
  dni: string;
  correo: string;
  password: string;
  confirmPassword: string;
  role: string;

  constructor(client: Partial<Client> = {}) {
    this.id = client.id || '';
    this.nombre = client.nombre || '';
    this.apellido = client.apellido || '';
    this.telefono = client.telefono || '';
    this.direccion = client.direccion || '';
    this.pais = client.pais || '';
    this.ciudad = client.ciudad || '';
    this.dni = client.dni || '';
    this.correo = client.correo || '';
    this.password = client.password || '';
    this.confirmPassword = client.confirmPassword || '';
    this.role = client.role || '';
  }
}
