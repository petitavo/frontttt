export class Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  dni: string;
  email: string;
  role: string;

  constructor(client: {
    id?: string,
    firstName: string,
    lastName: string,
    phone: string,
    address?: string,
    country?: string,
    city?: string,
    dni?: string,
    email?: string,
    role?: string
  }) {
    this.id = client.id || '';
    this.firstName = client.firstName || '';
    this.lastName = client.lastName || '';
    this.phone = client.phone || '';
    this.address = client.address || '';
    this.country = client.country || '';
    this.city = client.city || '';
    this.dni = client.dni || '';
    this.email = client.email || '';
    this.role = client.role || '';
  }
}
