import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-detail-order',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './detail-order.component.html',
  styleUrl: './detail-order.component.css'
})
export class DetailOrderComponent {
  nombreCliente = 'Roberto Carlos';
  numeroSolicitud = '001';
  correoElectronico = 'juan.perez@vinosdelsur.com';
  telefono = '+51 987 654 321';
  direccionEntrega = 'Calle Principal 123, Miraflores, Lima';

  productos = [
    { description: '1. Vino Tinto Malbec - 750 ml', cantidad: '2 botellas' },
    { description: '2. Vino Blanco Sauvignon - 750 ml', cantidad: '5 botellas' }
  ];

  condicionesTransporte = 'Transporte con temperatura controlada';
  metodoPago = 'Transferencia bancaria';
  terminosPago = 'Crédito a 30 días';
  fechaSolicitud = '01/08/2024';
  fechaEntregaSolicitada = '15/09/2024';
  estado = 'Pendiente';
  estadosPosibles = ['Pendiente', 'Cancelado', 'Enviado'];

  estados = ['pendiente', 'cancelado', 'enviado'];
  estadoActual = 0; // Puedes inicializar con el estado que desees

  cambiarEstado(event: any) {
    const selectElement = event.target;

    // Limpiar las clases anteriores
    selectElement.classList.remove('cancelado', 'enviado', 'pendiente');

    // Añadir la clase correspondiente al valor seleccionado
    if (selectElement.value === 'cancelado') {
      selectElement.classList.add('cancelado');
    } else if (selectElement.value === 'enviado') {
      selectElement.classList.add('enviado');
    } else if (selectElement.value === 'pendiente') {
      selectElement.classList.add('pendiente');
    }
  }
}
